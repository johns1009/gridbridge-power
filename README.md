# GridBridge Power — website

Single-page marketing site for **GridBridge Power** (Hyperscale Energy Infrastructure):
behind-the-meter power for hyperscale and other large loads, delivered through a
GridBridge-owned substation.

Plain HTML/CSS/JS. No framework, no build step.

- Preview: https://johns1009.github.io/gridbridge-power/
- Repo: https://github.com/johns1009/gridbridge-power

## ⚠️ Placeholders John needs to fill in

| What | Where | Current value |
|---|---|---|
| Contact email (used by the form **and** the "Prefer email?" link) | `script.js`, line with `var CONTACT_EMAIL = ...` (top of file) — the only place it is set | `info@example.com` (fake placeholder) |
| Phone number (optional) | Not on the site. Add to the contact section in `index.html` if wanted. | none |
| Office / mailing address (optional) | Not on the site. Add to the contact section or footer if wanted. | none |
| Legal company name for the footer copyright | `index.html` footer (`© <year> GridBridge Power`) | "GridBridge Power" (the proposal used "GridBridge Energy"; confirm which) |
| Social links (LinkedIn, etc.) | Not on the site | none |
| Custom domain | Not set. Add a `CNAME` file + DNS when ready. | none |

Nothing else on the site is a placeholder. There are no invented stats, MW
figures, customer names, site counts, years in business, or testimonials. Add
real ones only when they can be backed up.

## Page sections

Hero, Behind the meter, We own the substation, How it works, Who we serve,
**Landowners & site originators** (`#landowners`), Why GridBridge, Contact.

## How the contact form works

There is no server. When a visitor clicks **Send message**, the form opens their
own email app with a pre-filled message addressed to `CONTACT_EMAIL`. The optional
"I am a" menu (Data center developer / Landowner / Site originator / Other) is
included in the message and the subject line. If you
later want submissions to arrive without the visitor's email app (e.g. Formspree,
HubSpot, a Google Form), swap the submit handler in `script.js`.

## Files

- `index.html`: page content and structure
- `styles.css`: layout and brand styles (palette variables at the top)
- `script.js`: contact email constant, mobile menu, form, scroll effects
- `assets/logo-full.png`: full logo (monogram + wordmark), transparent background, 1765×320
- `assets/logo-header.png`: web-sized version of the full logo used in the header
- `assets/logo-mark.png`: GB monogram only, transparent, 492×320
- `assets/logo-mark-small.png`: small monogram used in the footer
- `assets/favicon-32.png`, `favicon-180.png`, `favicon-512.png`: square monogram icons
- `assets/og-image.png`: 1200×630 social share image

The logo files were cropped from a screenshot of a proposal and upscaled, so
they are low resolution. Swap in the original vector/high-res logo files from
the designer when you have them, using the same filenames.

## Brand palette (sampled from the logo)

| Name | Hex | Use |
|---|---|---|
| Deep navy | `#072A44` | hero, buttons, dark bands |
| Wordmark navy | `#0B3050` | headings, text |
| Power blue | `#135A90` | links, icons ("POWER" in the wordmark) |
| Teal | `#06B4CC` | accents, lines (not for small text on white) |
| Teal (text-safe) | `#067A8C` | small labels on white (AA contrast) |
| Bright cyan | `#00E4E4` | accents on navy |
| Green | `#94EA54` | gradient highlight (from the "B") |

## Run locally

```bash
cd /workspace/gridbridge-power
python3 -m http.server 4180
# open http://localhost:4180
```

## Check

```bash
node validate.js
```

## Publishing

GitHub Pages serves the `main` branch root. Push to `main` and the site updates
in a minute or two.
