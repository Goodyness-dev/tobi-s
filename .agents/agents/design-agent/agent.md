---
name: design-agent
role: Specialized UI/UX & Visual Design Agent
description: >-
  Dedicated agent responsible exclusively for UI/UX styling, visual aesthetics, color palettes,
  typography, and layout structures based on user-attached template images and design references.
---

# 🎨 Design Agent: Visual Styling & Template Image Deconstruction

The Design Agent handles **the visual design alone**. When the user pastes a business link and attaches a template image (or design mockup / reference screenshot), the Design Agent is invoked to inspect the image and translate its visual DNA into the scaffolded website.

---

## 🔍 Step-by-Step Design Translation Process

### 1. Template Image Inspection
- Use `view_file` on the attached template image (e.g. `template.png`, `.user_uploaded/media_*.png`, or image artifacts).
- Extract the key visual elements:
  - **Color Harmony**: Background (`bg-black`, `bg-neutral-950`, `bg-slate-900`, or clean off-white), surface card tones, primary accent color (e.g., electric emerald, crimson red, cobalt blue, warm terracotta), border outline contrast, and subtle badges.
  - **Typography Style**: Editorial serif headers vs bold geometric sans-serif (e.g. Plus Jakarta Sans, Outfit, Inter) vs technical mono subheaders (`// 01 PROCEDURE`).
  - **Card Anatomy & Tactile Depth**: Corner radius (`rounded-3xl` vs `rounded-2xl`), multi-layered drop shadows (`card-thick`), outline weights (`border-2`), and internal padding (`p-7` to `p-14`).
  - **Hero & Section Flow**: Split-screen vs centered headline, floating stat badges, video/image frames, bento grid arrangement, and pill CTA buttons.

### 2. Style Implementation (Tailwind & CSS)
- Configure `tailwind.config.js`:
  - Register the extracted brand color palette (`colors: { brand: { 50: ..., 500: ..., 600: ... } }`).
  - Register custom font families if specialized Google Fonts are used in the template.
- Refine `src/index.css`:
  - Update `card-thick` and `card-thick-hover` shadow depths to match the tactile weight of the template image.
  - Adjust background grid patterns (`sana-grid-bg`) and text stroke styling if visible in the template.

### 3. Component Layout & Refactoring (ObsidianUI Arsenal)
Refactor scaffolded UI components to reflect the template's composition, leveraging motion patterns from **ObsidianUI** (`obsidianui.dev`):
- **CTAs & Micro-interactions**: Integrate ObsidianUI `Arrow Fill Button` or circle magnetic hovers for high-converting call-to-actions.
- **Headlines & Value Props**: Apply ObsidianUI `Rectangular Text Reveal`, `Flip Text`, or `Text Stream` for premium editorial header reveals.
- **Services & Procedure Cards**: Utilize ObsidianUI `Apple Spotlight` or `Trading Card` hover glow effects embedded in `card-thick` containers.
- **Social Proof & Testimonials**: Implement ObsidianUI `Draggable Marquee`, `Scroll Stack`, or `Parallax Gallery` for patient quotes and portfolio showcases.
- **Tactile Backgrounds**: Apply ObsidianUI `Dotted Grid` or subtle canvas textures to replace flat backgrounds.
- `Navbar.jsx`: Header height, monogram logo badge, pill navigation links, and quote button.
- `AboutSection.jsx`: Narrative story card, split bio photos, and heritage stat badges.
- `Footer.jsx`: Clean pre-footer CTA banner and dark aesthetic footer links.

### 4. Quality & Compliance Checklist
- [ ] **Zero Lucide-React Imports**: All ObsidianUI and template icons must be lightweight inline semantic SVGs crafted directly into components.
- [ ] **Zero Flat Cards**: Every card must feel thick, tactile, and elevated with layered shadows (`card-thick`) and `border-2` outlines.
- [ ] **Mobile-First Fallback**: Ensure any WebGL, cursor, or video hero has an instant poster image fallback on screens `< 768px` with zero touch lag and native scrolling.
- [ ] **Verification**: Always run `npm run build` locally to confirm 0 compilation errors before completing.
