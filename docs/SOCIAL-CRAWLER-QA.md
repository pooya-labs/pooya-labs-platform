# Social crawler regression checks

The Chromium Browser QA workflow includes a repeatable audit of the static Pages build under two social-crawler User-Agent strings:

- `LinkedInBot/1.0`
- `facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)`

## Coverage

The check reads the **raw HTML response body** rather than relying only on the hydrated page DOM. It covers the homepage and all eight Persian/English project case-study routes: 17 routes per User-Agent, 34 checks in total.

For each response it validates:

- HTTP success, document title, standard description, Open Graph title, and Open Graph description.
- A canonical URL using HTTPS and the exact requested static route.
- An `og:url` that exactly matches the canonical URL.
- An `og:image` on the canonical host and correct Pages base path.
- The locally built PNG asset returns HTTP 200, has a valid PNG signature, and decodes to 1200×627 from its IHDR dimensions.

The test uses the image path from the production-shaped metadata but fetches that path from the local Pages preview. This ensures PR builds validate their own generated image assets instead of depending on assets that may not yet be deployed.

## What this does not prove

The workflow tests a local build in Chromium with crawler User-Agent strings. It does not prove that LinkedIn or Meta accepted the URL, refreshed a cached card, or displays the same preview in a logged-in share composer. Those require the authenticated LinkedIn Post Inspector and Meta Sharing Debugger and remain separate owner-access checks.

The production-host Browser Rendering audit is also separate: it checks the current live GitHub Pages and Cloudflare Pages hosts. Local PR verification must not be reported as a production deployment check.
