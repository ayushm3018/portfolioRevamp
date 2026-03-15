import Spline from "@splinetool/react-spline";
import { useEffect, useRef, useState } from "react";

export default function SplineScene() {
  const containerRef = useRef();
  const [scrollY, setScrollY] = useState(0);

  // Add scroll event listener to transform the container
  useEffect(() => {
    const handleScroll = () => {
      const newScrollY = window.scrollY;
      setScrollY(newScrollY);

      if (containerRef.current) {
        // Calculate values based on scroll percentage
        // Assuming 100vh is our reference for full scroll
        const viewportHeight = window.innerHeight;
        const scrollPercentage = Math.min(newScrollY / viewportHeight, 1);

        // Start at 1 (original size) and scale down to 0.5
        const scale = 1 - scrollPercentage * 0.5;

        // Start at center (0%) and move to left-center (-25%)
        const translateX = -25 * scrollPercentage;

        // Apply all transformations
        containerRef.current.style.transform = `
          translateX(${translateX}%)
          scale(${scale})
        `;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "sticky",
        top: 0,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          transition: "transform 0.1s ease-out",
          transformOrigin: "center center",
        }}
      >
        <Spline scene="https://prod.spline.design/Jp1nG6e1zg5iTPrY/scene.splinecode" />
      </div>
    </div>
  );
}
