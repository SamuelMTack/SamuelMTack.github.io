# Design System Strategy: The Kinetic Ether

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Kinetic Ether."** 

Unlike standard AI interfaces that rely on rigid, boxed-in chat bubbles and heavy sidebars, this system treats the UI as a fluid, living environment. We are moving away from the "Dashboard" look and toward an "Atmospheric Workspace." By utilizing high-contrast typography scales (the juxtaposition of wide `Space Grotesk` headlines against utilitarian `Manrope` body text) and intentional asymmetry, we create a sense of futuristic precision that feels bespoke rather than templated.

## 2. Colors & Surface Philosophy
The palette is rooted in a deep, nocturnal foundation (`#0b1326`) to allow electric blue accents to pulse with purpose.

### The "No-Line" Rule
**Strict Mandate:** Designers are prohibited from using 1px solid borders to section off major UI areas. 
Boundaries must be defined solely through background shifts. For example, the Sidebar should live on `surface-container-low` while the main Chat Stage sits on the base `surface`. This creates a sophisticated, seamless transition that feels like a single cohesive piece of hardware.

### Surface Hierarchy & Nesting
Treat the UI as a series of nested physical layers. 
- **The Stage (Base):** `surface` (#0b1326)
- **The Navigation (Deepest Layer):** `surface-container-low` (#131b2e)
- **The Chat Input (Active Layer):** `surface-container-high` (#222a3d)
- **The Action Modals (Top Layer):** `surface-container-highest` (#2d3449) with 20% opacity.

### The "Glass & Gradient" Rule
To achieve the "Futuristic" requirement, use Glassmorphism for floating elements. Apply a `backdrop-blur` (20px–40px) and use a semi-transparent `surface-variant` (#2d3449 at 60% opacity) for the background. Main CTAs should utilize a linear gradient from `primary` (#bac3ff) to `primary-container` (#3f51b5) at a 135-degree angle to provide a "glow" that flat colors cannot replicate.

## 3. Typography
We use a dual-typeface system to balance high-tech precision with human readability.

*   **Display & Headlines (Space Grotesk):** This is our "Editorial" voice. The wide apertures and geometric construction convey a futuristic, technical authority. Use `display-lg` for welcome states and `headline-sm` for thread titles.
*   **Body & Labels (Manrope):** This is our "Functional" voice. Its modern sans-serif terminals ensure high legibility during long chat sessions. 
*   **The Hierarchy Rule:** Use `label-md` in `on-surface-variant` (#c5c5d4) for timestamps and metadata. The contrast between the bold, technical headers and the soft, legible body text creates a signature "high-end journal" feel.

## 4. Elevation & Depth
We eschew traditional drop shadows in favor of **Tonal Layering.**

*   **The Layering Principle:** Depth is achieved by stacking. A "User Bubble" using `primary-container` should sit directly on the `surface` with no shadow. The color shift provides the "lift."
*   **Ambient Shadows:** For floating elements like a "Plugin Picker," use an extra-diffused shadow: `0px 24px 48px rgba(0, 16, 92, 0.15)`. This uses a tinted version of `on-primary-fixed` to mimic light passing through blue-tinted glass.
*   **The "Ghost Border" Fallback:** If a container requires further definition (e.g., in high-density data views), use a **Ghost Border**: `outline-variant` (#454652) at 15% opacity. Never use 100% opaque borders.

## 5. Components

### Chat Bubbles
*   **AI Response:** No background. Use `surface-container-low` (#131b2e) only for code blocks or highlighted snippets. Text sits directly on the main surface to feel like the AI is "inhabiting" the space.
*   **User Input:** `surface-container-highest` (#2d3449) with a `lg` (1rem) corner radius. Use `spacing-4` (1rem) padding.

### Sidebar Navigation
*   **Background:** `surface-container-low`.
*   **Active State:** Avoid "Selected" boxes. Instead, use a 2px vertical "pulse" line of `secondary` (#a2e7ff) on the far left and transition the text weight from `medium` to `bold`.

### Input Field (The "Command Bar")
*   **Style:** A floating glass capsule. 
*   **Tokens:** `surface-container-high` with 70% opacity, `backdrop-blur-xl`, `rounded-full`. 
*   **Interaction:** On focus, the "Ghost Border" should transition to 40% opacity of `primary`.

### Buttons
*   **Primary:** Gradient of `primary` to `primary-container`. `rounded-md` (0.75rem).
*   **Secondary:** Ghost style. No background, `outline-variant` Ghost Border (20% opacity).
*   **Tertiary:** `label-md` text only, using `secondary` color (#a2e7ff).

### Cards & Lists
*   **The Divider Ban:** Never use lines. Separate message threads or list items using `spacing-6` (1.5rem) of vertical white space or a subtle background shift to `surface-container-lowest`.

## 6. Do's and Don'ts

### Do
*   **Use Asymmetry:** Place the "New Chat" button off-center or in a unique floating position to break the "standard template" feel.
*   **Embrace Breathing Room:** Use `spacing-12` and `spacing-16` for margins. Premium design is defined by what you leave out.
*   **Use Tonal Transitions:** Transition hover states by moving one tier up in the surface scale (e.g., `surface-container-low` to `surface-container`).

### Don't
*   **Don't use pure black:** It kills the "Deep Indigo" atmosphere. Always use `surface` (#0b1326).
*   **Don't use "Inner Glows":** They look dated. Use `backdrop-blur` and opacity to create depth.
*   **Don't use standard blue:** Avoid `#0000FF`. Always stick to the `electric blue` (#a2e7ff) or `indigo` (#bac3ff) tokens to maintain the high-end aesthetic.