# CSS Animation Spec — Post 1

## Purpose
Help the user understand Income Tax Calculator: Old vs New Regime India (FY 2023-24) without visual clutter.

## Allowed animations
- Subtle hover effects on calculator input fields and result boxes to indicate interactivity and focus.
- A smooth, progressive loading animation for the example tables or charts, revealing data points one by one.
- Small, engaging animation (e.g., numbers counting up) when the calculator results are displayed, making the output feel dynamic.
- A 'scroll to top' button that subtly appears after scrolling down a certain distance, with a smooth scroll animation.

## Style
- Clean RupeeKit finance UI.
- Mobile first.
- Soft card reveal, numeric counter, and simple bar/progress visuals only.
- No distracting flashing animation.
- No fake urgency.

## Performance
Use CSS transitions/transforms. Avoid layout thrashing. Respect reduced-motion users with `prefers-reduced-motion`.
