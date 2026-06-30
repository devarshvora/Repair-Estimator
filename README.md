# Spark Homes Field Estimator

Submitted by: Devarsh Vora

## Overview

Spark Homes Field Estimator is a mobile-first Progressive Web App for property acquisition walkthroughs. It helps a field agent create a property project, walk room by room, select repair items, enter quantities, attach photos, review offer numbers, and export a ZIP package with the estimate spreadsheet and project photos.

The app is built for real phone use during a walkthrough. The focus is large touch targets, offline storage, a running repair total, room-by-room structure, and simple field language.

## How to run locally

No build step, backend, or Node server is required.

For a quick preview, open `index.html` in a browser.

For proper PWA/offline testing, serve the folder as static files:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

For final review, upload the folder contents to GitHub Pages, Netlify, Vercel, or any static host.

## PWA and offline testing

1. Open the hosted URL once while online.
2. Add the app to the Home Screen on iOS or Android.
3. Open the Home Screen app once while online so the service worker can cache the app files.
4. Create a project, add rooms, select repairs, add notes, and upload a photo.
5. Turn on airplane mode.
6. Reopen the Home Screen app and confirm the project remains saved.

Note for iPhone/iPad: after adding the app to the Home Screen, open the pinned app once while connected to the internet. After that first launch, the app can reopen offline with saved project data.

## Main screens

### Walkthrough

The main field screen. Agents add rooms, open repair groups, check repair items, enter quantities, mark groups as reviewed, add notes, and track the running repair total.

### Photos

The evidence screen. Agents upload property photos from the device and review/remove them before export.

### Summary

The review screen. It shows the selected repair scope, totals, notes, photos, and export option.

### Tools

The support screen for offer decisions and walkthrough quality checks.

- **Offer Worksheet**: uses ARV, purchase price, holding costs, and repair estimate to calculate profit, ROI, and 70% Rule MAO.
- **Offer Risk Check**: flags high-cost repairs, missing evidence, and unfinished review areas before making an offer.
- **Walkthrough Guide**: suggests what room or repair group should be checked next.

## Button guide

Only the main action buttons are listed here so the reviewer can understand the app quickly.

| Button / Control | What it does |
|---|---|
| Menu | Opens saved projects, project switching, and new project controls. |
| Total pill | Shows the live repair estimate total. |
| Project pencil | Edits the active project name or address. |
| CSV upload | Updates standard repair prices from a CSV file using item IDs. |
| Theme toggle | Switches between light and dark mode. |
| Add room | Adds another room instance, such as Bathroom 2 or Bedroom 3. |
| Room card | Opens or collapses a room and shows that room's repair scope. |
| Repair checkbox | Adds or removes a repair item from the estimate. |
| Quantity / unit cost | Adjusts repair quantity or overrides the price for the current project. |
| No Action Needed | Marks a group reviewed when no repair is needed. |
| Add custom item | Adds a one-off repair item to the current project. |
| Upload Photo | Adds property evidence photos from the device. |
| Export ZIP | Downloads the estimate spreadsheet and project photos in one ZIP file. |
| Offer Worksheet | Calculates offer math, profit, ROI, and 70% Rule MAO. |
| Offer Risk Check | Checks the estimate for risks before leaving the property. |
| Walkthrough Guide | Shows the next unfinished room or group to inspect. |

## Core features

- Static HTML/CSS/JavaScript app.
- Mobile-first layout for field walkthroughs.
- Multiple saved projects using localStorage.
- Configurable room instances.
- 75+ repair line items with id-based pricing.
- Required repair groups and collapsible sections.
- Project notes, photo evidence, price overrides, and custom items.
- CSV global pricing update.
- ZIP export with spreadsheet and photos.
- PWA manifest, service worker, icons, and offline app shell caching.

## Libraries used

- Vanilla HTML, CSS, and JavaScript.
- JSZip, included locally as `jszip.min.js`, for ZIP export.
- xlsx-js-style from CDN for styled Excel export when online.
- Browser APIs: localStorage, FileReader, Service Worker, Web App Manifest, and file input.

If the Excel styling library is unavailable offline, the export flow still provides an Excel-readable fallback.

## Notes and tradeoffs

The app is static and offline-first. Photos are stored locally in the browser, which works for a prototype but can hit storage limits if many high-resolution photos are uploaded. Serial number parsing is only a basic helper, not full OCR. In a production version, I would add photo compression, stronger OCR for equipment plates, and team sync after the device reconnects.
