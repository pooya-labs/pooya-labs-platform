# Product surfaces and primary audience

## Product positioning

**Pooya Labs is first and foremost Pooya's personal portfolio and project showcase.** Its primary job is to introduce Pooya to people who do not know him yet, communicate his interests and engineering approach, and make his strongest projects easy to understand and explore.

The site is not primarily a SaaS dashboard, customer account system, booking product, or generic admin panel. Every feature must support the portfolio's main visitor journey:

1. Understand who Pooya is and what he builds.
2. Browse a curated selection of projects.
3. Open a detailed case study to understand the problem, Pooya's role, technical decisions, implementation, and current state.
4. Inspect a real demo or source repository where one is available.
5. Find a clear way to make contact or follow future work.

## Surface 1 — Public portfolio (the main product)

**This is the root website and the default experience.**

Planned public sections:
- Intro / hero: name, concise professional positioning, and a strong first impression.
- About: a factual introduction, interests, approach, and current focus.
- Selected work: curated project cards with honest status labels.
- Case studies: project-specific context, responsibilities, architecture, technologies, screenshots, demos, source links, challenges, and outcomes.
- Skills and tools: evidence-backed technologies and areas of focus, not inflated proficiency ratings.
- Contact and social links.
- Persian and English, responsive layouts, accessible navigation, and useful page metadata/social previews.

The site should feel like a crafted portfolio, not an application dashboard. The visual language may draw on Antigravity / spatial glass references, but content hierarchy and project storytelling always win over visual effects.

## Surface 2 — Private owner workspace / management

The existing Spatial OS is retained as a secondary private workspace and experimentation surface. The future owner console may manage portfolio content, project entries, publication state, and operational settings.

It must not dominate the public homepage. Any protected operation requires server-side authentication and authorization; hiding a button or trusting a browser role is not security.

Build the minimum management capability only after the portfolio content model is stable. Apps Script synchronization is deferred until late implementation and is not a prerequisite for the public portfolio.

## Visitors and customers

A person browsing the portfolio is a **visitor**, not automatically a customer account. A generic customer login/dashboard is not part of the core portfolio scope.

If a future Pooya Labs product genuinely needs customer accounts, booking, orders, or request tracking, that experience must be a separate product surface with its own user journey and data boundary. Do not add it to the portfolio simply because it exists in a conventional SaaS dashboard.

## Scope guardrails

- Never invent project outcomes, user counts, revenue, adoption, or completion claims.
- Mark work as prototype, in development, paused, or released accurately.
- Prefer a few strong, detailed case studies over a long list of shallow project cards.
- Every featured project should eventually include a clear explanation of the problem, Pooya's contribution, important technical decisions, and evidence (screenshots, demo, source, or tests).
- Existing repositories remain independent. Referencing a project's public repository or publishing a case study does not authorize importing or modifying its source code.
