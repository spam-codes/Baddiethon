"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Reveal({ children, from = "left", delay = 0 }: { children: React.ReactNode; from?: "left" | "right" | "up" | "down"; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const x = from === "left" ? -120 : from === "right" ? 120 : 0;
    const y = from === "up" ? 80 : from === "down" ? -80 : 0;
    
    gsap.set(el, { x, y, opacity: 0, willChange: "transform, opacity" });
    gsap.to(el, {
      x: 0,
      y: 0,
      opacity: 1,
      duration: 1.0,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });
  }, [from, delay]);

  return <div ref={ref}>{children}</div>;
}
