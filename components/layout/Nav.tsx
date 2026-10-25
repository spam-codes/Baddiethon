"use client";

import { useEffect, useState } from "react";

export default function Nav() {
  const [current, setCurrent] = useState("about");

  useEffect(() => {
    const ids = ["about", "tracks", "timeline", "prizes", "faqs"];
    const spy = () => {
      let cur = ids[0];
      const y = 130;
      ids.forEach((id) => {
        const s = document.getElementById(id);
        if (s && s.getBoundingClientRect().top <= y) cur = id;
      });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) cur = "faqs";
      setCurrent(cur);
    };
    window.addEventListener("scroll", spy, { passive: true });
    window.addEventListener("resize", spy);
    spy();
    return () => {
      window.removeEventListener("scroll", spy);
      window.removeEventListener("resize", spy);
    };
  }, []);

  const goTo = (hash: string) => {
    const t = document.getElementById(hash.replace("#", ""));
    if (!t) return;
    t.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="nav">
      <div className="wrap">
        <a className="logo" href="#about" onClick={(e) => { e.preventDefault(); goTo("#about"); }} data-nav>
          Baddiethon
          <svg className="star" viewBox="0 0 100 100" aria-hidden="true">
            <use href="#i-star" />
          </svg>
        </a>
        <nav className="links" aria-label="Sections">
          <a href="#about" onClick={(e) => { e.preventDefault(); goTo("#about"); }} aria-current={current === "about" ? "true" : "false"}>About</a>
          <a href="#tracks" onClick={(e) => { e.preventDefault(); goTo("#tracks"); }} aria-current={current === "tracks" ? "true" : "false"}>Tracks</a>
          <a href="#timeline" onClick={(e) => { e.preventDefault(); goTo("#timeline"); }} aria-current={current === "timeline" ? "true" : "false"}>Timeline</a>
          <a href="#prizes" onClick={(e) => { e.preventDefault(); goTo("#prizes"); }} aria-current={current === "prizes" ? "true" : "false"}>Prizes</a>
          <a href="#faqs" onClick={(e) => { e.preventDefault(); goTo("#faqs"); }} aria-current={current === "faqs" ? "true" : "false"}>FAQs</a>
        </nav>
        <button className="btn" type="button" data-register>
          Register Now <svg className="ico-s" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18L18 6M8 6h10v10"/></svg>
        </button>
      </div>
    </header>
  );
}
