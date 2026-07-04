# Liumgo Driver Self-Service PWA

Mobile-first Driver Self-Service Progressive Web App for Liumgo. It follows the same operating pattern as the ACMS mobile app reference: secure login, mobile shell, bottom navigation, local-first actions, wallet, alerts, settings and installability.

## What is included

- **M00 Login / device binding demo** with Liumgo-branded secure entry.
- **M01 Driver home** with route progress, SLA, battery, COD and quick actions.
- **M02 Route and shift view** with stop-level status, SLA risk and battery-aware route card.
- **M03 Driver action centre** for shift check-in, route start, break, battery swap and SOS.
- **M04 POD upload** for OTP, photo, signature or receiving stamp proof.
- **M05 Exception reporting** for customer unreachable, breakdown, traffic delay, temperature risk, COD mismatch and safety incidents.
- **M06 Availability / leave requests** for driver planning workflows.
- **M07 Driver wallet** with documents, compliance validity, earnings and COD settlement.
- **M08 Alerts inbox** for control tower updates and acknowledgements.
- **M09 Support assistant** for SOP-driven route, POD, COD, battery and incident help.
- **M10 Settings and PWA controls** for install, export, reset and sign-out.

## Demo credentials

```text
User ID: LIUMGO
Password: LIUMGO123
```

## Run locally

Because this is a static PWA, there is no build step. Serve the folder with any static server:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

You can also use the optional npm script:

```bash
npm run dev
```

## Deploy on GitHub Pages

### Option 1: GitHub Pages from branch

1. Push this folder to a GitHub repository.
2. Go to **Settings → Pages**.
3. Select **Deploy from a branch**.
4. Choose `main` and `/root`.
5. Save. The app will be served from your GitHub Pages URL.

### Option 2: GitHub Actions

A workflow is already included at:

```text
.github/workflows/deploy.yml
```

Set Pages to **GitHub Actions** and push to `main`. The workflow uploads the repository root as the static site.

## Install on phone

- **Android / Chrome:** Open the GitHub Pages URL, then use the browser install prompt or menu → **Install app**.
- **iPhone / Safari:** Open the URL, tap Share, then **Add to Home Screen**.

The service worker caches the app shell, demo JSON and core assets for offline use.

## Data model

Synthetic demo data is stored in:

```text
data/demo.json
```

Runtime driver actions are stored locally in browser `localStorage`. Use **Settings → Export activity JSON** to download the simulated action trail.

## Branding assets reused from the Liumgo site package

- `assets/liumgo-logo.png`
- `assets/hero-image.jpg`
- `assets/ev-network.jpg`
- `assets/delhi-map.jpg`
- `assets/services-hero-3w.jpg`

## Repository structure

```text
liumgo-driver-pwa/
├── .github/workflows/deploy.yml
├── assets/
├── data/demo.json
├── index.html
├── manifest.webmanifest
├── package.json
├── service-worker.js
└── src/
    ├── app.js
    └── styles.css
```
