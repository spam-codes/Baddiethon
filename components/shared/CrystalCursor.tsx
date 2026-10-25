"use client";

import { useEffect, useRef } from "react";

const TIP_X = 17;
const TIP_Y = 1.5;

export default function CrystalCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = cursorRef.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ease = reduce ? 1 : 0.18;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let raf = 0;
    let shown = false;

    const render = () => {
      // Slow, eased follow so the crystal drifts behind the pointer.
      x += (targetX - x) * ease;
      y += (targetY - y) * ease;
      el.style.transform = `translate3d(${x - TIP_X}px, ${y - TIP_Y}px, 0)`;
      raf = requestAnimationFrame(render);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      targetX = e.clientX;
      targetY = e.clientY;
      if (!shown) {
        shown = true;
        el.classList.add("on");
      }
    };

    const onLeave = () => {
      shown = false;
      el.classList.remove("on");
      el.classList.remove("press");
    };

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      el.classList.add("press");
    };

    const onUp = () => el.classList.remove("press");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  return (
    <div className="crystal-cursor" ref={cursorRef} aria-hidden="true">
      <svg viewBox="0 0 34 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cc-main" x1="8" y1="4" x2="27" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#f0f9ff" />
            <stop offset=".28" stopColor="#bae6fd" />
            <stop offset=".58" stopColor="#60a5fa" />
            <stop offset=".82" stopColor="#3b82f6" />
            <stop offset="1" stopColor="#1e40af" />
          </linearGradient>
          <linearGradient id="cc-left" x1="4" y1="8" x2="17" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffffff" stopOpacity=".95" />
            <stop offset=".45" stopColor="#dbeafe" stopOpacity=".7" />
            <stop offset="1" stopColor="#93c5fd" stopOpacity=".18" />
          </linearGradient>
          <linearGradient id="cc-right" x1="30" y1="10" x2="18" y2="42" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#7dd3fc" stopOpacity=".55" />
            <stop offset=".55" stopColor="#2563eb" stopOpacity=".22" />
            <stop offset="1" stopColor="#1e3a8a" stopOpacity=".5" />
          </linearGradient>
          <linearGradient id="cc-shine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset=".5" stopColor="#ffffff" stopOpacity=".95" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="cc-aura" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(17 24) rotate(90) scale(17 13)">
            <stop stopColor="#93c5fd" stopOpacity=".55" />
            <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
          <clipPath id="cc-clip">
            <path d="M17 1.5 31 19 17 46.5 3 19Z" />
          </clipPath>
        </defs>

        <ellipse className="aura" cx="17" cy="24" rx="13" ry="17" fill="url(#cc-aura)" />

        <path d="M17 1.5 31 19 17 46.5 3 19Z" fill="url(#cc-main)" />
        <path d="M17 1.5 17 27 3 19Z" fill="url(#cc-left)" />
        <path d="M17 1.5 31 19 17 27Z" fill="url(#cc-right)" />
        <path d="M3 19 17 27 17 46.5Z" fill="#1e40af" fillOpacity=".26" />
        <path d="M31 19 17 27 17 46.5Z" fill="#1e3a8a" fillOpacity=".38" />

        <g clipPath="url(#cc-clip)">
          <g transform="rotate(22 17 24)">
            <rect className="shine" x="-26" y="-20" width="9" height="90" fill="url(#cc-shine)" />
          </g>
        </g>

        <path d="M17 1.5 17 46.5M3 19 17 27 31 19" stroke="#1e3a8a" strokeWidth="1.1" strokeLinejoin="round" strokeOpacity=".55" />
        <path d="M17 1.5 31 19 17 46.5 3 19Z" stroke="#172554" strokeWidth="1.6" strokeLinejoin="round" />

        <circle className="spark" cx="10" cy="28" r="1.1" fill="#f0f9ff" />
        <circle className="spark s2" cx="25" cy="34" r=".9" fill="#dbeafe" />
      </svg>
    </div>
  );
}
