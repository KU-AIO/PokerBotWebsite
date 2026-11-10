// Home-page hero motion: the p(win) count-up and the subtle card lift on scroll.
// The page is complete without this file (cards face-up, 64% shown); it only adds motion,
// and does nothing for visitors who prefer reduced motion.
(() => {
  if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;

  const hero = document.querySelector(".hero");
  const hand = hero && hero.querySelector(".hand");
  if (!hand) return;

  // Count 0 -> target in step with the bar's CSS fill animation (same easing curve).
  const fill = hand.querySelector(".readout-fill");
  const pct = hand.querySelector(".readout-pct");
  if (fill && pct && getComputedStyle(fill).animationName !== "none") {
    const target = Number(pct.dataset.countTo);
    const finalText = `${target}%`;
    const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    pct.textContent = "0%";
    fill.addEventListener(
      "animationstart",
      () => {
        const ms = parseFloat(getComputedStyle(fill).animationDuration) * 1000;
        const start = performance.now();
        const step = (now) => {
          const t = Math.min(1, (now - start) / ms);
          pct.textContent = `${Math.round(target * easeInOutCubic(t))}%`;
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { once: true }
    );
    // Never leave the readout stuck mid-count.
    fill.addEventListener("animationend", () => { pct.textContent = finalText; }, { once: true });
    fill.addEventListener("animationcancel", () => { pct.textContent = finalText; }, { once: true });
  }

  // Lift and tilt the cards slightly as the hero scrolls away; stops once it's gone.
  let queued = false;
  const update = () => {
    queued = false;
    const p = Math.min(1, Math.max(0, window.scrollY / hero.offsetHeight));
    hand.style.setProperty("--lift", p.toFixed(3));
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
  update();
})();
