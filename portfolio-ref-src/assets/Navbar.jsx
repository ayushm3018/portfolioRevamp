import React, { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav
      className={`navbar ${isHovered ? "expanded" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ul className="nav-links">
        <li>
          <a href="#skills">Skills</a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/ayushmishra02/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href="/Ayush_Resume.pdf"
            download="Ayush_Mishra_Resume.pdf"
          >
            Resume
          </a>
        </li>
      </ul>
    </nav>
  );
}
