# Product

## Register

product

## Users

D2C sellers in tier-2 and tier-3 India cities, operating under margin pressure. They use ShopDeck to manage their online stores across channels. When an order arrives, they need to decide quickly: ship as-is, or take preventive action (adjust shipping, flag for QC, pause problematic SKUs) to avoid the return and the ₹200-₹400 reverse logistics cost.

Context: Sellers are busy, often working with small teams. Returns are bleeding margin (25–30% RTO rate); they can't afford to scale profitably without controlling returns. They're technical enough to use analytics but need clarity and speed, not complexity.

## Product Purpose

The Predictive RTO System automatically scores incoming orders by return risk (0–100) and recommends the right intervention (prepaid shipping, QC flag, pause SKU, monitor seller) to prevent the return before it happens. The system shows the impact: margin recovered, RTO reduced, seller retention improved.

Success looks like sellers applying interventions, seeing their RTO drop from 28% → 14%, recovering ₹400–₹650 per intervened order, and staying profitable enough to scale their business on ShopDeck instead of churning back to marketplaces.

## Brand Personality

**Confident. Powerful. Expert.**

This is a tool for sellers who need control, not hand-holding. The interface speaks with authority: here's the data, here's the risk, here's what to do. No coddling, no decorative gradients, no emojis. The tone is direct and technical—sellers should feel that ShopDeck understands the problem and knows how to solve it. Confidence comes from clarity and precision, not from flashy design.

## Anti-references

**Avoid:**
- Generic SaaS dashboard template: heavy cards, rounded-corner decorative elements, excessive whitespace, gradient accents everywhere
- Overly playful or cutesy: emoji, lowercase tone, rounded-cute typography—returns are painful; the tool should feel serious
- Marketplace-like (Shopify/Amazon Seller Central): this is a specialized ops tool, not a general platform
- Unnecessary visual complexity: decorative colors, animations for their own sake, busy layouts

## Design Principles

1. **Clarity over decoration** — Every visual element must serve data or action. No chrome for its own sake.
2. **Show data, not decoration** — Metrics and insights are the hero; minimize UI noise and visual hierarchy clutter.
3. **Expert confidence** — Dark, technical, direct. Sellers trust precision more than warmth.
4. **Seller-centric decision-making** — Every screen's layout, color, and interaction is optimized for quick, confident action (apply intervention, review order, adjust rules).
5. **Technical credibility** — The dark theme and focused palette signal that this is a serious, data-driven tool built for operational experts.

## Accessibility & Inclusion

WCAG 2.1 Level AA:
- Color contrast: ≥4.5:1 for body text and UI controls against background
- Semantic HTML and keyboard navigation throughout
- Reduced motion support for all animations
- Risk scoring uses color + icon + numeric value (not color alone)
- Error states and empty states clearly labeled

Focus on sellers with:
- Color blindness: risk levels (green/yellow/red) always paired with icon and number
- Low vision: font sizes >= 14px for body, line height >= 1.5
- Keyboard-only navigation: all forms, filters, and action buttons fully keyboard accessible

## Current Color Palette

**From tailwind.config.js:**
- Primary bg: `#0f172a` (sd-dark)
- Secondary bg: `#1e293b` (sd-secondary)
- Tertiary bg: `#334155` (sd-tertiary)
- Brand blue: `#3b82f6` (sd-blue)
- Brand cyan: `#06b6d4` (sd-cyan)
- Accent purple: `#8b5cf6` (sd-purple)
- Status green: `#10b981` (risk-green)
- Status yellow: `#f59e0b` (risk-yellow)
- Status red: `#ef4444` (risk-red)
- Text: `#f1f5f9` (light slate from globals.css)

**Verify before DESIGN.md:** Contrast ratios for body text, form labels, and risk indicators.
