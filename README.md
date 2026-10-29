# Suchit Raute — Portfolio

A responsive Next.js portfolio built with the App Router, TypeScript, Tailwind CSS, Framer Motion, and Lucide icons.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run lint
npm run build
npm start
```

## Add certificate originals

Place the original, unmodified certificate files in `public/certificates/` and set their corresponding `image` paths in `src/data/certificates.ts`. Use the intended descriptive filenames, such as `cisco-ccst-cybersecurity.png`. No certificate image files were present when this portfolio was created, so the certificate image slots are intentionally left empty.

## Deploy to Vercel

Import the repository into [Vercel](https://vercel.com/new), keep the Next.js framework preset, and deploy. No environment variables are required.
