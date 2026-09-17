# Project Intelligence & Permanent Memory: Toby's Auto Mechanic LLC
> **Workspace**: `c:\Users\DELL\Documents\tsuki no me` | **Repository**: `Goodyness-dev/tobi-s`
> This configuration is loaded automatically by Antigravity whenever a new chat is opened in this project.

---

## 🛑 DIRECTIVE #1: STRICT REPOSITORY ISOLATION (ZERO CONTAMINATION)
1. **This workspace belongs SOLELY to Toby's Auto Mechanic LLC.**
2. **NEVER modify or replace Toby's auto repair code when asked to build or scaffold a new client website** (e.g. dentists, plumbers, medspas, contractors).
3. **When the user provides a new client link or asks to build a new site:**
   - **Destination**: ALWAYS create a new folder under `C:\Users\DELL\Documents\<client-slug>` (e.g. `C:\Users\DELL\Documents\glass-dentistry`).
   - Clone from master template: `C:\Users\DELL\Documents\service-biz-master-template`.
   - Link `node_modules` instantly with zero disk bloat:
     ```powershell
     cmd.exe /c "mklink /J node_modules `"C:\Users\DELL\Documents\service-biz-master-template\node_modules`""
     ```
   - **NEVER put non-Toby client code into `tsuki no me`.**

---

## 🚗 TOBY'S AUTO MECHANIC GROUND TRUTH
- **Business Name**: Toby's Auto Mechanic LLC
- **Owner**: Toby S. (Master Technician)
- **Phone**: (520) 836-6921 | **Secondary**: (520) 836-6021
- **Address**: 15276 W Jimmie Kerr Blvd, Ste 1, Casa Grande, AZ 85122
- **Operating Hours**: Mon – Fri: 8:00 AM – 5:00 PM; Sat: 8:00 AM – 5:00 PM (By Appt); Sun: Closed
- **Core Specialties**: Heavy-duty diesel diagnostics, complete engine swaps, transmission overhauls, A/C diagnostics, fleet maintenance, U-Haul neighborhood dealer.
- **Theme & Aesthetic**: Midnight dark mode (`#0c0c0c` / `#000000`), bold automotive performance aesthetic with high-contrast red accents (`#dc2626`).
- **Production Backend**: SQLite + Node.js with Telegram Bot & EmailJS alerts, Customer Inbox, and dynamic admin dashboard.

---

## 🎨 THE "THICK & ALIVE" DESIGN SYSTEM
- **Zero Flat Cards**: Every card must feel tactile, premium, and alive.
  - Card classes: `card-thick` or `card-thick-hover` (multi-layered drop shadow).
  - Outlines: `border-2 border-neutral-200/90 dark:border-neutral-800/90` with rounded corners (`rounded-3xl` or `rounded-2xl`).
  - Internal Padding: Generous padding (`p-7` to `p-14`). Never use cramped `p-3` or `p-4` for primary content cards.
- **Zero Lucide-React / External Icon Libraries**:
  - NEVER import from `lucide-react` or external icon packages. They cause bundle bloat, missing export crashes, and generic visuals.
  - ALWAYS use lightweight, semantic, inline SVGs crafted directly into components.
- **🚫 STRICT BAN ON "AI-LOOKING" ICONS & VISUAL CLICHÉS**:
  - **Generate Images Instead of Cheesy Icons**: NEVER use cartoonish clipart or generic icons to fill cards. ALWAYS use/generate high-detail realistic imagery, macro photography, or real harvested media for procedures, dishes, amenities, and service cards.
  - **Zero AI Clichés**: NEVER use cartoonish teeth, cartoon wrenches, glowing magic wands, sparkles (✨), generic shields, or chaotic multi-color gradient SVGs. They instantly scream "AI-generated template" and destroy credibility.
  - **Typography & Structure Over Icon Clutter**: Do NOT force an icon onto every card. Instead, use high-end agency conventions: sleek editorial numbering (`01`, `02`, `03` in monospace or subtle serif), technical category tags (`// 01 DIAGNOSTICS`, `[PREVENTATIVE CARE]`), or minimal status pulse dots (`w-2 h-2 rounded-full bg-emerald-500`).
  - **Surgical Monoline SVGs Only**: When functional icons are needed (phone, map pin, arrows, clock, close/menu), use only ultra-crisp monoline geometric SVGs (`stroke-width="1.5"` or `1.75`, `fill="none" stroke="currentColor"`), matching the Linear/Stripe/Apple design system.
  - **Authentic Industry Marks**: Use real verified corporate/trade accreditation marks (e.g. real ADA logo, ASE Certified seal, Google 5.0 star rating, BBB seal) rather than fake generic ribbons or trophies.
