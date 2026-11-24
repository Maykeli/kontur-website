# Kontur project instructions

## Project and build

- This is a static HTML/CSS/JavaScript site. Do not add a backend or dependencies unless the user asks or the change clearly requires it.
- `index.html` is the production entry point. `index(1).html` is an archived snapshot; do not use it to regenerate or overwrite `index.html`.
- Tailwind source is `src/input.css`; configuration is `tailwind.config.js`; generated CSS is `css/style.css`.
- After changing Tailwind classes or CSS source, run `npm run build:css` and review the generated CSS diff.
- Run `npm run test:e2e` for browser checks. The test intercepts Web3Forms locally; never run tests that submit a real inquiry.

## Git workflow

- Check `git status` before starting. Never overwrite or discard uncommitted user changes.
- Do not work directly on `main`; create or use a task branch before editing.
- Show the diff and verification results before proposing a commit.
- Do not commit, push, merge, change GitHub, or publish Cloudflare Production without the user's explicit permission.
- Production updates happen only after separate user approval. Preview deployments may be used to review branch changes.

## Site integrity and safety

- Preserve the existing design and Russian copy unless the user requests a change.
- Keep the Web3Forms Access Key in the client form; never print it, copy it into reports/logs, or replace it without necessity.
- All contact-form tests must mock/intercept `https://api.web3forms.com/submit`; do not send real submissions without explicit permission.
- Do not delete user files, including files under `scratch/`, without the user's approval. Treat generated and exploratory artifacts there as local-only.
