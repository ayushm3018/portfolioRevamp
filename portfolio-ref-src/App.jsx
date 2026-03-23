import Div2 from "./assets/Div2";
import Heading from "./assets/Heading";
import Navbar from "./assets/Navbar";
import ParticlesBackground from "./assets/ParticlesBackground";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import LeetCode from "./components/LeetCode";
import SplineScene from "./assets/SplineScene"; // Add this import

function App() {
  return (
    <>
      <Navbar />
      <Heading />
      <div>
        <div style={{ position: "sticky", top: 0, height: "100vh", zIndex: 1 }}>
          <SplineScene />
        </div>
        <div style={{ position: "relative", zIndex: 2, pointerEvents: "none" }}>
          <Div2 />
        </div>
      </div>
      <ParticlesBackground id="particles" />
      <Skills />
      <Projects />
      <Experience />
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