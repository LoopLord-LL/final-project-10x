// Ultra-smooth scroll helper
// Usage: import { ultraSmoothScrollTo } from './ultraSmoothScroll';
// ultraSmoothScrollTo(targetY, duration)

export function ultraSmoothScrollTo(targetY, duration = 1000) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let start;

  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  function step(timestamp) {
    if (!start) start = timestamp;
    const time = Math.min(1, (timestamp - start) / duration);
    const eased = easeInOutQuad(time);
    window.scrollTo(0, startY + diff * eased);
    if (time < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}
