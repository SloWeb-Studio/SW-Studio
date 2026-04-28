# SloWeb Studio website

One-page React + Vite website for SloWeb Studio.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The build output is in `dist`.

## GitHub Pages

This project uses `base: './'` in `vite.config.js`, so it can work on GitHub Pages subpaths.

Build it and upload the `dist` contents, or use GitHub Actions later.

## EmailJS setup later

The contact form is EmailJS-ready. For now it uses placeholder mode and shows the success message without sending a real email.

When you create your final EmailJS account and template, add a `.env` file in the project root:

```bash
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Template fields used by the form:

- from_name
- business_name
- reply_email
- website_purpose
- example_links
- message

Current placeholder email: SloWebStudio@gmail.com
