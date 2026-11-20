---
name: Industrial Monograph
colors:
  surface: '#faf9fb'
  surface-dim: '#dbd9dc'
  surface-bright: '#faf9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f5'
  surface-container: '#efedf0'
  surface-container-high: '#e9e8ea'
  surface-container-highest: '#e3e2e4'
  on-surface: '#1b1c1e'
  on-surface-variant: '#424843'
  inverse-surface: '#303032'
  inverse-on-surface: '#f2f0f3'
  outline: '#727972'
  outline-variant: '#c2c8c0'
  surface-tint: '#47654f'
  primary: '#24412e'
  on-primary: '#ffffff'
  primary-container: '#3b5944'
  on-primary-container: '#adceb4'
  inverse-primary: '#adcfb4'
  secondary: '#5c5e62'
  on-secondary: '#ffffff'
  secondary-container: '#e1e2e7'
  on-secondary-container: '#626468'
  tertiary: '#2b4032'
  on-tertiary: '#ffffff'
  tertiary-container: '#415748'
  on-tertiary-container: '#b3ccb8'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c9ebcf'
  primary-fixed-dim: '#adcfb4'
  on-primary-fixed: '#032110'
  on-primary-fixed-variant: '#2f4d39'
  secondary-fixed: '#e1e2e7'
  secondary-fixed-dim: '#c5c6cb'
  on-secondary-fixed: '#191c1f'
  on-secondary-fixed-variant: '#45474b'
  tertiary-fixed: '#d0e9d5'
  tertiary-fixed-dim: '#b4cdb9'
  on-tertiary-fixed: '#0b2013'
  on-tertiary-fixed-variant: '#364c3d'
  background: '#faf9fb'
  on-background: '#1b1c1e'
  surface-variant: '#e3e2e4'
typography:
  display-lg:
    fontFamily: Newsreader
    fontSize: 56px
    fontWeight: '400'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Newsreader
    fontSize: 36px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Newsreader
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Space Grotesk
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Space Grotesk
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.06em
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system draws its foundation from Swiss typographic tradition, industrial architectural drafting, and the tactile permanence of archival catalog monographs. It prioritizes clarity, structural discipline, and structural materiality over synthetic decorative effects. 

The aesthetic marries utilitarian drafting precision with the warm, deliberate pacing of physical editorial volumes. Interfaces feel engineered yet literary—reminiscent of bespoke technical journals, archival field folios, and mechanical blueprint dossiers. The mood is calm, authoritative, meticulous, and grounded.

## Colors

The color palette is built on physical paper textures and technical ink values:
- **Base Surfaces:** Canvas sits on tactile linen/oatmeal paper (`#F5F4EE`), layered above sunken or base structural panels (`#FAF9F5`), and stacked against distinct container panels (`#EBEAE3`).
- **Typography & Structural Inks:** Primary text is an unapologetic carbon slate (`#18191B`), supported by technical annotation gray (`#57595D`). Dividers, hair lines, and architectural bounding boxes use precision border framing (`#D8D6CE`).
- **Tactical Olive Accents:** Used deliberately for primary interactive focus, states, and telemetry data. Primary action stems from `#3B5944`, flanked by muted sage `#4D6B56` for secondary indicators and deep forest `#283D2F` for anchored high-emphasis states.

## Typography

The typographic hierarchy implements a high-contrast editorial triad:
1. **Newsreader** delivers literary authority and monograph weight for primary headlines and chapter-like dividers.
2. **Space Grotesk** serves as the functional Swiss-style body face, delivering modernist geometry and high legibility across densified layouts.
3. **JetBrains Mono** controls all structural indices, technical metadata, coordinates, gauges, and form tags—treated strictly in uppercase or tabular numerals.

## Layout & Spacing

The layout model adheres to a rigorous 12-column architectural grid with visible hairline alignment corridors.
- **Canvas Margins:** Desktop sections enforce an intentional `3rem` boundary to echo physical catalog margins, compressing to `1.25rem` on mobile viewports.
- **Modular Rhythm:** Spacing is strictly calculated using a 4px/8px modular base. Elements must snap flush against hairline borders (`#D8D6CE`) rather than floating in unanchored white space.
- **Data Densities:** Information grids favor tight vertical stacking (`space-xs` to `space-sm`) for metadata combined with generous macro section separators (`space-xl`).

## Elevation & Depth

This system avoids synthetic drop shadows, skeuomorphic glows, or blurred backdrops. Depth is conveyed entirely through tonal layering, crisp borders, and dimensional surface stepping:
- **Hairline Framing:** A single 1px solid border (`#D8D6CE`) is the primary boundary delineation between modules.
- **Tonal Stepping:** Layering moves upward from base paper (`#F5F4EE`) to container panels (`#EBEAE3`), with active or elevated card faces surfaced in bright crisp canvas (`#FAF9F5`).
- **Tactile Hard Casts:** When high emphasis is required (e.g., active dropdown overlays, floating palettes), a brutalist 2px hard offset ink line (`#18191B`) is applied with zero blur, mimicking stamped physical paper.

## Shapes

The design system is strictly sharp (`roundedness: 0`). 
Corners retain pure 90-degree industrial intersections, reinforcing the aesthetic of sliced paper stock, drafting boards, and machined tooling modules. Notched corners, chamfers, or clean 1px perimeter gutters are permitted on specialized technical containers.

## Components

### Buttons
- **Primary:** Background in `#3B5944`, typography in `#FAF9F5` (JetBrains Mono, uppercase, `label-md`), bordered by 1px solid `#283D2F`. Hover transitions to `#283D2F`.
- **Secondary / Technical:** Background in `#EBEAE3`, text in `#18191B`, framed with 1px `#D8D6CE`. Hover shifts border to `#18191B`.
- **Padding:** 8px vertical by 16px horizontal, flat 0px corners.

### Chips & Technical Badges
- Compact rectangular modules with 1px border `#D8D6CE` on `#FAF9F5`.
- Typeset in `label-sm` (`JetBrains Mono`), using numeric prefixes (e.g., `[ 01 / ACTIVE ]`). Status dots are 6px solid squares.

### Lists & Data Tables
- Flush full-width grid layouts separated by horizontal 1px lines (`#D8D6CE`).
- Row headers set in `JetBrains Mono` (`label-sm`, muted `#57595D`), values rendered in `Space Grotesk` (`body-md`).
- Alternating subtle rows using `#FAF9F5` and `#F5F4EE`.

### Checkboxes & Radio Buttons
- **Checkbox:** Square 14x14px box, 1px border `#18191B` on `#FAF9F5`. Checked state is a solid inner square block (`#3B5944`) with 2px inset spacing.
- **Radio:** Diamond-shaped rotated bounding frame (or strict square container with diagonal drafting tick), maintaining the utilitarian architectural vernacular.

### Input Fields
- Flat fields resting on `#FAF9F5` or transparent linen base, anchored by a bottom-only or full 1px border in `#D8D6CE`.
- Focus shifts the perimeter to a 1px solid `#3B5944` with a technical superscript index above the entry line.

### Cards & Technical Dossiers
- Framed in 1px solid `#D8D6CE` on `#EBEAE3` or `#FAF9F5`.
- Dossier-style cards feature a distinct header bar carrying technical sheet metadata (ID codes, timestamps) in `label-sm` before rendering editorial titles in `Newsreader`.