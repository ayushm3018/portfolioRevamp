import Spline from "@splinetool/react-spline";
import { useEffect, useRef } from "react";

export default function SplineScene({ mobile = false }) {
  const containerRef = useRef();
  useEffect(() => {
    if (mobile) return;
    let rafId = null;

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!containerRef.current) return;
        const viewportHeight = window.innerHeight;
        const scrollPercentage = Math.min(window.scrollY / viewportHeight, 1);
        const scale = 1 - scrollPercentage * 0.5;
        const translateX = -25 * scrollPercentage;
        containerRef.current.style.transform = `translate3d(${translateX}%, 0, 0) scale(${scale})`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [mobile]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: "translateZ(0)",
      }}
    >
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          willChange: "transform",
          transformOrigin: "center center",
        }}
      >
        <Spline scene="https://prod.spline.design/Jp1nG6e1zg5iTPrY/scene.splinecode" />
      </div>
    </div>
  );
}
