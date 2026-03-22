import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesBackground = (props) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "repulse",
          },
          onHover: {
            enable: true,
            mode: "grab",
          },
        },
        modes: {
          push: {
            distance: 200,
            duration: 15,
          },
          grab: {
            distance: 200,
            links: {
              opacity: 1,
              color: "#b49bff",
            },
          },
        },
      },
      particles: {
        color: {
          value: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#7042f8", "#b49bff"],
        },
        links: {
          enable: true,
          distance: 150,
          color: "#b49bff",
          opacity: 0.5,
          width: 1.2,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: true,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 130,
        },
        opacity: {
          value: { min: 0.3, max: 0.7 },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: false,
    }),
    []
  );

  if (init) {
    return (
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none'
      }}>
        <Particles
          id={props.id}
          init={particlesLoaded}
          options={options}
          style={{
            position: 'absolute',
            inset: 0
          }}
        />
      </div>
    );
  }

  return null;
};

export default ParticlesBackground;