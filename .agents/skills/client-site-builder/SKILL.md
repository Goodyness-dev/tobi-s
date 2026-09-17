---
name: client-site-builder
description: >-
  Use this skill whenever the user asks to build, scaffold, modernize, or pitch a new client website
  (such as dentists, auto mechanics, clinics, contractors, or local service businesses) from a Yelp URL,
  Google Maps link, or existing outdated website. Automates client research, isolated folder scaffolding,
  the 'Thick & Alive' tactile design system, 2026 AI-native accessibility, and instant Vercel deployment.
---

# Client Site Builder & Acquisition Workflow

Use this skill to autonomously research, scaffold, build, and deploy high-converting client websites in minutes without ever modifying or contaminating existing client repositories.

---

## 🛑 Golden Directive: Strict Repository Isolation

**NEVER modify or overwrite an existing client repo (such as `c:\Users\DELL\Documents\tsuki no me` which is Toby's Auto Mechanic).**

Always scaffold a new dedicated folder under:
`C:\Users\DELL\Documents\<new-client-slug>` (e.g. `C:\Users\DELL\Documents\glass-dentistry`)

---

## 🚀 15-Minute Rapid Scaffolding Procedure

### Step 1: Intake & Client Intelligence
Extract ground-truth details from the user's input (Yelp URL, existing website, or prompt):
1. **Business Name & Doctors/Owners**: Full name, titles (DMD, DDS, ASE Master), and heritage/years in business.
2. **Location**: Street, Suite, City, State, ZIP, and Geo coordinates (Latitude, Longitude).
3. **Contact**: Phone, Fax, and Email.
4. **Hours**: Monday through Sunday operating hours.
5. **Key Services & Hero Treatments**: The 3-4 primary high-margin procedures or services.
6. **Perks & Credentials**: Insurance filed directly, CareCredit, sedation, ADA/AGD memberships, free Wi-Fi, etc.
7. **Reviews & Social Proof**: Star ratings (Google & Yelp) and 3-4 authentic patient/customer quotes.

### Step 2: Instant Zero-Quota Scaffolder & Asset Harvester (3 Seconds)
Run the automated one-shot scaffolder from PowerShell:

```powershell
npm run scaffold -- "<Business Name>" "<client-slug>" --url="<client-url>"
```

This single command autonomously executes in 3 seconds with **zero token burn**:
1. **Robocopy**: Clones clean code structure to `C:\Users\DELL\Documents\<client-slug>`.
2. **Instant Junction**: Links `node_modules` via NTFS junction with zero disk bloat.
3. **Asset Harvesting**: Scrapes candidate images from `<client-url>`, downloads them into `public/images/`, and generates `src/data/imageManifest.js`.
4. **Data Seeding**: Pre-populates phone, business title, and `index.html` tags.
5. **Git Setup**: Initializes clean Git repo.

### Step 3: Asset Harvester Agent (Image Intake & Local Caching)
Invoke `asset-agent` via `invoke_subagent` to harvest, download, and normalize media from the client's URL:
1. **Scrape Client Media**:
   - Extract high-res image URLs from the client's website, Yelp gallery, or Google listing.
   - Collect logos, hero banners, doctor/owner headshots, facility/interior photos, service equipment, and transformation galleries.
2. **Download Directly to `public/images/`**:
   - Save directly into `$Target\public\images\` with standardized semantic filenames (`hero-poster.jpg`, `doctor-profile.jpg`, `facility-1.jpg`, etc.).
   - Reject tracking pixels and low-resolution assets.
3. **Zero-Empty-Card Fallback**:
   - If the source site has low-resolution or missing photos, automatically supply high-res industry-calibrated visuals so no card or hero is ever blank.
4. **Generate `src/data/imageManifest.js`**:
   - Export clean local relative paths (`/images/...`) and semantic alt text for UI components to consume.

### Step 4: Populate Client Data Layer
Customize decoupled data files in `$Target\src\data\`:
- `src/data/businessData.js`: Business name, owner/doctor bios, phone, address, coordinates, hours, and verified reviews.
- `src/data/servicesData.js`: Full procedure/service catalog with deep descriptions, candidate lists, advantages, and FAQs.
- `src/data/amenitiesData.js`: Key technology, comfort features, insurance perks, and accreditation badges.
- `src/data/imageManifest.js`: Local media assets harvested by the `asset-agent`.

### Step 5: Design Agent (Visual Styling, Template Deconstruction & ObsidianUI)
Whenever the user attaches a **template image**, mockup, or UI reference (e.g. `.user_uploaded/media_*.png` or `template.png`):
1. **Inspect the Visual DNA**:
   - Use `view_file` to analyze the template image.
   - Extract color palette (backgrounds, surfaces, primary accents, borders), typography hierarchy, card border radiuses, and layout structure (hero split, bento grid, feature highlights).
2. **Delegate or Apply Visual DNA with ObsidianUI Arsenal (`obsidianui.dev`)**:
   - Invoke `design-agent` via `invoke_subagent` or execute the design translation:
     - Update `tailwind.config.js` with extracted theme colors and font families.
     - Update `src/index.css` for custom shadows (`card-thick`, `card-thick-hover`) and background patterns.
     - Refactor UI layout components (`Hero.jsx`, `ServicesSection.jsx`, `Navbar.jsx`, `ReviewsSection.jsx`, `Footer.jsx`) utilizing ObsidianUI interaction patterns:
       - **CTAs & Micro-interactions**: ObsidianUI `Arrow Fill Button` or magnetic hover pills.
       - **Headlines**: ObsidianUI `Rectangular Text Reveal`, `Flip Text`, or `Text Stream`.
       - **Bento & Feature Cards**: ObsidianUI `Apple Spotlight` or `Trading Card` hover glows.
       - **Testimonials & Portfolios**: ObsidianUI `Draggable Marquee`, `Scroll Stack`, or `Parallax Gallery`.
       - **Backgrounds**: ObsidianUI `Dotted Grid` or tactile canvas meshes.
3. **Preserve Thick & Alive Rules**:
   - Outlines: `border-2 border-neutral-200/90 dark:border-neutral-800/90` with `rounded-3xl` or `rounded-2xl`.
   - Internal Padding: Generous `p-7` to `p-14`.
   - Zero flat cards and zero external icon libraries (`lucide-react` is strictly prohibited; inline SVGs only).
   - **Zero "AI-Looking" Icons & Generate Realistic Images**: Strictly ban cartoonish clipart, sparkles (✨), generic shields, and multi-colored gradient vector blobs. ALWAYS generate or use high-detail realistic imagery/photography instead of icons for services and cards. Use sleek editorial numbers (`01`, `02`), technical mono tags (`// 01 PREVENTATIVE`), and surgical monoline 1.5px SVGs matching Stripe/Linear design aesthetics.
   - Mobile Fallback: Full graceful degradation on screens `< 768px` to native touch scroll.
4. **Template-Inspired Admin Dashboard Enforcement**:
   - The Admin Dashboard (`src/components/admin/`) is **mandatory and must NEVER be generic**.
   - Skin `AdminLayout.jsx`, `DashboardOverview.jsx`, `InboxView.jsx`, and `OrdersView.jsx` using the template's extracted color palette, typography hierarchy, `card-thick` KPI widgets, and ObsidianUI spotlight interactions.
   - Tailor labels to the client domain ("Patients / Appointments" for dentistry vs "Vehicles / Work Orders" for auto shops vs "Clients / Estimates" for contractors).
5. **Always Visible Admin Password on Login UI**:
   - `src/components/admin/AdminLogin.jsx` MUST visibly display the default admin access key / password in an elevated credential badge with 1-click **"Autofill"** and **"Copy"** buttons.
   - The user or prospect must never be forced to request or type credentials separately. Resilient client demo authentication fallback in `src/services/api.js` ensures instant login even if backends are asleep.
6. **Mandatory GSAP Animations Suite (`gsap` Installed)**:
   Every site MUST implement one or more of the following 10 GSAP animations:
   - **Hero text reveal**: GSAP split/staggered reveal on headline.
   - **Menu item fade-in on scroll**: ScrollTrigger staggered fade + slide-up.
   - **Parallax hero image**: ScrollTrigger smooth vertical or depth parallax shift.
   - **Dish image hover zoom** (or *Feature image hover zoom*): Tactile scale & clip-path expand on hover.
   - **Counter number roll-up**: GSAP dynamic integer ticker on KPI stats.
   - **Horizontal menu scroll**: ScrollTrigger pinned horizontal track scroll.
   - **Nav link magnetic effect**: Magnetic cursor pull / spring physics on links/buttons.
   - **Page transition curtain**: Smooth entry curtain wipe / veil reveal on load.
   - **Booking form slide-in**: Tactile modal/drawer slide with spring easing.
   - **Section heading draw-in line**: Architectural line expanding 0% to 100% on scroll entry.

### Step 6: Configure SEO, AI Crawlers, and Schema.org
- `index.html`:
  - Title, meta description, and Geo tags (`geo.region`, `geo.placename`, `geo.position`, `ICBM`).
  - OpenGraph image and social preview tags.
  - Schema.org JSON-LD structured data (`@type: Dentist` or `AutoRepair`).
  - Semantic `<noscript>` direct fallback block with complete business information.
- `public/robots.txt`: Explicit permissions for AI crawlers (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`).
- `public/llms.txt` & `public/llms-full.txt`: Machine-readable markdown summaries adhering to the [llmstxt.org](https://llmstxt.org/) standard.

### Step 7: Mobile QA & Responsive Fallback
- Desktop: Scrubbed GSAP ScrollTrigger hero animation/video.
- Mobile (< 768px): Instant poster image fallback (`/images/hero-poster.jpg` with `fetchpriority="high"`). Native touch scrolling with zero lag and instant above-the-fold CTA buttons.

### Step 8: Autonomous Verification, GitHub Push & Vercel Deployment
Always test locally before pushing:

```powershell
cd $Target ; npm run build
```

Once `npm run build` exits with code 0:

```powershell
# 1. Commit and push to a clean GitHub repository
cd $Target ; git add . ; git commit -m "feat: complete modern web platform for $Slug"
gh repo create $Slug --public --source=. --remote=origin --push

# 2. Deploy to production on Vercel
npx vercel --prod --yes
```

---

## 🔗 MANDATORY FINAL DELIVERABLES
Every completed task **MUST explicitly return clickable links** for all three:
1. 🌐 **Public Client Website Link**: `https://<deployment-url>` (e.g. `https://glass-dentistry.vercel.app`)
2. 🛠️ **Custom Admin Dashboard Link**: `https://<deployment-url>/admin` (e.g. `https://glass-dentistry.vercel.app/admin`)
3. 📦 **GitHub Repository Link**: `https://github.com/Goodyness-dev/<slug>`
