# FruitScan website

Public website for FruitScan by Vegrow: Orchard Assessment, Bin Scan and Package Monitoring.

Published with GitHub Pages from the `main` branch: https://vegrow-tech.github.io/fruitscan-site/

## Editing

- The site is a single static page: `index.html`, with images and the demo video in `img/`.
- Push to `main` and GitHub Pages republishes within a minute or two.

## Contact form

The "Request a pilot" and "Contact us" buttons open a form. To have submissions emailed to contact@vegrow.in:

1. Create a free form at https://formspree.io with contact@vegrow.in as the recipient.
2. Copy the form ID (the part after `formspree.io/f/`).
3. In `index.html`, set `const FORMSPREE_ID='...'` to that ID and push.

While `FORMSPREE_ID` is empty, the form opens the visitor's own email app with the enquiry filled in, addressed to contact@vegrow.in.
