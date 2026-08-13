import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../Constants/projects";

/* The preview iframe renders the site at desktop width, then scales the whole
   thing down to whatever the card actually is. Measured, not hardcoded. */
const PREVIEW_VIEWPORT_WIDTH = 1440;
/* Cross-origin framing rejection can't be detected from JS, so a site that
   refuses to frame just never fires onLoad. Give up after this and fall back to
   the poster underneath. */
const PREVIEW_LOAD_TIMEOUT_MS = 4000;
/* Long enough that sweeping the cursor across the grid mounts nothing. */
const HOVER_INTENT_MS = 180;
const MAX_VISIBLE_TAGS = 4;

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
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.78rem" }}>{project.live}</span>
        </div>
        <a
          href={project.live}
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
        src={project.live}
        title={project.title}
        style={{ flex: 1, border: "none", width: "100%", background: "#000" }}
      />
    </motion.div>
  </motion.div>
  );
};

/* 1 col under 768, 2 under 1024, 3 above. Subscribed via matchMedia rather than
   a resize listener so it only re-renders when a breakpoint is actually crossed. */
const COLUMN_QUERIES = [
  { query: "(min-width: 1024px)", columns: 3 },
  { query: "(min-width: 768px)", columns: 2 },
];

const readColumnCount = () => {
  if (typeof window === "undefined") return 3;
  return COLUMN_QUERIES.find(({ query }) => window.matchMedia(query).matches)?.columns ?? 1;
};

const useColumnCount = () => {
  const [columnCount, setColumnCount] = useState(readColumnCount);

  useEffect(() => {
    const lists = COLUMN_QUERIES.map(({ query }) => window.matchMedia(query));
    const update = () => setColumnCount(readColumnCount());

    update();
    lists.forEach((mql) => mql.addEventListener("change", update));
    return () => lists.forEach((mql) => mql.removeEventListener("change", update));
  }, []);

  return columnCount;
};

/* Live previews are a pointer affordance and a motion effect — skip them for
   touch input and for anyone who asked for reduced motion. */
const useLivePreviewEnabled = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(canHover.matches && !reducedMotion.matches);

    update();
    canHover.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);
    return () => {
      canHover.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

  return enabled;
};

