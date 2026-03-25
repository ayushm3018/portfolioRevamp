"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const hiddenMessages = [
  // Card 1 — both rows slightly offset vertically from each other
  [
    { text: "still googling css flexbox 🤫", x: "5%",  y: "10%" },
    { text: "works on my machine tho",        x: "53%", y: "22%" },
    { text: "// TODO: fix this later",        x: "5%",  y: "65%" },
    { text: "what even is z-index 😭",        x: "53%", y: "76%" },
  ],
  // Card 2 — diagonal zigzag top-left → bottom-right
  [
    { text: "it works on my machine ¯\\_(ツ)_/¯", x: "5%",  y: "8%"  },
    { text: "have you tried turning it off?",      x: "53%", y: "32%" },
    { text: "undefined is not a function 😅",      x: "5%",  y: "55%" },
    { text: "git commit -m 'pls work'",            x: "53%", y: "76%" },
  ],
  // Card 3 — top-right and bottom-left heavy, opposite of card 1
  [
    { text: "stackoverflow saved me 247 times", x: "53%", y: "10%" },
    { text: "git commit -m 'final_FINAL_v3'",   x: "5%",  y: "28%" },
    { text: "it's not a bug, it's a feature",   x: "53%", y: "62%" },
    { text: "console.log('why')",               x: "5%",  y: "78%" },
  ],
];

const experiences = [
  {
    title: "Co-founder & Product Lead (Former)",
    company: "Doodliee",
    period: "Aug 2025 – Jan 2026",
    description:
      "Led product development for an HTML5-based drawing platform, owning feature direction, user experience, and growth strategy. Collaborated closely with developers to deliver feedback-driven improvements and scale user adoption.",
    coreCompetencies: [
      "Product Strategy",
      "User Feedback Analysis",
      "Community Growth & Engagement",
      "Feature Prioritization & Testing"
    ],
    achievements: [
      "Translated user insights into clear technical requirements across iterative deployment cycles",
      "Scaled platform from 12 → 450+ active users across 26 countries via product-led growth and engagement initiatives"
    ]
  },
  {
    title: "Software Development Intern",
    company: "American Business Solutions Inc. (Remote)",
    period: "Aug 2024 – Nov 2024",
    description:
      "Worked on building and enhancing a role-based dashboard system, focusing on frontend development, state management, and integration with backend services.",
    technologies: ["React", "Redux", "Material-UI", "Node.js", "MongoDB", "Nodemailer"],
    achievements: [
      "Built responsive, role-based dashboards for employees and admins using React, Material-UI, and Redux for state management",
      "Implemented login, attendance, and task assignment forms with React Hook Form for validation and error handling",
      "Integrated backend APIs using Node.js and MongoDB for task and attendance tracking",
      "Set up automated email notifications using Nodemailer and documented feature flows for the team"
    ],
  },
  {
    title: "Technical Analyst Intern",
    company: "Telecommunications Consultants India Ltd. (TCIL)",
    period: "Jul 2025 – Aug 2025",
    description:
      "Assisted in onboarding telecom solutions, acting as liaison between clients, vendors, and technical teams in a fast-paced enterprise environment.",
    technologies: ["Technical Documentation", "Data Analysis", "Stakeholder Communication"],
    achievements: [
      "Tracked and triaged technical issues, collaborating with engineers to improve resolution time",
      "Prepared consolidated project updates and presented weekly to internal team",
      "Assisted in documenting requirements and tracking technical updates across projects",
    ],
  },
];

