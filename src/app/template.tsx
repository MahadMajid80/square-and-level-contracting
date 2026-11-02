"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, type ReactNode } from "react";

// False for the server render and the first client render, so the initial HTML is never hidden
// (good for LCP, SEO and no-JS visitors). Route changes after that get the transition.
let hasNavigated = false;

/** Route-enter transition: an ink wipe that clears upward and a short fade-up of the page. */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const animate = hasNavigated && !reduce;

  useEffect(() => {
    hasNavigated = true;
  }, []);

  if (!animate) return <>{children}</>;

  return (
    <>
      <motion.div
        aria-hidden
        className="bg-ink pointer-events-none fixed inset-0 z-[90]"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformOrigin: "top" }}
      >
        <span className="bg-level absolute inset-x-0 bottom-0 h-[3px]" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      >
        {children}
      </motion.div>
    </>
  );
}
