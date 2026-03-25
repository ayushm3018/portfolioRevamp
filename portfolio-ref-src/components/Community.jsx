import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const communityRoles = [
  {
    org: "Google Developer Student Clubs, BPIT",
    short: "GDSC",
    role: "Web Development Head",
    period: "Aug 2024 – Aug 2025",
    highlights: [
      "Strategized and led AR workshop with Snapchat, targeting 150+ participants",
      "Mentored juniors in UI/UX design, component architecture, and responsive layouts",
      "Drove iterative feedback loops and code-quality improvements across GDSC web initiatives",
    ],
  },
  {
    org: "Google Developer Student Clubs, BPIT",
    short: "GDSC",
    role: "Game Development Head",
    period: "Delhi, India",
    highlights: [
      "Led 15+ technical workshops with 80% YoY engagement increase",
      "Organized Solvesphere Challenge with 1000+ participants in cross-functional cycles",
      "Hosted Google Cloud & GenAI workshops with Newton School, scaling tech adoption",
      "Coordinated 70+ GDSC chapters across NCR in the WOW team",
    ],
  },
];

const ParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let particles = [];
    const mouse = { x: -9999, y: -9999, radius: 100 };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      buildParticles();
    };

    const buildParticles = () => {
      const W = canvas.width;
      const H = canvas.height;
      const offscreen = document.createElement("canvas");
      const octx = offscreen.getContext("2d");
      offscreen.width = W;
      offscreen.height = H;

      const fontSize = Math.min(W * 0.22, 200);
      octx.fillStyle = "#fff";
      octx.font = `900 ${fontSize}px "Helvetica Neue", Helvetica, Arial, sans-serif`;
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.fillText("</>", W / 2, H / 2);

      const imageData = octx.getImageData(0, 0, W, H).data;
      const points = [];
      const gap = W < 600 ? 5 : 3;

      for (let y = 0; y < H; y += gap) {
        for (let x = 0; x < W; x += gap) {
          const i = (y * W + x) * 4;
          if (imageData[i + 3] > 128) points.push({ x, y });
        }
      }

      particles = points.map((p) => ({
        x: Math.random() * W,
        y: Math.random() * H,
        originX: p.x,
        originY: p.y,
        vx: 0,
        vy: 0,
        size: Math.random() * 1.2 + 0.8,
        hue: 255 + Math.random() * 30,
        brightness: 65 + Math.random() * 30,
      }));
    };

    const animate = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(0, 0, W, H);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * 6;
          p.vy += Math.sin(angle) * force * 6;
        }

        p.vx += (p.originX - p.x) * 0.03;
        p.vy += (p.originY - p.y) * 0.03;
        p.vx *= 0.88;
        p.vy *= 0.88;
        p.x += p.vx;
        p.y += p.vy;

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const alpha = Math.min(1, 0.6 + speed * 0.08);
        const glow = Math.min(100, p.brightness + speed * 4);

        ctx.fillStyle = `hsla(${p.hue + speed * 2}, 90%, ${glow}%, ${alpha})`;
        ctx.fillRect(p.x, p.y, p.size + speed * 0.15, p.size + speed * 0.15);
      }

      animId = requestAnimationFrame(animate);
    };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    resize();
    animate();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "280px", display: "block", cursor: "crosshair" }}
    />
  );
};

export default function Community() {
  return (
    <section className="bg-black py-20 px-4" style={{ position: "relative", zIndex: 1 }}>
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5 }}
        className="text-center mb-4"
      >
        <h2 className="text-5xl font-bold text-white">
          Community &{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#7042f8] to-[#b49bff]">
            Leadership
          </span>
        </h2>
      </motion.div>

      {/* Particle canvas */}
      <div className="max-w-5xl mx-auto mb-10">
        <ParticleCanvas />
      </div>

      {/* Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {communityRoles.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.3, y: 40, borderColor: "#2a2a2a", boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
            whileInView={{ opacity: 1, y: 0, borderColor: "#7042f8", boxShadow: "0 0 30px rgba(112,66,248,0.25), 0 20px 40px rgba(0,0,0,0.4)" }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
            className="rounded-2xl p-6 border border-[#2a2a2a]"
            style={{ background: "hsl(260,14%,8%)", position: "relative", zIndex: 1 }}
          >
            <p className="text-xs text-[#7042f8] uppercase tracking-widest mb-1">{item.short}</p>
            <h3 className="text-white text-lg font-bold mb-1">{item.role}</h3>
            <p className="text-[#b49bff] text-xs font-semibold mb-1">{item.org}</p>
            <p className="text-gray-600 text-xs mb-4">{item.period}</p>
            <ul className="space-y-2">
              {item.highlights.map((h, idx) => (
                <li key={idx} className="text-gray-500 text-xs flex items-start gap-2">
                  <span className="text-[#7042f8] mt-0.5">→</span>
                  <span dangerouslySetInnerHTML={{
                    __html: h.replace(/\d+\+?%?/g, '<strong style="color:white">$&</strong>')
                  }} />
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