const Experience = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const cardRefs = useRef([]);
  const dotRefs = useRef([]);
  const dotRingRefs = useRef([]);
  const msgRefs = useRef(hiddenMessages.map(() => []));
  const msgContainerRefs = useRef([]);
  const timerRefs = useRef([]);
  const isHoveredRefs = useRef(hiddenMessages.map(() => false));
  const cycleRunning = useRef(hiddenMessages.map(() => false));

  const stopCycle = (cardIndex) => {
    cycleRunning.current[cardIndex] = false;
    clearTimeout(timerRefs.current[cardIndex]);
    msgRefs.current[cardIndex].forEach(m => {
      if (m) { m.style.opacity = "0"; m.style.filter = "blur(8px)"; }
    });
  };

  const startCycle = (cardIndex) => {
    if (cycleRunning.current[cardIndex]) return;
    cycleRunning.current[cardIndex] = true;
    const msgs = msgRefs.current[cardIndex];
    const shuffled = [...Array(msgs.length).keys()].sort(() => Math.random() - 0.5);
    let i = 0;

    const showNext = () => {
      if (!cycleRunning.current[cardIndex] || isHoveredRefs.current[cardIndex]) return;
      const msg = msgs[shuffled[i % shuffled.length]];
      i++;
      if (!msg) return;
      msg.style.opacity = "1";
      msg.style.filter = "blur(0px)";
      timerRefs.current[cardIndex] = setTimeout(() => {
        msg.style.opacity = "0";
        msg.style.filter = "blur(8px)";
        timerRefs.current[cardIndex] = setTimeout(showNext, 600);
      }, 2200);
    };

    showNext();
  };

  useEffect(() => {
    const observers = msgContainerRefs.current.map((container, i) => {
      if (!container) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) startCycle(i);
          else stopCycle(i);
        },
        { threshold: 0.3 }
      );
      observer.observe(container);
      return observer;
    });
    return () => {
      observers.forEach(o => o && o.disconnect());
      timerRefs.current.forEach(t => clearTimeout(t));
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Draw the vertical line as you scroll through the section
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            scrub: 1.5,
            start: "top 50%",
            end: "bottom 70%",
          },
        }
      );

      // Each card activates when it enters view
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const dot = dotRefs.current[i];
        const ring = dotRingRefs.current[i];

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        });

        // Dot fills + ring pulses
        tl.to(dot, { backgroundColor: "#7042f8", duration: 0.3 }, 0)
          .to(ring, { borderColor: "#7042f8", scale: 1.5, opacity: 0, duration: 0.6 }, 0)
          // Card glows and fades in
          .to(
            card,
            {
              opacity: 1,
              borderColor: "#7042f8",
              boxShadow: "0 0 30px rgba(112,66,248,0.25), 0 20px 40px rgba(0,0,0,0.4)",
              duration: 0.5,
            },
            0.1
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="bg-black py-20 px-4">
      {/* Heading */}
      <div className="text-center mb-20">
        <h2 className="text-5xl font-bold text-white">
          My{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#7042f8] to-[#b49bff]">
            Experience
          </span>
        </h2>
      </div>

      {/* Timeline */}
      <div className="relative max-w-5xl mx-auto">

        {/* Vertical line — desktop only */}
        {!isMobile && (
          <div
            className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2"
            style={{ width: "2px", background: "#1a1a1a" }}
          >
            <div
              ref={lineRef}
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(to bottom, #7042f8, #b49bff)",
                transformOrigin: "top center",
                scaleY: 0,
              }}
            />
          </div>
        )}

        {/* Cards */}
        {experiences.map((exp, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div
              key={index}
              className="relative flex items-center mb-16"
              style={{ justifyContent: isMobile ? "center" : (isLeft ? "flex-start" : "flex-end") }}
            >
              {/* Card */}
              <div
                ref={el => (cardRefs.current[index] = el)}
                style={{
                  width: isMobile ? "92%" : "44%",
                  background: `hsl(${260 - index * 6}, 14%, ${8 + index * 1.5}%)`,
                  border: "1px solid #2a2a2a",
                  borderRadius: "1rem",
                  padding: "1.75rem",
                  opacity: 0.3,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                  transition: "border-color 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Ghost number */}
                <span
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1.5rem",
                    fontSize: "4rem",
                    fontWeight: "bold",
                    color: "rgba(112,66,248,0.07)",
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="text-[#7042f8] text-xs font-semibold uppercase tracking-widest mb-2">
                  {exp.period}
                </p>
                <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                <p className="text-[#b49bff] text-sm font-semibold mb-4">{exp.company}</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{exp.description}</p>

                <ul className="space-y-1 mb-4">
                  {exp.achievements.map((a, idx) => (
                    <li key={idx} className="text-gray-500 text-xs flex items-start gap-2">
                      <span className="text-[#7042f8] mt-0.5">→</span>
                      {a}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {(exp.technologies || exp.coreCompetencies || []).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-[#7042f8]/10 text-[#b49bff] text-xs rounded-full border border-[#7042f8]/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Timeline dot — desktop only */}
              {!isMobile && <div
                className="absolute left-1/2 -translate-x-1/2"
                style={{ zIndex: 10 }}
              >
                {/* Pulse ring */}
                <div
                  ref={el => (dotRingRefs.current[index] = el)}
                  style={{
                    position: "absolute",
                    inset: "-6px",
                    borderRadius: "50%",
                    border: "2px solid #333",
                    scale: 1,
                    opacity: 1,
                  }}
                />
                {/* Dot */}
                <div
                  ref={el => (dotRefs.current[index] = el)}
                  style={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    backgroundColor: "#2a2a2a",
                    border: "2px solid #444",
                  }}
                />
              </div>}

              {/* Hidden messages — desktop only */}
              {!isMobile && <div
                ref={el => (msgContainerRefs.current[index] = el)}
                style={{
                  position: "absolute",
                  width: "44%",
                  height: "100%",
                  left: isLeft ? "56%" : "0%",
                  top: 0,
                  cursor: "default",
                }}
                onMouseEnter={() => {
                  isHoveredRefs.current[index] = true;
                  clearTimeout(timerRefs.current[index]);
                  msgRefs.current[index].forEach((el, i) => {
                    if (!el) return;
                    el.style.transitionDelay = `${i * 0.08}s`;
                    el.style.opacity = "1";
                    el.style.filter = "blur(0px)";
                  });
                }}
                onMouseLeave={() => {
                  isHoveredRefs.current[index] = false;
                  msgRefs.current[index].forEach(el => {
                    if (!el) return;
                    el.style.transitionDelay = "0s";
                    el.style.opacity = "0";
                    el.style.filter = "blur(8px)";
                  });
                  setTimeout(() => startCycle(index), 800);
                }}
              >
                {/* Scattered messages */}
                {hiddenMessages[index].map((msg, i) => (
                  <span
                    key={i}
                    ref={el => { if (el) msgRefs.current[index][i] = el; }}
                    style={{
                      position: "absolute",
                      left: msg.x,
                      top: msg.y,
                      width: "42%",
                      fontSize: "1rem",
                      fontWeight: "600",
                      color: "rgba(180,155,255,0.85)",
                      lineHeight: "1.5",
                      opacity: 0,
                      filter: "blur(8px)",
                      transition: "opacity 0.4s ease, filter 0.4s ease",
                      pointerEvents: "none",
                    }}
                  >
                    {msg.text}
                  </span>
                ))}
              </div>}

              {/* Horizontal connector — desktop only */}
              {!isMobile && <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: isLeft ? "50%" : "44%",
                  width: "6%",
                  height: "1px",
                  background: "#2a2a2a",
                  transform: "translateY(-50%)",
                }}
              />}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
