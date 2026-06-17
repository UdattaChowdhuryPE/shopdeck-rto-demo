---
name: ShopDeck Predictive RTO System
description: A dark, expert-focused dashboard for return prevention and margin recovery
colors:
  dark-base: "#0f172a"
  dark-secondary: "#1e293b"
  dark-tertiary: "#334155"
  accent-cyan: "#06b6d4"
  accent-blue: "#3b82f6"
  accent-purple: "#8b5cf6"
  text-primary: "#f1f5f9"
  status-low: "#10b981"
  status-medium: "#f59e0b"
  status-high: "#ef4444"
typography:
  display:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(2rem, 6vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.2
  headline:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.02em"
rounded:
  sm: "4px"
  md: "8px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.accent-cyan}"
    textColor: "#000"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.accent-blue}"
    textColor: "#fff"
  button-secondary:
    backgroundColor: "{colors.dark-tertiary}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
  button-secondary-hover:
    backgroundColor: "{colors.dark-secondary}"
  card:
    backgroundColor: "{colors.dark-secondary}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  input:
    backgroundColor: "{colors.dark-tertiary}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
---

# Design System: ShopDeck Predictive RTO System

## 1. Overview

**Creative North Star: "The Command Center"**

This system is a dark, technical command center for D2C sellers managing their return risk. The interface prioritizes data clarity and decisive action over decoration. Confidence comes from precision: every element earns its place, every color has a job, every interaction is instant and responsive.

The dark theme signals expertise and authority. The cyan-blue palette carries electric energy—modern, tech-forward, and commanding. Sellers open this tool knowing their margins are at stake and trusting that ShopDeck's data and recommendations are bulletproof. The interface speaks to that trust: no hand-holding, no decorative gradients, no fuzz. Just signal and action.

**Anti-references:** We are not a generic SaaS dashboard (heavy cards, rounded-corner decoration, pastel backgrounds). We are not playful or cutesy (emoji, warm tones, soft type). We are not a marketplace clone (Shopify, Amazon Seller Central). We are specialized, serious, expert.

**Key Characteristics:**
- Dark, technical, mission-critical aesthetic
- Cyan-blue palette: electric, modern, commanding
- Data is the hero; UI is transparent and minimal
- Interactions are snappy and responsive, not decorative
- Risk levels use color + icon + number (never color alone)
- High contrast throughout for expert precision and accessibility

## 2. Colors

The palette is split into three roles: dark foundation, cyan-blue energy, and status indicators. Dark provides the authority; cyan-blue demands action; status colors carry meaning (green = safe, yellow = caution, red = high risk).

