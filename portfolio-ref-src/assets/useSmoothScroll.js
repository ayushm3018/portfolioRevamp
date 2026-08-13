import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Inertial ("premium") scrolling via Lenis.
 *
 * Lenis eases the *native* scroll position on its own loop rather than
 * transforming a wrapper element, which is why the sticky Spline hero and the
 * GSAP pin/scrub triggers keep working — a transform-based smooth-scroll
 * library would break both.
 *
 * Two things are load-bearing here:
 *
 * 1. ScrollTrigger must be updated from Lenis's scroll event, and Lenis must be
 *    driven by GSAP's ticker. Run them on separate loops and Div2/Experience
 *    read a scroll position Lenis hasn't committed yet, so their animations
 *    trail the page by a frame and look like the jank this is meant to fix.
 * 2. lagSmoothing must be off. GSAP otherwise "helpfully" clamps large frame
 *    deltas, which fights Lenis's own interpolation after a stall.
 *
 * We deliberately do NOT import lenis.css: it contains
 * `.lenis-smooth iframe { pointer-events: none }`, which would make the live
 * site inside the BrowserWindow modal unclickable. The card preview iframes
 * already set pointerEvents: "none" themselves, so nothing else needs it.
 */
export default function useSmoothScroll() {
  useEffect(() => {
    /* Someone who asked the OS for less motion did not ask for scroll inertia. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      /* expo-out: moves immediately with the wheel, then settles */
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      /* Touch stays native. Smoothing finger-tracking makes a phone feel
         disconnected from the thumb, and it is the one gesture users notice. */
      syncTouch: false,
      /* Navbar #skills / #projects links ease across instead of teleporting. */
      anchors: { offset: -20 },
      /* We drive raf from the GSAP ticker below, so Lenis must not self-drive. */
      autoRaf: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => lenis.raf(time * 1000); // GSAP ticker is in seconds
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33); // GSAP's default
      lenis.destroy();
    };
  }, []);
}
