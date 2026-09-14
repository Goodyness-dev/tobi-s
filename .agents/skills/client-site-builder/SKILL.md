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

### Step 2: Instant Isolated Scaffolding (Zero Disk Bloat)
Run the following PowerShell pipeline to clone from the master template and junction `node_modules`:

```powershell
$Slug = "<client-slug>"
$Target = "C:\Users\DELL\Documents\$Slug"
$Template = "C:\Users\DELL\Documents\service-biz-master-template"

# 1. Robocopy code structure (excluding git, node_modules, and build dist)
robocopy $Template $Target /XD .git node_modules dist /E /NFL /NDL /NJH /NJS

# 2. Create instant junction for node_modules (instant build, zero disk bloat)
cmd.exe /c "mklink /J `"$Target\node_modules`" `"$Template\node_modules`""

# 3. Initialize clean Git repository
cd $Target ; git init ; git branch -M master
```

### Step 3: Populate Client Data Layer
Customize only the decoupled data files in `$Target\src\data\`:
- `src/data/businessData.js`: Business name, owner/doctor bios, phone, address, coordinates, hours, and verified reviews.
- `src/data/servicesData.js`: Full procedure/service catalog with deep descriptions, candidate lists, advantages, and FAQs.
- `src/data/amenitiesData.js`: Key technology, comfort features, insurance perks, and accreditation badges.

### Step 4: Design Agent (Visual Styling & Template Deconstruction)
Whenever the user attaches a **template image**, mockup, or UI reference (e.g. `.user_uploaded/media_*.png` or `template.png`):
1. **Inspect the Visual DNA**:
   - Use `view_file` to analyze the template image.
   - Extract color palette (backgrounds, surfaces, primary accents, borders), typography hierarchy, card border radiuses, and layout structure (hero split, bento grid, feature highlights).
2. **Delegate or Apply Visual DNA**:
   - Invoke `design-agent` via `invoke_subagent` or execute the design translation:
     - Update `tailwind.config.js` with extracted theme colors and font families.
     - Update `src/index.css` for custom shadows (`card-thick`, `card-thick-hover`) and background patterns.
     - Refactor UI layout components (`Hero.jsx`, `ServicesSection.jsx`, `Navbar.jsx`, `ReviewsSection.jsx`, `Footer.jsx`) to mirror the template's layout and tactile aesthetic.
3. **Preserve Thick & Alive Rules**:
   - Outlines: `border-2 border-neutral-200/90 dark:border-neutral-800/90` with `rounded-3xl` or `rounded-2xl`.
   - Internal Padding: Generous `p-7` to `p-14`.
   - Zero flat cards and zero external icon libraries (`lucide-react` is strictly prohibited; inline SVGs only).

### Step 5: Configure SEO, AI Crawlers, and Schema.org
- `index.html`:
  - Title, meta description, and Geo tags (`geo.region`, `geo.placename`, `geo.position`, `ICBM`).
  - OpenGraph image and social preview tags.
  - Schema.org JSON-LD structured data (`@type: Dentist` or `AutoRepair`).
  - Semantic `<noscript>` direct fallback block with complete business information.
- `public/robots.txt`: Explicit permissions for AI crawlers (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`).
- `public/llms.txt` & `public/llms-full.txt`: Machine-readable markdown summaries adhering to the [llmstxt.org](https://llmstxt.org/) standard.

### Step 6: Mobile QA & Responsive Fallback
- Desktop: Scrubbed GSAP ScrollTrigger hero animation/video.
- Mobile (< 768px): Instant poster image fallback (`/images/hero-smile-poster.jpg` with `fetchpriority="high"`). Native touch scrolling with zero lag and instant above-the-fold CTA buttons.

### Step 7: Autonomous Verification & Rapid Deployment
Always test locally before pushing:

```powershell
cd $Target ; npm run build
```

Once `npm run build` exits with code 0:

```powershell
cd $Target ; git add . ; git commit -m "feat: complete modern web platform for $Slug" ; npx vercel --prod --yes
```
