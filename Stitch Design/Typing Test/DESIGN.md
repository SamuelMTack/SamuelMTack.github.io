# Design System Documentation: The Monochrome Precision Interface

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Obsidian"**

This design system moves away from the "generic dark mode" utility and toward a high-end, editorial experience designed for deep focus. It is inspired by premium physical stationery and high-performance automotive cockpits. 

To break the "template" look, we reject the standard grid in favor of **intentional asymmetry** and **tonal depth**. UI elements do not sit *on* the background; they emerge from it. By utilizing high-contrast typography (Space Grotesk) against a monochromatic foundation, we create a rhythmic, clinical, yet soulful environment that elevates the act of typing into a craft.

---

## 2. Colors & Surface Architecture

### The Monochromatic Palette
The palette is built on a foundation of `#131313` (Surface), using subtle shifts in charcoal and onyx to define space.
- **Primary (`#ffffff`):** Reserved strictly for active text and high-priority interactions.
- **Secondary (`#71d7cd`):** A soft, clinical mint used to signal "Correct" states.
- **Tertiary/Error (`#ffb4ab` / `#93000a`):** Muted rose tones for errors, ensuring they catch the eye without breaking the dark aesthetic.

### The "No-Line" Rule
**Explicit Instruction:** 1px solid borders are prohibited for sectioning. Boundaries must be defined solely through background color shifts or tonal transitions.
- Use `surface_container_low` for large section backgrounds.
- Use `surface_container_high` for interactive elements like the typing area.
- Do not use `outline` for containment; use it only at 10-20% opacity for "Ghost Borders" in extreme accessibility cases.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. 
1. **Base Layer:** `surface` (#131313).
2. **Sub-Section:** `surface_container_low` (#1c1b1b).
3. **Interactive Focus (The Typing Area):** `surface_container_highest` (#353534).
This nesting creates a "well" effect, drawing the user's eye naturally toward the center of the experience.

### The "Glass & Gradient" Rule
Floating elements (modals, tooltips, or result cards) should utilize **Glassmorphism**. Apply `surface_container_highest` at 60% opacity with a `20px` backdrop-blur. To add "visual soul," apply a subtle linear gradient from `primary` to `primary_container` (White to Light Gray) on main CTAs to give them a metallic, machined finish.

---

## 3. Typography
The system uses a dual-type approach to balance editorial authority with technical precision.

*   **Display & Headlines (Space Grotesk):** A high-personality sans-serif with geometric quirks. Used for WPM counts, titles, and stats. It provides the "modern" edge.
*   **Body & UI (Inter):** A neutral, highly legible sans-serif for settings, labels, and secondary info.
*   **The Typing Core (Monospace):** While not explicitly in the token list, the typing area must use a high-quality Monospace font (e.g., JetBrains Mono) to ensure character tracking is consistent.

**Scale Highlights:**
- **Display-LG (3.5rem):** Used for the final WPM score. It should feel massive and celebratory.
- **Label-SM (0.6875rem):** Used for micro-copy and metadata, always in `on_surface_variant` (#c6c6c6) for a muted look.

---

## 4. Elevation & Depth

### Tonal Layering Principle
Depth is achieved by stacking. A card does not need a shadow if it is `surface_container_high` sitting on a `surface_dim` background. This "Step-Up" logic creates a sophisticated, architectural feel.

### Ambient Shadows
For floating result cards or menus, use an **extra-diffused shadow**:
- `box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);`
- Shadows should never be pure black; they should feel like a darkening of the background color itself.

### The "Ghost Border"
If a container requires a boundary (e.g., a text input), use the `outline_variant` (#474747) at **20% opacity**. It should be felt, not seen.

---

## 5. Components

### The Typing Area (Signature Component)
- **Background:** `surface_container_highest`.
- **Text:** `on_surface_variant` (inactive), `primary` (active).
- **Caret:** A 2px vertical bar using `secondary` (#71d7cd) with a soft outer glow.
- **Errors:** Text color shifts to `error` (#ffb4ab) with a subtle `error_container` background highlight.

### Buttons
- **Primary:** `surface_bright` background with `on_surface` text. Shape: `md` (0.375rem).
- **Secondary:** Transparent background, `primary` text, and a `Ghost Border` (20% `outline_variant`).
- **Interaction:** On hover, shift background to `primary` and text to `on_primary`.

### Chips (Test Settings)
- **State:** Unselected chips use `surface_container_low`. Selected chips use `primary` with `on_primary` text.
- **Shape:** `full` (pill-shaped) for a modern, tactile feel.

### Cards & Lists
- **Forbidden:** Horizontal divider lines (`<hr>`).
- **Solution:** Use `1.4rem` (Spacing 4) of vertical whitespace or a subtle background shift to `surface_container_lowest` to separate content blocks.

---

## 6. Do's and Don'ts

### Do:
- **Do** use `spaceGrotesk` for all numeric data (WPM, Accuracy, Time) to emphasize the technical nature of the app.
- **Do** use `2rem` (Spacing 6) or more for layout margins to create a high-end, editorial "breathing room."
- **Do** use `secondary` (#71d7cd) sparingly as a "reward" color.

### Don't:
- **Don't** use pure black (#000000) for backgrounds; it kills the depth of the dark gray shadows. Use `surface` (#131313).
- **Don't** use 100% opaque borders. They create "visual noise" that distracts from the typing flow.
- **Don't** use standard "drop shadows" with 0 blur. Everything should feel soft, diffused, and integrated.