# 🎨 UI Design System Guidelines

## Design Direction
*(Specify main design style here, e.g., "Dark Mode + Glassmorphism", "Clean Minimal")*

## 🎨 Color Palette (Tailwind Tokens)
| Role | Token | Value | Usage |
|------|-------|-------|-------|
| Background | `bg-[???]` | ??? | Main background color |
| Card | `bg-[???]` | ??? | Card background |
| Primary | `text-[???]` | ??? | Primary buttons, links |
| Secondary | `text-[???]` | ??? | Secondary buttons, icons |
| Danger | `text-[???]` | ??? | Errors, delete actions |

## 📐 Layout Rules
- **Mobile:** `px-? py-?`
- **Desktop:** `p-?`
- **Navigation:** All pages must use `<??? />` from `@/components/???`

## 🧩 Component Standards
- **Buttons:** Use from `@/components/ui/button` only.
- **Icons:** Use `lucide-react` only.
- **Modals/Dialogs:** Use `Dialog` from shadcn/ui.

## 🚫 Anti-Patterns (Do NOT do)
- Do not write inline `<button className="...">` from scratch.
- Do not use colors outside the palette without justification.
- Do not create new layouts that do not inherit from the main Layout Wrapper.
