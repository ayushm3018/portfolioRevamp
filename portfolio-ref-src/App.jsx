import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Div2 from "./assets/Div2";
import Heading from "./assets/Heading";
import Navbar from "./assets/Navbar";
import ParticlesBackground from "./assets/ParticlesBackground";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Community from "./components/Community";
import LeetCode from "./components/LeetCode";
import SplineScene from "./assets/SplineScene";
import Loader from "./components/Loader";

function App() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <>
      <AnimatePresence>
        {!loaded && <Loader />}
      </AnimatePresence>

      <Navbar />
      <Heading />

      {isMobile ? (
        /* Mobile: Spline fills screen then scrolls away naturally */
        <>
          <div style={{ height: "100vh" }}>
            <SplineScene mobile onLoad={() => setLoaded(true)} />
          </div>
          <Div2 />
        </>
      ) : (
        /* Desktop: Spline is sticky, Div2 overlays on scroll */
        <div>
          <div style={{ position: "sticky", top: 0, height: "100vh", zIndex: 1 }}>
            <SplineScene onLoad={() => setLoaded(true)} />
          </div>
          <div style={{ position: "relative", zIndex: 2, pointerEvents: "none" }}>
            <Div2 />
          </div>
        </div>
      )}

      <ParticlesBackground id="particles" />
      <Skills />
      <Projects />
      <Experience />
      <Community />
      <LeetCode />
      <footer style={{
        textAlign: "center",
        padding: "24px",
        color: "rgba(255,255,255,0.25)",
        fontSize: "0.85rem",
        background: "#000",
        position: "relative",
        zIndex: 1,
      }}>
        © {new Date().getFullYear()} Ayush Mishra. All rights reserved.
      </footer>
    </>
  );
}

export default App;
