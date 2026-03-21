"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Div2() {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const roles = ["Web Developer", "Fullstack Developer", "Game Developer"];

  const introTextRef = useRef(null);
  const secondParaRef = useRef(null);
  const heading1Ref = useRef(null);
  const heading2Ref = useRef(null);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setDisplayText(
        isDeleting
          ? fullText.substring(0, displayText.length - 1)
          : fullText.substring(0, displayText.length + 1)
      );

      setTypingSpeed(isDeleting ? 75 : 150);

      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, typingSpeed, roles]);

  useEffect(() => {
    const animateElement = (element) => {
      if (element) {
        gsap.fromTo(
          element,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    };

    animateElement(introTextRef.current);
    animateElement(secondParaRef.current);
    animateElement(heading1Ref.current);
    animateElement(heading2Ref.current);

    ScrollTrigger.refresh();
  }, []);

  return (
    <>
      <div
        style={{
          height: "100vh",
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <div style={{ width: "60%" }}>
          <h1
            ref={heading1Ref}
            style={{
              fontSize: "3rem",
              marginBottom: "1rem",
              opacity: 0,
            }}
          >
            <span style={{ color: "rgba(255, 255, 255, 0.5)" }}> Hi, I'm </span>{" "}
            <span style={{ color: "white" }}>Ayush Mishra</span>
          </h1>
          <p
            ref={introTextRef}
            style={{
              fontSize: "2.2rem",
              lineHeight: "1.0",
              color: "rgba(255, 255, 255, 0.5)",
              opacity: 0,
            }}
          >
            I'm a passionate developer with a love for creating immersive
            digital experiences. My journey in tech began with a curiosity about
            how things work, which evolved into a career building innovative
            solutions. I specialize in web development, 3D graphics, and
            interactive applications that push the boundaries of what's possible
            on the web. When I'm not coding, you can find me exploring new
            technologies, contributing to open-source projects, or sharing my
            knowledge with the community.
          </p>
        </div>
      </div>

      <div
        style={{
          height: "100vh",
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <div style={{ width: "60%" }}>
          <h1
            ref={heading2Ref}
            style={{
              fontSize: "3rem",
              marginBottom: "1rem",
              opacity: 0,
            }}
          >
            <span style={{ color: "rgba(255, 255, 255, 0.5)" }}>I'm a </span>
            <span style={{ color: "white" }}>{displayText}</span>
            <span className="cursor">|</span>
          </h1>
          <p
            ref={secondParaRef}
            style={{
              fontSize: "2.2rem",
              lineHeight: "1.0",
              color: "rgba(255, 255, 255, 0.5)",
              opacity: 0,
            }}
          >
            With expertise in modern frameworks and technologies, I build
            responsive, interactive, and user-friendly applications. My approach
            combines technical excellence with creative problem-solving to
            deliver exceptional digital experiences.
          </p>
          <style jsx="true">{`
            .cursor {
              animation: blink 1s infinite;
            }
            @keyframes blink {
              0%,
              100% {
                opacity: 1;
              }
              50% {
                opacity: 0;
              }
            }
          `}</style>
        </div>
      </div>
    </>
  );
}
