import Div2 from "./assets/Div2";
import Heading from "./assets/Heading";
import Navbar from "./assets/Navbar";
import ParticlesBackground from "./assets/ParticlesBackground";
import Hero3D from "./assets/Hero3D";
import Skills from "./components/Skills";
import Experience from "./components/Experience";

function App() {
  return (
    <>
      <Navbar />
      <Heading />
      <Hero3D />
      <Div2 />
      <ParticlesBackground id="particles" />
      <Skills />
      <Experience />
    </>
  );
}

export default App;