const ProjectCard = ({
  project,
  rowIndex,
  isPreviewing,
  isBroken,
  onEnter,
  onLeave,
  onOpen,
  onPreviewFailed,
}) => {
  const previewBoxRef = useRef(null);
  /* height is derived from the box rather than fixed at 900 so the frame fills
     any posterAspect exactly instead of leaving a gap. */
  const [frame, setFrame] = useState({ scale: 0, height: 900 });
  const [frameLoaded, setFrameLoaded] = useState(false);

  const showFrame = Boolean(project.live) && isPreviewing && !isBroken && frame.scale > 0;

  useEffect(() => {
    const box = previewBoxRef.current;
    if (!box) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (!width) return;
      const scale = width / PREVIEW_VIEWPORT_WIDTH;
      setFrame({ scale, height: height / scale });
    });

    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isPreviewing) setFrameLoaded(false);
  }, [isPreviewing]);

  useEffect(() => {
    if (!showFrame || frameLoaded) return;
    const timer = setTimeout(() => onPreviewFailed(project.id), PREVIEW_LOAD_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [showFrame, frameLoaded, project.id, onPreviewFailed]);

  const target = project.live || project.github;

  /* Full-stack apps opt out of the modal: real auth (Google sign-in popups),
     cookies and redirects don't survive being framed, so they get a real tab. */
  const activate = () => {
    if (!target) return;
    const canUseModal = project.live && !project.openInNewTab && window.innerWidth >= 768;
    if (canUseModal) onOpen(project);
    else window.open(target, "_blank", "noopener,noreferrer");
  };

  const visibleTags = project.tags.slice(0, MAX_VISIBLE_TAGS);
  const hiddenTagCount = project.tags.length - visibleTags.length;
  const footerLabel = project.live
    ? project.openInNewTab
      ? "Open live site ↗"
      : "Click to explore →"
    : project.github
      ? "View code →"
      : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: Math.min(rowIndex, 3) * 0.1, ease: "easeOut" }}
      whileHover={target ? { y: -6 } : undefined}
      onMouseEnter={() => onEnter(project)}
      onMouseLeave={onLeave}
      onClick={activate}
      onKeyDown={(e) => {
        if (!target) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activate();
        }
      }}
      role={target ? "button" : undefined}
      tabIndex={target ? 0 : undefined}
      aria-label={target ? `${project.title} — ${project.subtitle}` : undefined}
      style={{
        background: "hsl(260,14%,8%)",
        border: "1px solid #2a2a2a",
        borderRadius: "16px",
        overflow: "hidden",
        cursor: target ? "pointer" : "default",
        position: "relative",
        zIndex: 1,
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      className="hover:!border-[#7042f8]/60 hover:shadow-[0_20px_40px_rgba(112,66,248,0.15)]"
    >
      {/* Preview: poster always mounted, live frame fades in on top of it */}
      <div
        ref={previewBoxRef}
        style={{
          width: "100%",
          aspectRatio: project.posterAspect,
          overflow: "hidden",
          position: "relative",
          background: "#000",
        }}
      >
        <img
          src={project.poster}
          alt={`${project.title} preview`}
          loading="lazy"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
          }}
        />

        {showFrame && (
          <iframe
            key={project.id}
            src={project.live}
            title={`${project.title} live preview`}
            onLoad={() => setFrameLoaded(true)}
            sandbox="allow-scripts allow-same-origin"
            tabIndex="-1"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${PREVIEW_VIEWPORT_WIDTH}px`,
              height: `${frame.height}px`,
              border: "none",
              transform: `scale(${frame.scale})`,
              transformOrigin: "top left",
              pointerEvents: "none",
              opacity: frameLoaded ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          />
        )}

        {/* subtle gradient fade at bottom */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "60px",
          background: "linear-gradient(to bottom, transparent, hsl(260,14%,8%))",
          pointerEvents: "none",
        }} />
      </div>

      {/* Info */}
      <div style={{ padding: "1.4rem" }}>
        <h3 className="text-white text-xl font-bold mb-1">{project.title}</h3>
        <p className="text-[#7042f8] text-xs font-semibold uppercase tracking-widest mb-3">
          {project.subtitle}
        </p>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {visibleTags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-[#7042f8]/10 text-[#b49bff] text-xs rounded-full border border-[#7042f8]/20"
            >
              {tag}
            </span>
          ))}
          {hiddenTagCount > 0 && (
            <span className="px-2 py-0.5 text-gray-500 text-xs rounded-full border border-[#2a2a2a]">
              +{hiddenTagCount}
            </span>
          )}
        </div>
        {footerLabel && (
          <p style={{ color: "#7042f8", fontSize: "0.78rem", opacity: 0.7 }}>
            {footerLabel}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);
  /* Only one card may hold a live frame, so at most one iframe exists at a time. */
  const [previewId, setPreviewId] = useState(null);
  const [brokenPreviews, setBrokenPreviews] = useState(() => new Set());

  const columnCount = useColumnCount();
  const livePreviewEnabled = useLivePreviewEnabled();
  const hoverTimerRef = useRef(null);

  const columns = useMemo(() => {
    /* Never open more columns than there are projects, or the empty ones still
       claim their flex-1 share and shove the cards off-centre. */
    const count = Math.max(1, Math.min(columnCount, projects.length));
    const buckets = Array.from({ length: count }, () => []);
    projects.forEach((project, i) => buckets[i % count].push(project));
    return buckets;
  }, [columnCount]);

  useEffect(() => () => clearTimeout(hoverTimerRef.current), []);

  const handleEnter = useCallback(
    (project) => {
      if (!livePreviewEnabled || !project.live) return;
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = setTimeout(() => setPreviewId(project.id), HOVER_INTENT_MS);
    },
    [livePreviewEnabled]
  );

  const handleLeave = useCallback(() => {
    clearTimeout(hoverTimerRef.current);
    setPreviewId(null);
  }, []);

  const handlePreviewFailed = useCallback((id) => {
    setBrokenPreviews((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
  }, []);

  return (
    <section id="projects" className="bg-black py-20 px-4" style={{ position: "relative", zIndex: 1 }}>
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

      {/* Round-robin into flex columns rather than CSS `columns`, which fills
          column-major and would scramble the intended project order. */}
      <div className="max-w-6xl mx-auto flex items-start gap-6">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="flex-1 min-w-0 flex flex-col gap-6">
            {column.map((project, rowIndex) => (
              <ProjectCard
                key={project.id}
                project={project}
                rowIndex={rowIndex}
                isPreviewing={previewId === project.id}
                isBroken={brokenPreviews.has(project.id)}
                onEnter={handleEnter}
                onLeave={handleLeave}
                onOpen={setActiveProject}
                onPreviewFailed={handlePreviewFailed}
              />
            ))}
          </div>
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