- **Dark & Light Mode Harmony**:
  - High-contrast dark mode (`dark:bg-black`, `dark:text-white`, `dark:border-neutral-800`).
- **No Flat Pricing**:
  - Never list rigid flat prices on the public UI. Use interactive consultation / appointment quote flows.

---

## 🎭 MANDATORY GSAP ANIMATIONS SUITE (`gsap` MUST BE INSTALLED)
`gsap` is installed in `package.json` across all projects. **Every client site MUST feature one or more of the following 10 GSAP animations**:
1. **Hero text reveal**: GSAP split/staggered reveal on the primary value proposition headline.
2. **Menu item fade-in on scroll**: ScrollTrigger staggered fade + slide-up for service/menu items.
3. **Parallax hero image**: ScrollTrigger smooth vertical or depth parallax shift on the hero backdrop/poster.
4. **Dish image hover zoom** (or *Feature image hover zoom*): Tactile smooth GSAP scale & clip-path expand on card hover.
5. **Counter number roll-up**: GSAP dynamic integer ticker animation on KPI stats (e.g., "30+" years, "5.0" rating, "1,200+" clients).
6. **Horizontal menu scroll**: ScrollTrigger pinned horizontal track scroll for services, procedures, or menu items.
7. **Nav link magnetic effect**: Magnetic cursor pull / spring physics on navbar links and primary CTA buttons.
8. **Page transition curtain**: Smooth entry curtain wipe / veil reveal on initial load.
9. **Booking form slide-in**: Tactile modal/drawer slide with spring easing on appointment or quote click.
10. **Section heading draw-in line**: Architectural line expanding from 0% to 100% width on scroll trigger entry.

---

## 🎬 HERO VIDEO SCROLL & INSTANT MOBILE FALLBACK
- **Desktop (>= 768px)**:
  - Scrubbed via GSAP `ScrollTrigger` (`pin: true`, `scrub: 1.5`, `start: "top top"`, `end: "+=350%"`).
- **Mobile (< 768px)**:
  - Native touch scrolling with instant poster image fallback (`/images/hours-poster.jpg` or `/images/hero-truck.jpg` with `fetchpriority="high"`).
  - Zero video loading delay and zero scroll hijacking on touch screens.
  - Both CTA buttons immediately clickable above the fold.

---

