import { motion } from "framer-motion";
import {
  Backend_skill,
  Frontend_skill,
  Full_stack,
  Other_skill,
} from "../Constants";

const allSkills = [...Frontend_skill, ...Backend_skill, ...Full_stack, ...Other_skill];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const iconVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.75 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-black">
      <div className="container mx-auto px-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl font-bold text-white">
            What I{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#7042f8] to-[#b49bff]">
              Work On
            </span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-wrap justify-center gap-8"
        >
          {allSkills.map((skill, index) => (
            <motion.div
              key={index}
              variants={iconVariants}
              whileHover={{ scale: 1.15, y: -4 }}
              className="flex items-center justify-center"
            >
              <img
                src={skill.Image}
                alt={skill.skill_name}
                width={skill.width}
                height={skill.height}
                loading="lazy"
                style={{ width: skill.width, height: skill.height, objectFit: "contain" }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
