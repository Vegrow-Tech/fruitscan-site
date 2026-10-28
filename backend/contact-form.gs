/**
 * FruitScan website contact form.
 *
 * Receives each enquiry from the website form, emails it to the sales inbox
 * and (optionally) logs it in a Google Sheet. Deploy as a web app; see README.md.
 */

// Where enquiries are sent.
const TO = 'contact@vegrow.in';

// Optional: ID of a Google Sheet to log every enquiry (the long ID in the sheet's URL).
// Leave empty to only send the email.
const SHEET_ID = '';

// Optional: send the visitor a short "we got your enquiry" email.
const SEND_ACKNOWLEDGEMENT = false;

const FIELDS = [
  ['Enquiry', 'enquiry'], ['Name', 'name'], ['Company', 'company'], ['Email', 'email'],
  ['Phone / WhatsApp', 'phone'], ['Country', 'country'], ['Role', 'role'],
  ['Interested in', 'products'], ['Crop', 'crop'], ['Scale', 'scale'],
  ['Message', 'message'], ['Sent from', 'page'],
];

function doPost(e) {
  try {
    const d = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    // Spam trap: the hidden "website" field is only ever filled in by bots.
    if (d.website) return reply({ ok: true });

    const val = k => String(d[k] == null ? '' : d[k]).trim().slice(0, 3000);
    for (const k of ['name', 'company', 'email', 'country']) {
      if (!val(k)) return reply({ ok: false, error: 'Missing ' + k });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val('email'))) {
      return reply({ ok: false, error: 'Invalid email' });
    }

    const oneLine = s => s.replace(/[\r\n]+/g, ' ');
    const kind = val('enquiry') === 'General enquiry' ? 'Enquiry' : 'Pilot request';
    const subject = oneLine(kind + ' – ' + val('company') + ' (' + val('country') + ')');
    const body = FIELDS.filter(([, k]) => val(k)).map(([label, k]) => label + ': ' + val(k)).join('\n');

    MailApp.sendEmail({
      to: TO,
      replyTo: val('email'),
      name: 'FruitScan website',
      subject: subject,
      body: body + '\n\nReply to this email to answer ' + oneLine(val('name')) + ' directly.',
    });

    if (SHEET_ID) {
      const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
      if (sheet.getLastRow() === 0) sheet.appendRow(['Received'].concat(FIELDS.map(f => f[0])));
      sheet.appendRow([new Date()].concat(FIELDS.map(([, k]) => val(k))));
    }

    if (SEND_ACKNOWLEDGEMENT) {
      MailApp.sendEmail({
        to: val('email'),
        replyTo: TO,
        name: 'FruitScan by Vegrow',
        subject: 'We received your FruitScan enquiry',
        body: 'Hi ' + oneLine(val('name')) + ',\n\nThank you for getting in touch about FruitScan. ' +
          'Our team will reply shortly.\n\nFruitScan by Vegrow\n' + TO,
      });
    }

    return reply({ ok: true });
  } catch (err) {
    console.error(err);
    return reply({ ok: false, error: 'Server error' });
  }
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
