# CSS Animation Spec — Post 2

## Purpose
Help the user understand SIP Calculator India without visual clutter.

## Allowed animations
- **Subtle Number Increment:** When calculation results appear, the numbers (total investment, wealth gained, maturity amount) gently animate from zero or a lower value to their final calculated value.
- **Progress Bar for Tenure:** A subtle animation on the investment tenure input, perhaps a small bar filling up as the period increases.
- **Coin/Rupee Icon Animation:** Small, tasteful animation of a rupee coin or growth arrow appearing or subtly moving near the 'Wealth Gained' section.
- **Input Field Focus Effect:** A clean, minimal border or background highlight animation when an input field is focused, guiding the user's attention.

## Style
- Clean RupeeKit finance UI.
- Mobile first.
- Soft card reveal, numeric counter, and simple bar/progress visuals only.
- No distracting flashing animation.
- No fake urgency.

## Performance
Use CSS transitions/transforms. Avoid layout thrashing. Respect reduced-motion users with `prefers-reduced-motion`.
