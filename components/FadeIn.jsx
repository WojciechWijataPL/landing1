"use client";

import { motion } from "framer-motion";

/**
 * Subtelna animacja wejścia (fade-in-up) uruchamiana, gdy element
 * pojawia się w viewport podczas scrollowania.
 */
export default function FadeIn({
  children,
  delay = 0,
  className = "",
  as = "div",
}) {
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
