# Spark Repair Estimator

A mobile-first Progressive Web App for creating property repair estimates during walkthroughs. The app helps an acquisition or operations user review repair scope, add rooms, capture photos, adjust pricing, and export a project package from a phone or desktop browser.

## Overview

Spark Repair Estimator is built as a static web app using HTML, CSS, and JavaScript. It is designed for fast property review where the user needs to move room by room, select repair items, add notes, and keep a running estimate visible while walking the home.

The app supports configurable room instances, repair groups, quantity-based pricing, item-level price overrides, project notes, photo uploads, and ZIP export. It also includes a Tools section with offer support and walkthrough guidance to help reduce missed scope before leaving the property.

## Key Features

- Mobile-first layout for phone-based walkthroughs
- Configurable rooms such as Bathroom 2, Bedroom 3, or Living/Common Area
- Collapsible repair groups for faster review
- 75+ repair items organized by repair category
- Quantity and price override support
- Project notes and room-level repair notes
- Photo upload support
- ZIP export with project data and photos
- Local project saving in the browser
- Offline-first PWA behavior after the initial installed-app launch
- Light and dark theme support

## Tools Section

### Offer Worksheet

Helps turn the repair estimate into a simple offer calculation. The user can enter ARV, target percentage, closing or holding costs, and the app shows a maximum allowable offer estimate.

### Offer Risk Check

Highlights items that may need a closer review before leaving the property. This is meant to help the user catch missing or higher-risk repair scope during the walkthrough.

### Walkthrough Guide

Provides a simple walkthrough flow so the user can see what areas still need review. It is designed to reduce missed rooms, missing notes, or incomplete repair groups.

## Non-Obvious Button Guide

Only buttons that may not be immediately clear are listed here.

| Button | What it does |
|---|---|
| `CSV Upload` | Updates standard repair prices from a CSV file while keeping the app item IDs consistent. |
| Pencil icon beside project name | Edits the current project name or address. |
| Light/Dark toggle | Switches the app between light mode and dark mode. |
| `No Action Needed` | Marks a group as reviewed even when no repair item is needed for that area. |
| Unit cost field | Overrides the default price for that repair item in the current project. |
| `Upload Photo` | Adds a photo from the device to the project export. |
| `Export ZIP` | Downloads the project estimate, notes, and photos as a ZIP package. |

## Offline-First Behavior

The app is implemented as a static PWA with a service worker and browser-based project storage. After the first successful launch from the installed Home Screen app while online, the service worker caches the application shell and required static assets. This allows the estimator to reopen without a network connection and continue using the saved project data stored locally in the browser.

This approach keeps the walkthrough experience available during property visits where cellular coverage may be weak, while still using a lightweight static deployment model.

## Project Structure

```text
index.html
manifest.json
sw.js
jszip.min.js
icon-180.png
icon-192.png
icon-512.png
Spark_Field_Estimator_One_Page_Writeup.pdf
README.md
```

## Notes

This project was built for the Spark Homes Developer Contest as a practical walkthrough estimator. The focus is on real use during a property visit: quick navigation, clear repair scope, editable pricing, photo collection, and a clean export for follow-up review.
