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
          minHeight: "60vh",
          padding: "60px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <div style={{ width: "60%" }}>
          <h1
            ref={heading1Ref}
            style={{
              fontSize: "clamp(1.6rem, 4vw, 3rem)",
              marginBottom: "1rem",
              opacity: 0,
            }}
          >
            <span style={{ color: "rgba(255, 255, 255, 0.5)" }}> Hi, I'm </span>{" "}
            <span style={{
              background: "linear-gradient(to right, #7042f8, #b49bff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Ayush Mishra</span>
          </h1>
          <p
            ref={introTextRef}
            style={{
              fontSize: "clamp(1rem, 2.5vw, 2.2rem)",
              lineHeight: "1.0",
              color: "rgba(255, 255, 255, 0.5)",
              opacity: 0,
            }}
          >
            I build scalable backend systems and full-stack applications using
            strong data structures and algorithms, focusing on solving real user
            problems efficiently. My approach combines algorithmic thinking with
            product awareness—understanding what to build, why it matters, and
            how it performs at scale.
          </p>
        </div>
      </div>

      <div
        style={{
          minHeight: "60vh",
          padding: "60px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <div style={{ width: "60%" }}>
          <h1
            ref={heading2Ref}
            style={{
              fontSize: "clamp(1.6rem, 4vw, 3rem)",
              marginBottom: "1rem",
              opacity: 0,
            }}
          >
            <span style={{ color: "rgba(255, 255, 255, 0.5)" }}>I'm a </span>
            <span style={{
              background: "linear-gradient(to right, #7042f8, #b49bff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>{displayText}</span>
            <span className="cursor" style={{ color: "#7042f8" }}>|</span>
          </h1>
          <p
            ref={secondParaRef}
            style={{
              fontSize: "clamp(1rem, 2.5vw, 2.2rem)",
              lineHeight: "1.0",
              color: "rgba(255, 255, 255, 0.5)",
              opacity: 0,
            }}
          >
            I use modern web technologies to build systems that are not only
            functional, but intuitive and reliable. My work focuses on efficient
            data handling, clear API design, and making decisions that improve
            usability while keeping the system scalable.
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
