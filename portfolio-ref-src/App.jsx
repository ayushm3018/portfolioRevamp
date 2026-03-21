import Div2 from "./assets/Div2";
import Heading from "./assets/Heading";
import Navbar from "./assets/Navbar";
import ParticlesBackground from "./assets/ParticlesBackground";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
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
        <div style={{ position: "relative", zIndex: 2 }}>
          <Div2 />
        </div>
      </div>
      <ParticlesBackground id="particles" />
      <Skills />
      <Experience />
    </>
  );
}

export default App;