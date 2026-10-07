# Installing Compass Lite

This sets up Compass Lite as **your own** page in Claude. Your copy saves to its
own database under your Claude account. Nobody else can see your records,
including SpecNav and whoever shared this repository with you, unless you
invite them from the page's Share menu.

It takes about 10 minutes. Install one copy per business.

---

## Before you start

**Already using Compass Lite?** Make a fresh backup first:

1. Open your current Compass Lite.
2. Go to **Set-up → Backup and restore → Download backup**.
3. Save the file somewhere you can find it. It's named something like
   `compass-lite-backup-your-business-2026-10-07.json`.

This file holds all your records. Keep it private, in your own cloud storage,
and never upload it to GitHub.

---

## Step 1: Accept the GitHub invitation

You'll get an email from GitHub inviting you to the private Compass Lite
repository. Click **View invitation → Accept**.

## Step 2: Connect GitHub in Claude

On claude.ai, open **Settings → Connectors** and make sure **GitHub** is
connected, so Claude can read the repository.

## Step 3: Ask Claude to install it

1. Go to **claude.ai/code**.
2. Choose the Compass Lite repository.
3. Send this message:

   > Install Compass Lite as my own artifact, following CLAUDE.md.

Claude publishes the app file unchanged, with the permissions it needs for
saving, knowing who is viewing, file storage, downloads and Ask Lite, and gives
you a link. Open the link. You may want to pin it in your claude.ai sidebar;
Claude can do that if you ask.

## Step 4: The first-run screen

The first time you open your new Compass Lite, it shows **Welcome to Compass Lite**:

1. **Restore my backup** or **Start fresh.** To restore, choose the backup file
   from *Before you start*. Lite shows what is inside it (the number of records
   in each register, the release that made it and the date). Click **Yes,
   replace everything with this backup**. New to Compass Lite? Click
   **Start fresh**.
2. **Your business and brand.** Enter your business name and your name, then
   click **Confirm details**. Optionally add your logo and a brand colour.
   You can skip this and come back from Set-up.
3. **Check saving.** This writes a small test record, reads it back and removes
   it. You should see **Working.** The chip at the top right should read **Saved**.

Then Set-up opens. It lists the twelve set-up steps, with a count of what is
still missing. Every step can be skipped, and skipped steps stay on your list
and in the Guide panel until they are done. Two roles are required:
Executive Sponsor and AI Governance Lead (one person may hold both). Add people
and give them roles on **Set-up → Organization**.

Finish with **Download backup** on Set-up. A backup is due every 7 days.

---

## Updating to a new version

When a new version is pushed to the repository, your records stay put:

1. Download a backup first (**Set-up → Download backup**).
2. In claude.ai/code with the Compass Lite repository, send:

   > Update my Compass Lite artifact at <paste your Compass Lite link> to the latest version, following CLAUDE.md.

The link stays the same, and your records are kept. To confirm the update
worked, check the version in the footer or on **Set-up**. It should match the
newest entry in `CHANGELOG.md`.

## Moving to another Claude account

Download a backup, install a new copy on the other account (Steps 1 to 3), and
choose **Restore my backup** on its first-run screen.

## Troubleshooting

| What you see | What to do |
|---|---|
| The chip says **Not connected** and the page says changes will NOT be saved | You are looking at a copy outside Claude, or the page lost its connection. Open your installed Compass Lite link in Claude, or reload the page. |
| The chip says **Save failed** | Reload the page, then run **Set-up → Run database self-test**. If it says **Not saved**, send the result to your SpecNav contact. |
| Restore says the file "is not valid JSON" or "does not look like a Compass Lite backup" | Choose the `.json` file made by **Download backup**, not another file. |
| Restore says the backup was made by a newer release | Update Compass Lite first (above), then restore. |
| Something looks wrong after a restore | Restore the same backup again. It replaces everything, so it is safe to repeat. |
| Something looks odd in your records | Run **Set-up → Run data health check**. Each fix it offers can be undone. |

## Privacy

- Your records live in your copy's own database, under your claude.ai account.
- Install and update send nothing to SpecNav. Nothing leaves your account
  except an export or backup you choose to save.
- The repository holds only the app. Backup files are kept out of it on
  purpose, so never upload one there.
