import { motion } from "framer-motion";

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
      }}
    >
      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          fontWeight: "bold",
          background: "linear-gradient(to right, #7042f8, #b49bff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-0.02em",
        }}
      >
        Ayush Mishra
      </motion.h1>

      {/* Animated loading bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ width: "clamp(160px, 30vw, 260px)", position: "relative" }}
      >
        {/* Track */}
        <div style={{
          width: "100%",
          height: "2px",
          background: "rgba(255,255,255,0.08)",
          borderRadius: "999px",
          overflow: "hidden",
        }}>
          {/* Fill — sweeps left to right then repeats */}
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: "60%",
              height: "100%",
              background: "linear-gradient(to right, transparent, #7042f8, #b49bff, transparent)",
              borderRadius: "999px",
            }}
          />
        </div>
      </motion.div>

      {/* Subtle label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          color: "rgba(255,255,255,0.2)",
          fontSize: "0.75rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        Loading
      </motion.p>
    </motion.div>
  );
}
