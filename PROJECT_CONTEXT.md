# TeamIAI (Teamify) — Project Context & Architecture

This document provides a comprehensive overview of the **TeamIAI (Teamify)** website codebase. It outlines the design philosophy, technical stack, directory structure, core features, interactive components, and instructions on how to run and extend the site.

---

## 1. Project Overview & Design Philosophy

TeamIAI (Teamify) is a premium, high-fidelity platform focused on AI workforce building, custom AI agents, and intelligence integrations. 

Unlike standard "vibe-coded" templates that rely on flat dark backgrounds and basic layouts, this site utilizes a **High-Performance Kinetic Interface Blueprint**:
- **Layered Visuals**: Utilizes dark cool-grays and pitch blacks (`#070708` to `#121214`) beneath sub-pixel SVG-generated noise filters.
- **Immediate-Mode Canvas**: Uses low-overhead HTML5 Canvas renders for dynamic flow fields, avoiding DOM bloating.
- **Physical Metaphors**: Uses custom cursor trail velocity-stretching, magnetic interactions, and SVG mask apertures revealing vector cybernetics/silicon substrates.
- **Premium Fluid Motion**: Handled using a combination of **Framer Motion**, **GSAP (GreenSock)**, and **React Three Fiber (WebGL)**.

---

## 2. Technology Stack

The application is built using the following modern web technologies:

* **Core Framework**: Next.js 16.2.6 (App Router)
* **Library**: React 19.2.4
* **Styling**: Tailwind CSS v4 (configured via `@tailwindcss/postcss`) & Custom CSS variables for theme stability
* **3D Graphics & WebGL**: Three.js, `@react-three/fiber`, and `@react-three/postprocessing`
* **Animations**: Framer Motion (`^12.38.0`) and GSAP (`^3.15.0`)
* **Icons**: Lucide React (`^1.14.0`)
* **State & Forms**: Zustand (`^5.0.13`) and React Hook Form (`^7.75.0`)
* **Development Language**: TypeScript

---

## 3. Repository Directory Structure

```
site/
├── src/
│   ├── app/                    # Next.js App Router Page Declarations
│   │   ├── company/
│   │   │   ├── about/          # Company About Page
│   │   │   ├── careers/        # Careers listings and applications
│   │   │   └── clients/        # Client testimonials & trust portfolio
│   │   ├── services/
│   │   │   ├── ai-services/    # Custom AI agents, automation & intelligence
│   │   │   ├── ai-solutions/   # Industry-specific integrations
│   │   │   └── hiring-models/  # Building AI teams with Teamify
│   │   ├── resources/
│   │   │   ├── blog/           # Blog page with insights & deep dives
│   │   │   ├── case-studies/   # Real-world project showcases
│   │   │   ├── research/       # AI whitepapers and documents
│   │   │   └── page.tsx        # Resources hub page
│   │   ├── playground/         # Interactive sandbox (Chat, Doc parsing, Workflow)
│   │   ├── contact/            # Let's Talk AI lead form page
│   │   ├── about/              # Main about shortcut
│   │   ├── careers/            # Careers portal (extensive)
│   │   ├── services/           # Services summary overview
│   │   ├── solutions/          # Solutions portal
│   │   ├── globals.css         # Tailwind configurations & theme styles
│   │   ├── layout.tsx          # Root Layout (Nav, Footer, Theme, Custom Cursor wrappers)
│   │   └── page.tsx            # Main Interactive Landing Page
│   ├── components/             # Reusable global interactive UI components
│   │   ├── scenes/             # Section-level homepage components (see below)
│   │   ├── BorderBeam.tsx      # Light-sweep border animation
│   │   ├── CursorTrail.tsx     # Dynamic multi-particle mouse trail
│   │   ├── FallingOrbs.tsx     # Generative floating/falling orbs canvas
│   │   ├── FlowFieldBackground.tsx # Interactive physics-warped background grid
│   │   ├── Footer.tsx          # Interactive high-contrast site footer
│   │   ├── GlowCard.tsx        # Hover-reactive glowing spotlight cards
│   │   ├── HeroWaveBackground.tsx # WebGL dynamic 3D wave (React Three Fiber)
│   │   ├── Magnetic.tsx        # Magnetic hover wrapper using Framer Motion
│   │   ├── Navigation.tsx      # Hover-dropdown floating navigation menu
│   │   ├── SimpleTechCursor.tsx # Velocity-stretching cursor ring
│   │   └── ThemeProvider.tsx   # React Theme Context (Light/Dark toggle support)
│   └── lib/
│       └── utils.ts            # Classnames merger helper utility (clsx + tailwind-merge)
```

