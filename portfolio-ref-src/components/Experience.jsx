"use client";
import { motion } from "framer-motion";

const ExperienceCard = ({ title, company, period, description, technologies, achievements, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative mb-8 group"
    >
      <div
        className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] p-8 rounded-xl border border-[#333] hover:border-[#7042f8] transition-all duration-300"
        style={{
          transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "translateY(-8px)";
          e.currentTarget.style.boxShadow = "0 25px 50px rgba(112, 66, 248, 0.15)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.3)";
        }}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <p className="text-[#b49bff] font-semibold text-lg">{company}</p>
          </div>
          <span className="text-gray-400 text-sm whitespace-nowrap ml-4">{period}</span>
        </div>

        <p className="text-gray-300 mb-6 leading-relaxed">{description}</p>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-[#b49bff] mb-2">Key Achievements</h4>
            <ul className="space-y-2">
              {achievements.map((achievement, idx) => (
                <li key={idx} className="text-gray-400 text-sm flex items-start gap-2">
                  <span className="text-[#7042f8] mt-1">→</span>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#b49bff] mb-2">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[#7042f8]/20 text-[#b49bff] text-xs rounded-full border border-[#7042f8]/30 hover:border-[#7042f8] transition-colors duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const experiences = [
    {
      title: "Senior Frontend Developer",
      company: "Creative Digital Studio",
      period: "2023 - Present",
      description:
        "Leading the development of high-performance web applications with modern React architecture. Spearheaded the migration to Next.js and implemented advanced optimization techniques.",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      achievements: [
        "Improved page load time by 45% through code splitting and lazy loading",
        "Built reusable component library used across 10+ projects",
        "Mentored 3 junior developers on best practices and modern React patterns",
      ],
    },
    {
      title: "Full Stack Developer",
      company: "Tech Solutions Co.",
      period: "2021 - 2023",
      description:
        "Developed full-stack web applications using the MERN stack. Worked on both frontend and backend systems, implementing complex features and ensuring seamless integration.",
      technologies: ["React", "Node.js", "MongoDB", "Express.js", "PostgreSQL"],
      achievements: [
        "Built 5 production applications serving 50,000+ active users",
        "Implemented real-time features using WebSockets reducing load by 30%",
        "Automated deployment pipeline reducing release time from 4 hours to 15 minutes",
      ],
    },
    {
      title: "Junior Web Developer",
      company: "Startup Hub Inc.",
      period: "2020 - 2021",
      description:
        "Started my development journey building responsive web applications. Learned full-stack development and participated in agile development cycles.",
      technologies: ["HTML5", "CSS3", "JavaScript", "React", "Firebase"],
      achievements: [
        "Completed 8 successful projects from concept to deployment",
        "Gained expertise in responsive design and cross-browser compatibility",
        "Contributed to open-source projects and built portfolio sites for clients",
      ],
    },
  ];

  return (
    <section id="experience" className="pt-8 pb-20 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-5xl font-bold text-center mb-4 text-white">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7042f8] to-[#b49bff]">Experience</span>
          </h2>
          <p className="text-center text-gray-400">
            Building innovative solutions through diverse roles and technologies
          </p>
        </motion.div>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} {...exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