## 🤖 2026 AI-NATIVE ACCESSIBILITY & LOCAL GEO SEO
1. **Machine-Readable AI Context (`/llms.txt` and `/llms-full.txt`)**:
   - Present in `public/` following the [llmstxt.org](https://llmstxt.org/) standard so Perplexity, ChatGPT, Claude, and Applebot can index practice details directly.
2. **Robots AI Crawler Permissions**:
   - `public/robots.txt` must explicitly permit AI agents (`GPTBot`, `ChatGPT-User`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `Applebot-Extended`).
3. **Semantic `<noscript>` Fallback**:
   - `index.html` must contain a complete, human-and-crawler readable `<noscript>` block containing practice name, address, phone link, doctors/services list, and service areas.
4. **Schema.org Structured Data (JSON-LD)**:
   - Local business schema with accurate coordinates, phone, address, hours, and services.

---

## 🎨 MULTI-AGENT ARCHITECTURE: DESIGN AGENT PROTOCOL
- **Role**: Dedicated subagent (`design-agent`) responsible strictly for visual design, layout composition, color harmony, typography, and card aesthetics.
- **Component Arsenal**: Integrated with **ObsidianUI** (`obsidianui.dev`) for tactile, motion-rich components:
  - Tactile CTAs: `Arrow Fill Button`, circle magnetic hovers.
  - Typography Reveals: `Rectangular Text Reveal`, `Flip Text`, `Text Stream`.
  - Service & Procedure Cards: `Apple Spotlight`, `Trading Card` hover glows.
  - Social Proof Rails: `Draggable Marquee`, `Scroll Stack`, `Parallax Gallery`.
  - Textured Backdrops: `Dotted Grid`, subtle canvas patterns.
- **Trigger**: When the user provides a business link AND attaches a template image (or design mockup / UI screenshot):
  1. Inspect the template image via `view_file`.
  2. Deconstruct visual DNA: color palette, typography hierarchy, card border radiuses, and bento/split grid structure.
  3. Modify target `tailwind.config.js`, `src/index.css`, and UI components (`Hero.jsx`, `ServicesSection.jsx`, `Navbar.jsx`, `ReviewsSection.jsx`, `Footer.jsx`) leveraging ObsidianUI interaction patterns to mirror the template aesthetic.
  5. **Custom-Themed Admin Dashboard**: Re-skin the admin portal (`src/components/admin/`) with the template's visual DNA—brand color accents, `card-thick` KPI widgets, ObsidianUI spotlights, and domain-calibrated labels. Never leave the admin dashboard generic.
  6. **Always Visible Admin Password on UI**: ALWAYS display the admin access key / password prominently on the Admin Login screen (`src/components/admin/AdminLogin.jsx`) with 1-click **"Autofill"** and **"Copy"** buttons. Clients, reviewers, and prospects must never be forced to ask for credentials separately. Resilient client demo authentication fallback must ensure instant access even if backends are cold.

## 📸 MULTI-AGENT ARCHITECTURE: ASSET HARVESTER PROTOCOL
- **Role**: Dedicated subagent (`asset-agent`) responsible for extracting, downloading, normalizing, and verifying all media from target client links directly into `public/images/`.
- **Zero Broken Links Guarantee**:
  1. Scrapes high-res logos, hero banners, doctor/owner headshots, facility/interior photos, service equipment, and transformation galleries.
  2. Downloads directly to `C:\Users\DELL\Documents\<client-slug>\public\images\`.
  3. Generates `src/data/imageManifest.js` mapping semantic slots to local relative paths (`/images/...`).
  4. If source photos are missing or low quality, automatically provides high-resolution industry-calibrated visuals so no hero or card is ever blank.

---

## ⚡ ZERO-QUOTA SITE REPLICATION PIPELINE (/build)
When the user triggers `/build` or requests to replicate an existing site for a similar client:
- **Command**:
  ```powershell
  npm run build-site -- --from="<source-slug>" --to="<new-slug>" --name="<Business Name>" --url="<client-url>" --deploy
  ```
- **Autonomous 1-Step Execution**:
  1. Clones winning architecture from `C:\Users\DELL\Documents\<source-slug>` (e.g. `glass-dentistry`, `holley-dental-group`, `top-canada-plumbing`, `captain-pauls-cajun-seafood`, or `service-biz-master-template`).
  2. Links `node_modules` instantly via junction with 0 disk bloat.
  3. Scrapes real images and contact metadata from `<client-url>` into `public/images/`.
  4. Rewrites `businessData.js`, `index.html`, and `imageManifest.js` with new business branding.
  5. Pushes to a new GitHub repository: `gh repo create <new-slug> --public --source=. --remote=origin --push`.
  6. Deploys to production Vercel: `npx vercel --prod --yes`.
  7. Consumes **ZERO Gemini API tokens** for the mechanical build, completely preventing rate limits!

---

## ⚡ RAPID COMMAND PIPELINE (Windows PowerShell)
- **Always chain commands with `;` (NEVER bash `&&`)**:
  ```powershell
  npm run build ; git add . ; git commit -m "<message>" ; git push origin main
  ```
- **Autonomous Verification**: Always run `npm run build` locally to confirm 0 compilation errors before completing any task.
- **Client Site GitHub & Vercel Pipeline**:
  ```powershell
  cd $Target ; npm run build ; git add . ; git commit -m "feat: complete modern web platform for $Slug" ; gh repo create $Slug --public --source=. --remote=origin --push ; npx vercel --prod --yes
  ```

---

## 🔗 MANDATORY FINAL DELIVERABLES FOR CLIENT BUILDS
Every completed client build response **MUST explicitly return clickable links** for all three:
1. 🌐 **Public Client Website**: `https://<deployment-url>` (e.g. `https://glass-dentistry.vercel.app`)
2. 🛠️ **Custom Admin Dashboard**: `https://<deployment-url>/admin` (e.g. `https://glass-dentistry.vercel.app/admin`)
3. 📦 **GitHub Repository**: `https://github.com/Goodyness-dev/<slug>`
