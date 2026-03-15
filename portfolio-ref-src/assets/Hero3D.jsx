import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Hero3D = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }).map(() => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 20,
    }));
    setParticles(newParticles);
  }, []);

  const rotateX = (mousePosition.y - window.innerHeight / 2) * 0.02;
  const rotateY = (mousePosition.x - window.innerWidth / 2) * 0.02;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-[#7042f8]"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -window.innerHeight, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Floating 3D cube */}
      <motion.div
        className="absolute w-64 h-64 right-20 top-1/2 -translate-y-1/2"
        style={{
          perspective: "1000px",
        }}
        animate={{
          rotateX: rotateX,
          rotateY: rotateY,
        }}
        transition={{ type: "spring", damping: 10, mass: 0.5 }}
      >
        <motion.div
          className="w-full h-full relative"
          animate={{ rotateX: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front face */}
          <div
            className="absolute w-full h-full bg-gradient-to-br from-[#7042f8] to-[#4c1d95] border-2 border-[#b49bff]/30 flex items-center justify-center"
            style={{
              backfaceVisibility: "hidden",
              transform: "translateZ(128px)",
            }}
          >
            <span className="text-4xl font-bold text-white">3D</span>
          </div>

          {/* Back face */}
          <div
            className="absolute w-full h-full bg-gradient-to-br from-[#4c1d95] to-[#2d0a5e] border-2 border-[#b49bff]/30 flex items-center justify-center"
            style={{
              backfaceVisibility: "hidden",
              transform: "translateZ(-128px) rotateY(180deg)",
            }}
          >
            <span className="text-4xl font-bold text-white">DEV</span>
          </div>

          {/* Right face */}
          <div
            className="absolute w-full h-full bg-gradient-to-br from-[#5a38a8] to-[#7042f8] border-2 border-[#b49bff]/30"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(90deg) translateZ(128px)",
            }}
          />

          {/* Left face */}
          <div
            className="absolute w-full h-full bg-gradient-to-br from-[#3a1570] to-[#5a38a8] border-2 border-[#b49bff]/30"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(-90deg) translateZ(128px)",
            }}
          />

          {/* Top face */}
          <div
            className="absolute w-full h-full bg-gradient-to-br from-[#7042f8] to-[#5a38a8] border-2 border-[#b49bff]/30"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateX(90deg) translateZ(128px)",
            }}
          />

          {/* Bottom face */}
          <div
            className="absolute w-full h-full bg-gradient-to-br from-[#4c1d95] to-[#7042f8] border-2 border-[#b49bff]/30"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateX(-90deg) translateZ(128px)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-2xl px-4 left-0 md:left-0 md:text-left md:max-w-none md:ml-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4">
            Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7042f8] to-[#b49bff]">Developer</span>
          </h1>
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-xl text-gray-300 mb-8">
            Building stunning, interactive web experiences with cutting-edge technologies
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex gap-4 justify-center md:justify-start"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(112, 66, 248, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-[#7042f8] to-[#4c1d95] text-white font-semibold rounded-lg border border-[#b49bff]/50 hover:border-[#b49bff] transition-all duration-300"
          >
            View My Work
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-transparent text-[#b49bff] font-semibold rounded-lg border-2 border-[#b49bff] hover:bg-[#7042f8]/10 transition-all duration-300"
          >
            Get in Touch
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Glow effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-[#7042f8]/5 to-transparent blur-3xl" />
      </div>
    </section>
  );
};

export default Hero3D;
