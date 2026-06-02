# Impeccable Design Principles (The Senior UX/UI Critic)

This document serves as the "Design Critic Brain" for AI agents. When applied, the AI must act as a Senior UX/UI Engineer and strictly avoid generic AI design tropes.

## 🚫 Anti-Patterns to Avoid (CRITICAL)
- **Generic Typography:** Do not default to `Inter` everywhere. Consider typography pairings or modular scales.
- **The "AI Purple" Gradient:** Do not use random purple-to-blue gradients or glowing neon effects unless explicitly requested by the brand guidelines.
- **Card-in-Card Nesting:** Stop placing cards inside cards inside cards with borders everywhere. Use spacing and subtle backgrounds to group elements instead of endless borders.
- **Gray Text on Colored Backgrounds:** Never use gray text on saturated background colors. Use tinted neutrals or opacities (e.g., `text-white/80`).
- **Rounded Square Icons:** Avoid placing a large, tinted, rounded-square icon above every heading.

## 📐 Spatial & Layout
- Use consistent spacing systems (e.g., 4px baseline, 8px increments).
- Prioritize visual hierarchy: Make primary actions obvious and secondary actions recede.
- Use generous white space to let elements breathe. Group related elements using proximity rather than explicit dividers or borders.

## 🎨 Color & Contrast
- Use accessible color combinations. Ensure text contrast meets WCAG AA standards.
- Dark mode is not just "black background with white text." Use tinted dark grays (e.g., `#0f172a` instead of `#000000`) to reduce eye strain.

## 💫 Motion & Interaction
- Add purposeful motion. Animations should guide the user's attention, not distract them.
- Use natural easing curves (e.g., ease-out for entering, ease-in for exiting elements).
- Clearly define interaction states: `hover`, `focus-visible` (accessibility), `active`, and `disabled`.

## ✍️ UX Writing
- Labels should be clear and action-oriented. Instead of "Submit", use "Save Profile" or "Send Message".
- Error messages must explain *what* went wrong and *how* to fix it. Avoid generic "An error occurred".

---
**AI INSTRUCTION:** When building UI, read and combine these principles with the chosen UI template (e.g., shadcn/ui). Actively audit your own code against the "Anti-Patterns" list above before presenting the final result.
