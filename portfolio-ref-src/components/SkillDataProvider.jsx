"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Create a proper Image component to replace Next.js Image
const Image = ({ src, width, height, alt }) => (
  <img
    src={src || "/placeholder.svg"}
    width={width}
    height={height}
    alt={alt}
    loading="lazy"
    style={{ width: `${width}px`, height: `${height}px` }}
  />
);

const SkillDataProvider = ({ src, width, height, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const animationDelay = 0.3;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      variants={imageVariants}
      animate={inView ? "visible" : "hidden"}
      custom={index}
      transition={{ delay: index * animationDelay }}
    >
      <Image
        src={src || "/placeholder.svg"}
        width={width}
        height={height}
        alt="skill image"
      />
    </motion.div>
  );
};

export default SkillDataProvider;
