# Design System Strategy: The Atmospheric Observer

## 1. Overview & Creative North Star
The "Creative North Star" for this design system is **"The Atmospheric Observer."** 

We are moving away from the "widget-heavy" look of standard weather apps and toward a high-end editorial experience that feels as fluid and layered as the sky itself. This system rejects the rigid, boxed-in grid in favor of **Intentional Asymmetry** and **Tonal Depth**. By utilizing overlapping glass surfaces and high-contrast typography scales, we create an interface that feels like a premium digital instrument rather than a utility tool. 

The goal is to provide "glanceable" data wrapped in a sophisticated, dark-mode aesthetic that prioritizes breathing room and professional polish.

---

## 2. Colors: The Depth of Night
Our palette is built on a foundation of deep, obsidian grays to ensure the weather data feels luminous and ethereal.

### Surface Hierarchy & Nesting
To achieve a premium feel, we strictly follow the **Nesting Principle**. Hierarchy is defined by "stacking" surface tiers.
*   **Base Layer:** Use `surface` (#0e0e0e) for the main background.
*   **Secondary Sections:** Use `surface_container_low` (#131313) to define broad content areas.
*   **Interactive Cards:** Use `surface_container` (#191a1a) or `surface_container_high` (#1f2020) for primary data modules.

### The "No-Line" Rule
**Prohibit 1px solid borders for sectioning.** Physical boundaries must be defined solely through background color shifts. For example, a `surface_container_high` weather card should sit on a `surface_container_low` background without a stroke. This creates a seamless, modern "melt."

### The "Glass & Gradient" Rule
Floating elements (like a location search bar or a detail modal) must use **Glassmorphism**. Combine `surface_variant` (#252626) at 60% opacity with a `backdrop-blur` of 20px. 
*   **Signature Textures:** Apply a subtle linear gradient (Top-Left to Bottom-Right) from `tertiary` (#b9dbff) to `on_tertiary_container` (#07456e) at 15% opacity over hero temperature displays to give the UI a "soul."

---

## 3. Typography: The Editorial Edge
We use a dual-font system to balance technical precision with high-end editorial character.

*   **Display & Headlines (Manrope):** These are your "Hero" elements. Use `display-lg` for current temperatures. The wide apertures of Manrope provide an authoritative, modern feel that commands attention.
*   **Title & Body (Inter):** Inter is used for all functional data—wind speeds, humidity, and location names. Its high x-height ensures legibility even at `label-sm` sizes against dark backgrounds.
*   **Visual Hierarchy:** Pair a `display-lg` temperature with a `label-md` "Feels Like" stat. The extreme contrast in scale (3.5rem vs 0.75rem) creates the signature editorial look.

---

## 4. Elevation & Depth
In this design system, light and shadow are used to mimic atmospheric perspective.

*   **The Layering Principle:** Depth is achieved by "stacking." A `surface_container_lowest` card placed on a `surface_container_low` section creates a soft, natural "recessed" look.
*   **Ambient Shadows:** For "floating" components, use shadows with a blur value of 40px and an opacity of 6%. Use a tint of `primary` (#c6c6c7) for the shadow color rather than pure black to simulate ambient light scattering.
*   **The "Ghost Border" Fallback:** If accessibility requires a container edge, use a "Ghost Border." Apply `outline_variant` (#484848) at **15% opacity**. Never use 100% opaque lines.

---

## 5. Components

### Weather Cards (The Core Module)
*   **Structure:** Use `xl` (1.5rem) rounded corners. 
*   **Separation:** No dividers. Use **Spacing 6** (2rem) of vertical white space to separate the "Hourly Forecast" from the "Weekly Outlook."
*   **Background:** Use `surface_container_high` with a subtle glass effect if the card is a high-priority "Hero."

### Buttons (Primary & Secondary)
*   **Primary:** Fill with `primary` (#c6c6c7), text in `on_primary` (#3f4041). Use `full` (9999px) rounding for a "pill" shape.
*   **Tertiary (Ghost):** No background. Use `on_surface` text with a `label-md` weight for "View More" actions.

### Weather Chips
*   **Visuals:** Use `secondary_container` (#3b3b3b) with `md` (0.75rem) rounded corners. 
*   **Usage:** For secondary metrics like "UV Index: 4" or "Wind: 12mph." 

### Input Fields (Search)
*   **State:** Use `surface_container_highest` (#252626) for the resting state. 
*   **Focus:** Transition to `tertiary_container` (#9fcefe) with a `Ghost Border` of `tertiary` at 30% opacity.

### Forecast Lists
*   **Guideline:** Forbid the use of divider lines. Use `surface_container_low` for even rows and `surface_container` for odd rows to create a "Zebra" stripe pattern that is felt rather than seen.

---

## 6. Do’s and Don’ts

### Do:
*   **DO** use `tertiary` (#b9dbff) and `tertiary_dim` (#91c0ef) sparingly for active weather icons (Rain, Snow) to make them pop against the gray.
*   **DO** use asymmetrical layouts. Place the main temperature off-center to the left and the weather description to the bottom right of the card.
*   **DO** leverage the `Spacing 16` (5.5rem) for section headers to create an expensive, airy feel.

### Don't:
*   **DON'T** use 1px solid white or gray lines to separate hours in a forecast. Use tonal shifts or empty space.
*   **DON'T** use pure black (#000000) for containers; it kills the "Atmospheric" depth. Stick to the `surface` tokens.
*   **DON'T** use standard "Drop Shadows." If an element needs to feel elevated, use tonal lifting (`surface_bright`) or the 6% tinted ambient shadow.