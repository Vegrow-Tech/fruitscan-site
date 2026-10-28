# Contact form backend

`contact-form.gs` is a Google Apps Script that receives enquiries from the website form and emails them to contact@vegrow.in. Visitors never leave the site or open their email app.

## Set up (about 5 minutes, once)

1. Sign in to Google with the account the emails should come **from** (a shared account such as a FruitScan or website account is best).
2. Go to https://script.google.com and click **New project**. Name it "FruitScan website contact form".
3. Replace the contents of `Code.gs` with `contact-form.gs` from this folder. Click **Save**.
4. Optional: put a Google Sheet ID in `SHEET_ID` to keep a log of every enquiry, or set `SEND_ACKNOWLEDGEMENT = true` to email the visitor a short confirmation.
5. Click **Deploy → New deployment**, choose type **Web app**, and set:
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Click **Deploy**, approve the permission prompt, and copy the **Web app URL** (it ends in `/exec`).
7. In the site's `index.html`, set `const ENDPOINT='...'` to that URL and push to `main`.

## Notes

- Emails arrive from the account that deployed the script, named "FruitScan website", with Reply-To set to the visitor, so replying goes straight to them.
- Google Workspace allows 1,500 emails a day from Apps Script, which is far more than a contact form needs.
- If you edit the script, use **Deploy → Manage deployments → Edit → New version** so the same URL keeps working.
- A hidden field catches simple spam bots; their submissions are silently dropped.
