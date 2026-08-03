"use client";

import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: {
    transition: { delayChildren: 0.7, staggerChildren: 0.15 },
  },
};

const leaf: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 0.45, ease: "backOut" } },
};

interface GrowingPlantProps {
  className?: string;
}

export function GrowingPlant({ className }: GrowingPlantProps) {
  return (
    <motion.svg
      viewBox="0 0 200 240"
      className={className}
      initial="hidden"
      animate="show"
      variants={container}
    >
      <path
        d="M58 208 L142 208 L130 240 L70 240 Z"
        className="fill-brand-dark"
      />
      <ellipse cx="100" cy="208" rx="42" ry="9" className="fill-primary" />

      <motion.path
        d="M100 206 C 94 170, 106 128, 100 88"
        className="stroke-primary"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      />

      <motion.ellipse
        cx="68"
        cy="152"
        rx="24"
        ry="12"
        className="fill-brand-lime"
        style={{ transformOrigin: "68px 152px", rotate: -30 }}
        variants={leaf}
      />
      <motion.ellipse
        cx="132"
        cy="132"
        rx="24"
        ry="12"
        className="fill-brand-lime"
        style={{ transformOrigin: "132px 132px", rotate: 30 }}
        variants={leaf}
      />
      <motion.ellipse
        cx="74"
        cy="106"
        rx="20"
        ry="11"
        className="fill-primary"
        style={{ transformOrigin: "74px 106px", rotate: -20 }}
        variants={leaf}
      />
      <motion.ellipse
        cx="124"
        cy="90"
        rx="20"
        ry="11"
        className="fill-primary"
        style={{ transformOrigin: "124px 90px", rotate: 20 }}
        variants={leaf}
      />
      <motion.ellipse
        cx="100"
        cy="72"
        rx="18"
        ry="26"
        className="fill-brand-lime"
        style={{ transformOrigin: "100px 72px" }}
        variants={leaf}
      />
    </motion.svg>
  );
}
