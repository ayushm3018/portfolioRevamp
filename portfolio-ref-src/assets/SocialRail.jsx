import React from "react";
import { SiLeetcode, SiGithub, SiGmail } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
import "./SocialRail.css";

/* LinkedIn was dropped from the Simple Icons set, so it comes from fa6 instead. */
const links = [
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/rayuga3018/",
    Icon: SiLeetcode,
  },
  {
    label: "GitHub",
    href: "https://github.com/ayushm3018",
    Icon: SiGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ayushmishra02/",
    Icon: FaLinkedinIn,
  },
  {
    /* Gmail's compose window, not a mailto:. A mailto: is handed to the OS mail
       handler, and a browser with none registered just opens an empty tab. */
    label: "Gmail",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=ayushmishra3018@gmail.com",
    Icon: SiGmail,
  },
];

export default function SocialRail() {
  return (
    <div className="social-rail">
      {links.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          data-label={label}
          aria-label={label}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon size={18} />
        </a>
      ))}
    </div>
  );
}
