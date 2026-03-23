# Design System Document

## 1. Creative North Star: "The Digital Monolith"
This design system moves away from the cluttered, utility-first appearance of traditional file explorers. It treats digital assets as high-value artifacts within a curated gallery. The "Digital Monolith" philosophy relies on **Atmospheric Depth** rather than structural lines. By utilizing expansive negative space, intentional asymmetry, and a monochromatic hierarchy, we create a sense of quiet authority and technical precision. This is not a "tool"—it is a professional environment for high-stakes data.

## 2. Color & Atmospheric Tones
The palette is a sophisticated range of deep charcoals and muted slates. We reject "pure black" in favor of a deep navy-charcoal (`#060e20`) to maintain a sense of air and premium "ink" quality.

### The "No-Line" Rule
Traditional 1px borders are strictly prohibited for sectioning. They create visual noise and cheapen the editorial feel. 
- **Boundaries:** Define sections using background shifts. For example, a navigation sidebar should use `surface_container_low` against a `surface` main content area.
- **Surface Hierarchy:** Treat the UI as layers of physical material.
    - **Base:** `surface` (#060e20)
    - **Secondary Sections:** `surface_container_low` (#06122d)
    - **Interactive Elements:** `surface_container_highest` (#00225a)
- **Glass & Gradient Rule:** For floating modals or "quick view" file previews, use `surface_bright` with a 60% opacity and a 20px backdrop-blur. This "frosted glass" effect allows the data below to bleed through, maintaining context.
- **Signature Textures:** Use a subtle linear gradient (Top-Left: `primary` to Bottom-Right: `primary_container`) for main Action buttons (e.g., "Upload") to give them a soft, metallic sheen.

## 3. Typography: Editorial Precision
The system uses **Inter** to bridge the gap between technical clarity and modern Swiss style.

*   **The Hero Scale:** Use `display-lg` for empty states or storage overviews (e.g., "75% Full") to create a bold, editorial impact.
*   **The Detail Scale:** Use `label-sm` and `label-md` for file metadata (size, date, extension). These should use `on_surface_variant` (#91aaeb) to create a clear secondary hierarchy.
*   **The Authority Scale:** File names use `title-md`. They must be high-contrast (`on_surface`) to ensure immediate scannability against the dark background.

## 4. Elevation & Depth: Tonal Layering
We do not use "drop shadows" in the traditional sense. Depth is an optical illusion created through tone and blur.

*   **Layering Principle:** To lift a file card, place a `surface_container_high` card on a `surface_container_low` background. The subtle shift in hex value provides enough "lift" for the human eye without requiring a border.
*   **Ambient Shadows:** If an element must float (e.g., a context menu), use a shadow with a 40px blur, 0px offset, and 8% opacity using the `on_background` color. This mimics a soft glow rather than a harsh shadow.
*   **Ghost Borders:** For accessibility on interactive inputs, use `outline_variant` at **15% opacity**. This "Ghost Border" provides a hint of structure without breaking the seamless flow.

## 5. Components

### Cards & File Grid
*   **Forbid Dividers:** Do not use lines between file rows. Use a `4` (1rem) spacing gap or a slight background hover state (`surface_bright`) to define the row.
*   **Rounding:** All file thumbnails and cards must use `md` (0.75rem) rounding to soften the technical nature of the UI.

### Buttons
*   **Primary:** A subtle gradient from `primary` to `primary_container`. Text should be `on_primary`. Shape: `full` (pill-shaped) for high-level actions.
*   **Secondary:** Ghost style. No background, `on_surface` text, and a 10% `outline_variant` border.
*   **Tertiary:** `on_surface_variant` text with no background. Used for "Cancel" or low-priority actions.

### Input Fields & Search
*   **Container:** Use `surface_container_highest` with a `sm` (0.25rem) rounding.
*   **State:** On focus, transition the background to `surface_bright` and the ghost border to 40% opacity.

### Selection Chips
*   **Style:** Use `secondary_container` for the background and `on_secondary_container` for text. Rounding should be `full`. Use these for file tags (e.g., "Invoice," "PDF," "Project Alpha").

### Unique Component: The "Storage Prism"
A custom progress bar for storage capacity. Instead of a flat bar, use a 4px tall track (`surface_container_highest`) with a glowing `primary` fill that has a subtle outer glow (4px blur) of the same color.

## 6. Do’s and Don’ts

### Do
*   **Do** use `24` (6rem) of padding for top-level page headers to create a "gallery" feel.
*   **Do** use `on_surface_variant` for all non-essential text to maintain a calm, low-friction environment.
*   **Do** use `soft` rounding (`md`) for containers but `full` rounding for interactive triggers (buttons/chips).

### Don't
*   **Don't** use 100% white (#FFFFFF). It is too jarring. Use `on_surface` (#dee5ff) for the brightest elements.
*   **Don't** use standard "Blue" for links. Use the `primary_dim` tone for a more integrated, sophisticated look.
*   **Don't** crowd the layout. If in doubt, increase the spacing by one step on the scale (e.g., move from `4` to `5`).