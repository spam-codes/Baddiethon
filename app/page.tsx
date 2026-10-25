"use client";

import { useEffect } from "react";
import SVGDefs from "@/components/shared/SVGDefs";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Tracks from "@/components/sections/Tracks";
import Timeline from "@/components/sections/Timeline";
import Prizes from "@/components/sections/Prizes";
import FAQs from "@/components/sections/FAQs";
import InfoModal from "@/components/modals/InfoModal";
import RegisterModal from "@/components/modals/RegisterModal";
import Toast from "@/components/shared/Toast";

export default function Home() {
  useEffect(() => {
    // Wire up global event handlers similar to original
    const DISCORD_URL = "https://discord.com";
    const $$ = (s: string, r: Document | HTMLElement = document) => Array.prototype.slice.call((r as Document).querySelectorAll(s));
    const $ = (s: string, r: Document | HTMLElement = document) => (r as Document).querySelector(s);

    $$("[data-wiggle]").forEach((n: HTMLElement) => {
      const go = () => {
        if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        n.classList.remove("wiggle");
        void n.offsetWidth;
        n.classList.add("wiggle");
      };
      n.addEventListener("click", go);
      n.addEventListener("keydown", (e: KeyboardEvent) => {
        if ((e.key === "Enter" || e.key === " ") && n.getAttribute("role") === "button") {
          e.preventDefault();
          go();
        }
      });
    });

    const globe = $("#globe");
    if (globe) globe.addEventListener("click", () => {
      const t = $("#toast") as HTMLElement | null;
      if (t) { t.textContent = "Baddiethon is online. Build from anywhere."; t.hidden = false; setTimeout(() => { t.hidden = true; }, 2600); }
    });

    $$("[data-discord]").forEach((a: HTMLAnchorElement) => { a.href = DISCORD_URL; });

    $$("[data-go]").forEach((b: HTMLElement) => {
      b.addEventListener("click", () => {
        const hash = b.getAttribute("data-go");
        if (hash) {
          const t = document.getElementById(hash.replace("#", ""));
          if (t) t.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }, []);

  return (
    <>
      <SVGDefs />
      <Nav />
      <main>
        <Hero />
        <Tracks />
        <Timeline />
        <Prizes />
        <FAQs />
      </main>
      <Footer />
      <InfoModal />
      <RegisterModal />
      <Toast />
    </>
  );
}
