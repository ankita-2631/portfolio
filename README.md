# Ankita Soni, Portfolio (Angular)

Angular (standalone components, signals, zoneless) + TypeScript + Tailwind CSS v4 + Motion.
This is a port of the React portfolio in `../portfolio` with the same design and behaviour.
All content lives in [`src/app/content.ts`](src/app/content.ts).

**Live site:** https://delightful-stone-02feeee10.2.azurestaticapps.net

## Run locally

```bash
npm install
npm start          # http://localhost:4200
npm run build      # production build into dist/portfolio-angular/browser
```

## Deploy

**GitHub Pages:** push to `main`, then in *Settings → Pages* set *Source* to *GitHub Actions*.
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds with `--base-href ./` and publishes.

**Azure Static Web Apps (current host):** app location `/`, output location `dist/portfolio-angular/browser`, build command `npm run build`.
[`.github/workflows/azure-static-web-apps-*.yml`](.github/workflows) deploys on every push to `main`.

## Structure

- `src/app/ui/`: icons, scroll-reveal / entrance / tilt directives, animated counter, theme service
- `src/app/sections/`: navbar, hero, about, experience, skills, projects (case-study modal), growth, certifications, contact