### Primary (Dark Foundation)
- **Deep Navy** (#0f172a): Primary background. Rich, dark, commanding. Sets the technical tone.
- **Slate Secondary** (#1e293b): Secondary surfaces, card backgrounds. Slightly lighter for hierarchy.
- **Slate Tertiary** (#334155): Borders, dividers, subtle UI layers. Never used as text.

### Secondary (Accent: Electric Energy)
- **Cyan Electric** (#06b6d4): Primary call-to-action button, hero accent. Commands attention; signals actionable moments. Used sparingly—≤5% of surface area.
- **Blue Confident** (#3b82f6): Secondary accent, hover states, focus rings. Reinforces action and precision. Calmer than cyan; used for secondary CTAs and interactive feedback.
- **Purple Accent** (#8b5cf6): Tertiary accent for special states (filters, badges, highlights). Used rarely; reserves purple for emphasis.

**The Electric Energy Rule.** Cyan and blue together signal that this tool is modern and serious. They are never diluted with transparency or used as background tints; they appear as full-strength accents on buttons, links, and focus states. Their rarity (≤10% of the screen) is the point.

### Tertiary (Status & Semantic)
- **Risk-Low Green** (#10b981): Safe to ship; intervention succeeded; no action needed.
- **Risk-Medium Yellow** (#f59e0b): Caution; medium risk; review recommended.
- **Risk-High Red** (#ef4444): High risk; intervention required; action urgent.

**The Three-Signal Rule.** Risk levels are always communicated by color + icon + numeric score. Color alone is insufficient. A user with color blindness must instantly understand the risk by reading the number and identifying the icon.

### Neutral
- **Light Slate** (#f1f5f9): Primary text, labels, placeholders. Always achieves ≥4.5:1 contrast on dark backgrounds.
- **Gray Borders** (inferred from Tailwind #475569): Subtle dividers and secondary UI. Never used as body text.

**The Contrast Rule.** Body text on dark backgrounds must hit 4.5:1 contrast (WCAG AA minimum). Light Slate achieves 8.5:1 against Deep Navy, providing margin for smaller type and placeholder text.

## 3. Typography

**Font Stack:** System sans-serif (`system-ui, -apple-system, 'Segoe UI', sans-serif`)
**Character:** Modern, technical, no personality. The type is invisible; data is visible.

### Hierarchy
- **Display** (600 weight, clamp(2rem, 6vw, 3rem), 1.2 line-height): Page titles, hero metrics (e.g., "RTO Rate: 14.2%"). Reserved for ≤1 per page.
- **Headline** (600 weight, 1.5rem, 1.3 line-height): Section titles (Orders, Analytics, Rules). Clear information hierarchy.
- **Body** (400 weight, 0.9375rem, 1.5 line-height): Description text, data rows, explanatory copy. Default everywhere. Max line length 65–75ch for readability.
- **Label** (500 weight, 0.875rem, 1.4 line-height, 0.02em letter-spacing): Form labels, button text, captions, risk scores. Subtle tracking reinforces precision.

**The No-Personality Rule.** The type is system default throughout. No custom fonts, no serif, no script. Sellers don't come for typography; they come for margin recovery data.

## 4. Elevation

**Philosophy:** Flat by default. Surfaces are flat at rest. Shadows appear only as a response to state (hover, interaction, focus). This keeps the interface clean and reduces visual noise; the data is the hero.

### Shadow Vocabulary
- **Hover Glow** (`box-shadow: 0 8px 24px rgba(6, 182, 212, 0.15)`): Applied to interactive elements (buttons, cards, inputs) on hover. Cyan glow, low opacity. Signals responsiveness without overwhelming.
- **Focus Ring** (`outline: 2px solid {colors.accent-blue}`, `outline-offset: 2px`): Keyboard focus, native HTML. Blue ring, 2px, offset 2px. Always visible for a11y.

**The Flat-By-Default Rule.** No persistent shadows. Cards and surfaces have no drop shadows at rest. Shadows only on hover or focus. This discipline keeps the interface precise and data-focused. Depth is implied by position and color, not by shadow.

## 5. Components

### Buttons
- **Primary Button** (Cyan): High-contrast, full-strength accent. Padding 12px 24px, radius 4px, cyan background, black text. Hover shifts to blue (to signal interactive state) and text to white (for contrast). Used for primary CTAs ("Apply Intervention", "Save Rules").
- **Secondary Button** (Dark Tertiary): Lower visual weight. Gray background (#334155), light text, same padding/radius. Hover shifts to dark secondary (#1e293b). Used for supporting actions ("Cancel", "Dismiss").
- **Link** (Cyan or Blue): No background. Underlined in default state; text transforms to blue on hover. Never a button when semantically a link.

**Button Rules:**
- Primary button appears ≤1 per interaction or task flow.
- Never more than 2 adjacent buttons in the same row; stack on narrow viewports.
- Disabled state uses reduced opacity (0.5) on any button color.

### Cards & Containers
- **Card Style**: Dark secondary background (#1e293b), 8px radius, 16px internal padding. Flat at rest; subtle cyan glow on hover (same hover glow as buttons).
- **Card Sections**: Each section within a card uses dark tertiary background (#334155) with 4px radius for subsection containers.

### Inputs & Form Fields
- **Style**: Dark tertiary background (#334155), light text, 4px radius, 8px padding. No border by default (background is the visual container).
- **Focus**: Blue outline ring (2px solid, 2px offset). No shadow; the outline is sufficient.
- **Error**: Light red text (#ef4444) below the field, no red background. Red is semantic, not decorative.
- **Disabled**: Reduced opacity (0.5) + no hover effect.

### Data Tables & Lists
- **Header Row**: Dark tertiary background (#334155), label-weight type, light slate text. Sticky or separated from body rows.
- **Body Rows**: Dark secondary background, 16px padding, light text. No grid lines; whitespace creates separation. Hover row applies subtle cyan glow (no background change).
- **Risk Score Column**: Always shows three signals—color circle (green/yellow/red), icon, and numeric score (0–100). Right-aligned for scannability.

### Charts (Recharts)
- **Grid & Axes**: Gray text (inherited light slate), thin lines in gray (#475569). Background transparent (the dark background shows through).
- **Series Colors**: Use accent-blue for primary metric, accent-cyan for secondary. Status colors (green/yellow/red) only for risk/status series.
- **No animations** unless explicitly added in future; static render on load.

### Navigation (Sidebar)
- **Style**: Dark primary background (#0f172a), light slate text. Nav items use label-weight type.
- **Active State**: Cyan left border (4px), light background (dark secondary). Clear, unmistakable active indicator.
- **Hover State**: Dark secondary background (subtle lift, no shadow).

## 6. Do's and Don'ts

### Do:
- **Do** use cyan for primary CTAs ("Apply Intervention", "Save"). High contrast, commanding presence.
- **Do** pair color + icon + number for risk levels. Never rely on color alone for status communication.
- **Do** use label-weight (500) for all form labels, button text, and risk scores. Subtle tracking signals precision.
- **Do** keep card shadows flat at rest and apply cyan glow only on hover.
- **Do** use light slate (#f1f5f9) for all body text and ensure ≥4.5:1 contrast.
- **Do** stack buttons vertically if space is tight; never wrap buttons in one row.
- **Do** test every interactive element for keyboard focus (blue outline ring).

### Don't:
- **Don't** use generic SaaS dashboard patterns: heavy cards with drop shadows, rounded-corner decoration, pastel backgrounds. We are data-focused and technical.
- **Don't** use emoji, playful copy, or warm tones. Sellers are stressed about returns; the tool should feel serious and expert.
- **Don't** use border-left stripes or gradient text. Clarity over decoration.
- **Don't** apply shadows to surfaces at rest. Shadows only on hover/focus.
- **Don't** mix fonts or use custom web fonts. System sans-serif throughout.
- **Don't** use purple as a primary accent; reserve it for rare emphasis or special states.
- **Don't** rely on color alone for status. Always pair with icon and numeric value.
- **Don't** set opacity on text to indicate lower importance. Use a darker gray or different size instead.
- **Don't** add animations for their own sake. Motion is rare and responsive (button press, filter change, focus).
