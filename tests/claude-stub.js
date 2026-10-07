/*
 * claude-stub.js: a stand-in for the claude.ai page capabilities, so the release
 * tests can run compass-lite.html outside Claude (spec section 9).
 *
 * It provides window.claude.use(name) for db, user, assets, downloads and sample.
 * Records persist in localStorage, so a reload keeps them, and each Playwright
 * browser context starts empty (a separate install).
 *
 * Options, set before this script runs: window.__CL_STUB_OPTS = {
 *   db, user, assets, downloads, sample   false to make use(name) resolve null
 *   failWrites      true to reject every db write (tests Save failed / Not saved)
 *   declineDownloads true to reject downloads.save with code "declined"
 *   userId, isOwner, guest, canWrite      the viewer
 *   sampleText      the fixed Ask Lite answer
 * }
 * Seed records with window.__CL_STUB_SEED = { "collection/doc": {...} } (applied once per store).
 */
(function () {
  'use strict';
  const opts = Object.assign({
    db: true, user: true, assets: true, downloads: true, sample: true,
    failWrites: false, declineDownloads: false,
    userId: 'user-owner-0001', isOwner: true, guest: false, canWrite: true,
    sampleText: 'Stub answer from Ask Lite.', store: 'cl-stub-store'
  }, window.__CL_STUB_OPTS || {});

  const KEY = opts.store;
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || null; } catch (e) { return null; } }
  let st = load() || { docs: {}, assets: {}, downloads: [], seq: 0 };
  if (window.__CL_STUB_SEED && !st.seeded) { Object.assign(st.docs, window.__CL_STUB_SEED); st.seeded = true; }
  function persist() { localStorage.setItem(KEY, JSON.stringify(st)); }
  persist();

  const err = (code, message) => Object.assign(new Error(message || code), { code });
  const tick = () => new Promise(r => setTimeout(r, 0));
  const frozen = o => JSON.parse(JSON.stringify(o));

  /* ---------- db ---------- */
  const listeners = new Set(); // {kind:'col'|'doc', path, next}
  function colDocs(col) {
    const pre = col + '/';
    return Object.keys(st.docs).filter(p => p.startsWith(pre) && p.slice(pre.length).indexOf('/') < 0).sort()
      .map(p => snapDoc(p));
  }
  function snapDoc(path) {
    const id = path.split('/').pop();
    const has = Object.prototype.hasOwnProperty.call(st.docs, path);
    const body = has ? frozen(st.docs[path]) : undefined;
    return { id, exists: has, data: () => body, metadata: { fromCache: false, hasPendingWrites: false } };
  }
  function qsnap(col) { const docs = colDocs(col); return { docs, size: docs.length, empty: !docs.length, docChanges: () => docs.map((d, i) => ({ type: 'added', doc: d, oldIndex: -1, newIndex: i })), metadata: { fromCache: false, hasPendingWrites: false } }; }
  function notify(path) {
    const col = path.split('/').slice(0, -1).join('/');
    listeners.forEach(l => {
      if (l.kind === 'col' && l.path === col) setTimeout(() => l.next(qsnap(col)), 0);
      if (l.kind === 'doc' && l.path === path) setTimeout(() => l.next(snapDoc(path)), 0);
    });
  }
  function checkPath(path, even) {
    const n = path.split('/').length;
    if ((n % 2 === 0) !== even) throw new TypeError('bad path parity: ' + path);
  }
  function docRef(path) {
    checkPath(path, true);
    return {
      id: path.split('/').pop(), path,
      async get() { await tick(); return snapDoc(path); },
      async set(data) { await tick(); if (opts.failWrites) throw err('unavailable', 'Stub: writes are failing'); if (!data || typeof data !== 'object' || Array.isArray(data)) throw err('invalid_argument', 'body must be an object'); if (JSON.stringify(data).length > 262144) throw err('invalid_argument', 'document over 256 KiB'); st = load() || st; st.docs[path] = frozen(data); persist(); notify(path); },
      async update(data) { await tick(); if (opts.failWrites) throw err('unavailable'); st = load() || st; if (!st.docs[path]) throw err('invalid_argument', 'no such document'); st.docs[path] = Object.assign({}, st.docs[path], frozen(data)); persist(); notify(path); },
      async delete() { await tick(); if (opts.failWrites) throw err('unavailable'); st = load() || st; delete st.docs[path]; persist(); notify(path); },
      async acquire() { return { acquired: true, version: 1 }; },
      onSnapshot(next) { const l = { kind: 'doc', path, next }; listeners.add(l); setTimeout(() => next(snapDoc(path)), 0); return () => listeners.delete(l); },
      collection(sub) { return colRef(path + '/' + sub); }
    };
  }
  function colRef(path) {
    checkPath(path, false);
    const q = {
      path,
      where() { return q; }, orderBy() { return q; }, limit() { return q; },
      async get() { await tick(); return qsnap(path); },
      onSnapshot(next) { const l = { kind: 'col', path, next }; listeners.add(l); setTimeout(() => next(qsnap(path)), 0); return () => listeners.delete(l); },
      doc(id) { return docRef(path + '/' + (id || ('auto' + (++st.seq)))); },
      async add(data) { const r = q.doc(); await r.set(data); return r; }
    };
    return q;
  }
  const db = Object.freeze({ doc: docRef, collection: colRef });

  /* ---------- user ---------- */
  const user = Object.freeze({
    async id() { return opts.userId; },
    async isOwner() { return opts.isOwner; },
    async canEdit() { return opts.isOwner; },
    async can(name) { return name === 'data.write' ? opts.canWrite : null; },
    async me() { return { id: opts.userId, name: '', avatarUrl: '', color: '', email: null, isOwner: opts.isOwner, canEdit: opts.isOwner }; },
    async profiles(ids) { const o = {}; [].concat(ids).forEach(i => { o[i] = { id: i, name: '', avatarUrl: '', color: '', email: null, isMe: i === opts.userId, guest: i === opts.userId ? opts.guest : false }; }); return o; },
    async name() { return ''; }
  });

  /* ---------- assets ---------- */
  function blobToDataUrl(b) { return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = () => rej(r.error); r.readAsDataURL(b); }); }
  const assets = Object.freeze({
    async upload(blob, o) {
      const type = (o && o.type) || blob.type;
      if (!type) throw err('invalid_request', 'type required');
      if (blob.size > 20 * 1024 * 1024) throw err('too_large');
      st = load() || st;
      const id = Array.from(crypto.getRandomValues(new Uint8Array(16))).map(x => x.toString(16).padStart(2, '0')).join('');
      const dataUrl = await blobToDataUrl(new Blob([blob], { type }));
      st.assets[id] = { dataUrl, type, size: blob.size, createdAt: new Date().toISOString() };
      persist();
      return { id, url: dataUrl, sizeBytes: blob.size, contentType: type };
    },
    async list() { st = load() || st; const a = Object.entries(st.assets).map(([id, x]) => ({ id, url: x.dataUrl, contentType: x.type, sizeBytes: x.size, createdAt: x.createdAt })); return { assets: a, usage: { files: a.length, bytes: a.reduce((s, x) => s + x.sizeBytes, 0), maxFiles: 1000, maxBytes: 1e9 } }; },
    async delete(id) { st = load() || st; const had = !!st.assets[id]; delete st.assets[id]; persist(); return { deleted: had }; }
  });

  /* ---------- downloads ---------- */
  const downloads = Object.freeze({
    async save(req) {
      if (opts.declineDownloads) throw err('declined', 'The viewer declined the save.');
      let text;
      if (typeof req.data === 'string') text = req.data;
      else if (req.data instanceof Blob) text = await req.data.text();
      else text = new TextDecoder().decode(req.data);
      st = load() || st; st.downloads.push({ filename: req.filename, data: text }); persist();
      return { status: 'saved' };
    }
  });

  /* ---------- sample (Ask Lite) ---------- */
  const sample = Object.assign(async function (input) { return { text: opts.sampleText, truncated: false }; }, {
    async json() { return {}; }, async limits() { return { images: false }; }
  });

  const ns = { db, user, assets, downloads, sample };
  window.claude = Object.freeze({
    use(name) { return new Promise(r => setTimeout(() => r(opts[name] && ns[name] ? ns[name] : null), 5)); }
  });
  window.__clStub = { opts, state: () => load(), downloads: () => (load() || {}).downloads || [] };
})();
