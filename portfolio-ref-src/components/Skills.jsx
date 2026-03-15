import { motion } from "framer-motion";
import {
  Backend_skill,
  Frontend_skill,
  Full_stack,
  Other_skill,
} from "../Constants";
import SkillDataProvider from "./SkillDataProvider";

const SkillCategory = ({ title, skills, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="w-full"
    >
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7042f8] to-[#b49bff]">
            {title}
          </span>
        </h3>
        <div className="w-16 h-1 bg-gradient-to-r from-[#7042f8] to-[#4c1d95] rounded-full" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 pb-12">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: delay + index * 0.05 }}
            whileHover={{ scale: 1.1, y: -5 }}
            className="flex justify-center"
          >
            <SkillDataProvider
              src={skill.Image}
              width={skill.width}
              height={skill.height}
              index={index}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-5xl font-bold text-center mb-4 text-white">
            What I <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7042f8] to-[#b49bff]">Work On</span>
          </h2>
          <p className="text-center text-gray-400 max-w-2xl mx-auto">
            A comprehensive toolkit of technologies and frameworks to bring ideas to life
          </p>
        </motion.div>

        <div className="space-y-8">
          <SkillCategory title="Frontend Development" skills={Frontend_skill} delay={0.1} />
          <SkillCategory title="Backend Development" skills={Backend_skill} delay={0.2} />
          <SkillCategory title="Full Stack & Tools" skills={Full_stack} delay={0.3} />
          <SkillCategory title="Other Technologies" skills={Other_skill} delay={0.4} />
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#7042f8]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#4c1d95]/10 rounded-full blur-3xl animate-pulse" />
      </div>
    </section>
  );
};

export default Skills;
