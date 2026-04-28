"use client";

const EDGE_ZONE_PX = 96;
const MAX_SCROLL_STEP_PX = 24;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function getViewportAutoScrollStep(clientY) {
  if (typeof window === "undefined") return 0;
  const viewportHeight = window.innerHeight || 0;
  if (viewportHeight <= 0) return 0;

  if (clientY < EDGE_ZONE_PX) {
    const intensity = clamp((EDGE_ZONE_PX - clientY) / EDGE_ZONE_PX, 0, 1);
    return -Math.ceil(MAX_SCROLL_STEP_PX * intensity);
  }

  if (clientY > viewportHeight - EDGE_ZONE_PX) {
    const intensity = clamp((clientY - (viewportHeight - EDGE_ZONE_PX)) / EDGE_ZONE_PX, 0, 1);
    return Math.ceil(MAX_SCROLL_STEP_PX * intensity);
  }

  return 0;
}

export function autoScrollViewportByPointer(clientY) {
  if (typeof window === "undefined") return false;
  const step = getViewportAutoScrollStep(clientY);
  if (step === 0) return false;
  window.scrollBy(0, step);
  return true;
}

export function createViewportAutoScrollController() {
  let rafId = null;
  let lastClientY = null;

  const tick = () => {
    rafId = null;
    if (lastClientY == null) return;
    const didScroll = autoScrollViewportByPointer(lastClientY);
    if (didScroll) {
      rafId = window.requestAnimationFrame(tick);
    }
  };

  const update = (clientY) => {
    if (typeof window === "undefined") return;
    lastClientY = clientY;
    if (rafId != null) return;
    rafId = window.requestAnimationFrame(tick);
  };

  const stop = () => {
    lastClientY = null;
    if (rafId != null && typeof window !== "undefined") {
      window.cancelAnimationFrame(rafId);
    }
    rafId = null;
  };

  return { update, stop };
}