---

## 4. Homepage Story Flow & Scene Components

The home page [page.tsx](file:///d:/teamai/site/src/app/page.tsx) acts as a visual story flow, compiling several high-end scenes:

1. **`HeroSignalBoot`**
   - Renders the header and a 3D WebGL wave using `HeroWaveBackground` with customizable frequency, speed, and perspective parameters.
2. **`DeconstructingFacade`**
   - An interactive SVG mask reveal that uses cursor coordinates to show "cyan cybernetic schematics" under the text, mimicking a hardware substrate layer.
3. **`InfrastructureReveal`**
   - Displays core opportunities and structural upgrades.
4. **`AIIntegrationHub`**
   - An interactive connection diagram showing real-time agentic workflows.
5. **`CapabilityMatrix`**
   - Highlights the core competencies using interlocking grid layouts and `BorderBeam` light sweeps.
6. **`IndustryIntelligence`**
   - A reactive tab selector illustrating specialized models per industry sector.
7. **`SystemSandboxBlock`**
   - Displays a code editor mockup with real-time test runs and metrics outputs.
8. **`TrustStabilization`**
   - Reinforces security, reliability, and our model routing approach.
9. **`Process`**
   - Breakdown of the step-by-step engagement workflow.
10. **`ConversionLayer`**
    - High-impact call-to-action block leading to the contact system.

---

## 5. Key Interactive Core Components

### A. Flow Field Background ([FlowFieldBackground.tsx](file:///d:/teamai/site/src/components/FlowFieldBackground.tsx))
Renders a grid on an HTML5 `<canvas>` that behaves like a fabric. When the mouse moves, the nearest nodes warp toward the cursor based on distance-based gravity formulas and bounce back using spring physics. Runs at a smooth 60 FPS using `requestAnimationFrame`.

### B. Magnetic Wrapper ([Magnetic.tsx](file:///d:/teamai/site/src/components/Magnetic.tsx))
Wraps buttons or nav links. It uses the mouse's offset from the element's center to pull the element slightly towards the cursor, giving elements a tactile, physical magnetism.

### C. WebGL 3D Wave ([HeroWaveBackground.tsx](file:///d:/teamai/site/src/components/HeroWaveBackground.tsx))
Uses React Three Fiber (`Canvas`, `points`, custom shaders/materials) to render a dynamic wave topology. It is fully configurable via parameters (amplitude, wave speed, point size, scale).

### D. Velocity-Stretching Cursor ([SimpleTechCursor.tsx](file:///d:/teamai/site/src/components/SimpleTechCursor.tsx) & [CursorTrail.tsx](file:///d:/teamai/site/src/components/CursorTrail.tsx))
Calculates cursor movement speed and stretches the cursor dot into an oval in the direction of movement. Higher mouse speeds cause greater elongation, returning to a perfect circle upon stopping.

---

## 6. How to Run & Build the Site

Navigate to the `site` directory in your terminal to start working:

### Setup & Installation
```bash
cd site
npm install
```

### Run in Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### Compile Production Bundle
To check typescript types, lint rules, and compile optimized bundles:
```bash
npm run build
```

---

## 7. Guidelines for Future Development

When building new pages or adding components:
1. **Maintain Consistent Aesthetics**: Avoid raw/saturated colors. Use CSS variables defined in [globals.css](file:///d:/teamai/site/src/app/globals.css) (e.g., `--background`, `--foreground`, `--accent`, `--border`).
2. **Animation Performance**: Prefer CSS-based animations, Framer Motion transitions, or immediate-mode Canvas updates. Avoid nesting multiple structural reflow triggers inside animation loops.
3. **Responsive Design**: Ensure mobile touch matrices match mouse behaviors (e.g., touch-events scaling backgrounds instead of following exact coordinates).
4. **TypeScript Compliance**: Always define interfaces for component props and helper utilities.
