import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "DelhiMart",
    subtitle: "E-Commerce SPA",
    url: "https://delhimart.netlify.app/",
    description: "A client-side e-commerce SPA implementing end-to-end shopping flows — cart, checkout, wishlist, order tracking, PIN code-based delivery, and multi-criteria filtering across 60+ products.",
    tags: ["React 18", "Vite 5", "Tailwind CSS", "React Router DOM", "Context API", "useReducer"],
  },
  {
    id: 2,
    title: "SocialVibe",
    subtitle: "Social Media Platform",
    url: "https://socialvibee.netlify.app/",
    description: "A full-featured client-side social media platform with auth flows, infinite scroll feeds, stories, DMs, and debounced search.",
    tags: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Context API"],
  },
];

const BrowserWindow = ({ project, onClose }) => {
  const [maximized, setMaximized] = useState(false);

  return (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25 }}
    onClick={onClose}
    style={{
      position: "fixed",
      inset: 0,
      background: maximized ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.88)",
      backdropFilter: "blur(6px)",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: maximized ? "0" : "24px",
    }}
  >
    <motion.div
      initial={{ scale: 0.85, opacity: 0, y: 40 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.85, opacity: 0, y: 40 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      onClick={(e) => e.stopPropagation()}
      style={{
        width: maximized ? "100vw" : "90vw",
        height: maximized ? "100vh" : "88vh",
        background: "#0e0e0e",
        borderRadius: maximized ? "0" : "14px",
        overflow: "hidden",
        border: maximized ? "none" : "1px solid #2a2a2a",
        boxShadow: maximized ? "none" : "0 30px 80px rgba(0,0,0,0.9), 0 0 0 1px rgba(112,66,248,0.25)",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.3s ease, height 0.3s ease, border-radius 0.3s ease",
      }}
    >
      {/* Title bar */}
      <div style={{
        height: "42px",
        background: "#1a1a1a",
        borderBottom: "1px solid #2a2a2a",
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div
            onClick={onClose}
            title="Close"
            style={{ width: 13, height: 13, borderRadius: "50%", background: "#ff5f57", cursor: "pointer" }}
          />
          <div
            onClick={onClose}
            title="Minimize"
            style={{ width: 13, height: 13, borderRadius: "50%", background: "#febc2e", cursor: "pointer" }}
          />
          <div
            onClick={() => setMaximized(m => !m)}
            title={maximized ? "Restore" : "Maximize"}
            style={{ width: 13, height: 13, borderRadius: "50%", background: "#28c840", cursor: "pointer" }}
          />
        </div>
        <span style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(255,255,255,0.45)",
          fontSize: "0.82rem",
          fontWeight: 500,
          pointerEvents: "none",
        }}>
          {project.title} — {project.subtitle}
        </span>
      </div>

      {/* URL bar */}
      <div style={{
        height: "40px",
        background: "#141414",
        borderBottom: "1px solid #222",
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        gap: 10,
        flexShrink: 0,
      }}>
        <span style={{ color: "#444", fontSize: "0.9rem", userSelect: "none" }}>←</span>
        <span style={{ color: "#444", fontSize: "0.9rem", userSelect: "none" }}>→</span>
        <div style={{
          flex: 1,
          background: "#1e1e1e",
          borderRadius: "7px",
          padding: "5px 14px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          border: "1px solid #2a2a2a",
        }}>
          <span style={{ fontSize: "0.7rem" }}>🔒</span>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.78rem" }}>{project.url}</span>
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          title="Open in new tab"
          style={{ color: "#555", fontSize: "1rem", textDecoration: "none", lineHeight: 1 }}
        >
          ↗
        </a>
      </div>

      {/* iframe */}
      <iframe
        src={project.url}
        title={project.title}
        style={{ flex: 1, border: "none", width: "100%", background: "#000" }}
      />
    </motion.div>
  </motion.div>
  );
};

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section className="bg-black py-20 px-4" style={{ position: "relative", zIndex: 1 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <h2 className="text-5xl font-bold text-white">
          My{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#7042f8] to-[#b49bff]">
            Projects
          </span>
        </h2>
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
            whileHover={{ y: -6 }}
            onClick={() => {
              if (window.innerWidth < 768) {
                window.open(project.url, "_blank", "noopener,noreferrer");
              } else {
                setActiveProject(project);
              }
            }}
            style={{
              background: "hsl(260,14%,8%)",
              border: "1px solid #2a2a2a",
              borderRadius: "16px",
              overflow: "hidden",
              cursor: "pointer",
              position: "relative",
              zIndex: 1,
              transition: "border-color 0.3s ease, box-shadow 0.3s ease",
            }}
            className="hover:!border-[#7042f8]/60 hover:shadow-[0_20px_40px_rgba(112,66,248,0.15)]"
          >
            {/* Live preview */}
            <div style={{
              width: "100%",
              height: "220px",
              overflow: "hidden",
              position: "relative",
              background: "#000",
            }}>
              <iframe
                src={project.url}
                title={`${project.title} preview`}
                style={{
                  width: "1440px",
                  height: "900px",
                  border: "none",
                  transform: "scale(0.3)",
                  transformOrigin: "top center",
                  marginLeft: "calc(50% - 720px)",
                  pointerEvents: "none",
                }}
                tabIndex="-1"
              />
              {/* transparent overlay so clicks reach the card */}
              <div style={{ position: "absolute", inset: 0 }} />
              {/* subtle gradient fade at bottom */}
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "60px",
                background: "linear-gradient(to bottom, transparent, hsl(260,14%,8%))",
              }} />
            </div>

            {/* Info */}
            <div style={{ padding: "1.4rem" }}>
              <h3 className="text-white text-xl font-bold mb-1">{project.title}</h3>
              <p className="text-[#7042f8] text-xs font-semibold uppercase tracking-widest mb-3">
                {project.subtitle}
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-[#7042f8]/10 text-[#b49bff] text-xs rounded-full border border-[#7042f8]/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p style={{ color: "#7042f8", fontSize: "0.78rem", opacity: 0.7 }}>
                Click to explore →
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeProject && (
          <BrowserWindow project={activeProject} onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
