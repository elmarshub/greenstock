"use client";

import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

const leaves = [
  { top: "10%", left: "15%", size: 28, duration: 6, delay: 0 },
  { top: "22%", left: "72%", size: 20, duration: 7, delay: 0.5 },
  { top: "52%", left: "20%", size: 24, duration: 8, delay: 1 },
  { top: "68%", left: "62%", size: 32, duration: 5.5, delay: 0.3 },
  { top: "40%", left: "45%", size: 18, duration: 6.5, delay: 1.2 },
  { top: "82%", left: "32%", size: 22, duration: 7.5, delay: 0.8 },
];

interface AnimatedLeavesProps {
  className?: string;
}

export function AnimatedLeaves({ className }: AnimatedLeavesProps) {
  return (
    <div className={className} aria-hidden>
      {leaves.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-white/25"
          style={{ top: item.top, left: item.left }}
          animate={{ y: [0, -14, 0], rotate: [0, 10, -6, 0] }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay,
          }}
        >
          <Leaf style={{ width: item.size, height: item.size }} />
        </motion.div>
      ))}
    </div>
  );
}
