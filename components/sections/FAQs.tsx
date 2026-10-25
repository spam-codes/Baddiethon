"use client";

import { useEffect, useRef } from "react";
import { FAQ } from "@/data/constants";
import { DISCORD_URL } from "@/data/constants";

export default function FAQs() {
  const colsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const NS = "http://www.w3.org/2000/svg";
    if (!colsRef.current) return;
    const cols = colsRef.current.querySelectorAll(".faq-col");
    if (cols.length < 2) return;
    // Clear existing
    cols[0].innerHTML = "";
    cols[1].innerHTML = "";
    
    FAQ.forEach((qa, i) => {
      const wrap = document.createElement("div");
      wrap.className = "qa";
      const q = document.createElement("button");
      q.type = "button";
      q.className = "q";
      q.id = "q" + i;
      q.setAttribute("aria-expanded", "false");
      q.setAttribute("aria-controls", "a" + i);
      const span = document.createElement("span");
      span.textContent = qa[0];
      q.appendChild(span);
      const svg = document.createElementNS(NS, "svg");
      svg.setAttribute("class", "plus");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("aria-hidden", "true");
      const path = document.createElementNS(NS, "path");
      path.setAttribute("d", "M12 5v14M5 12h14");
      svg.appendChild(path);
      q.appendChild(svg);
      const a = document.createElement("div");
      a.className = "a";
      a.id = "a" + i;
      a.setAttribute("role", "region");
      a.setAttribute("aria-labelledby", "q" + i);
      a.hidden = true;
      a.textContent = qa[1];
      q.addEventListener("click", function () {
        const open = q.getAttribute("aria-expanded") === "true";
        q.setAttribute("aria-expanded", open ? "false" : "true");
        a.hidden = open;
      });
      wrap.appendChild(q);
      wrap.appendChild(a);
      if (i < 3) {
        cols[0].appendChild(wrap);
      } else {
        cols[1].appendChild(wrap);
      }
    });
  }, []);

  return (
    <section className="sec" id="faqs" aria-label="Frequently asked questions" style={{ borderBottom: 0 }}>
      <div className="grunge c-tl sm"></div><div className="grunge c-bl"></div><div className="grunge c-br"></div>
      <div className="wrap">
        <div className="eyebrow"><span>FAQs / 2026</span></div>
        <div className="faq-top">
          <div className="faq-title">
            <div className="title-row">
              <h2 className="h-display">FAQs</h2>
              <button className="star-btn" type="button" data-wiggle aria-label="Sparkle"><svg className="star" viewBox="0 0 100 100"><use href="#i-star"/></svg></button>
            </div>
            <p className="sub">Questions?<br />We got you.</p>
          </div>
          <div className="stack" aria-label="Build, experiment, ship, repeat">
            <button className="strip" type="button" data-wiggle>Build</button>
            <button className="strip" type="button" data-wiggle>Experiment</button>
            <button className="strip" type="button" data-wiggle>Ship</button>
            <button className="strip" type="button" data-wiggle>Repeat</button>
          </div>
          <div className="note disc" data-wiggle>Still have questions?<br />Join our <a href={DISCORD_URL} target="_blank" rel="noopener" data-discord>Discord</a>
            <svg className="chat" viewBox="0 0 100 100" aria-hidden="true"><use href="#i-chat"/></svg>
          </div>
        </div>

        <div className="faq-cols" id="faq" ref={colsRef}><div className="faq-col"></div><div className="faq-col"></div></div>
      </div>
    </section>
  );
}
