"use client";

import { useEffect, useState } from "react";
import { STEPS } from "@/data/constants";

const YEAR = 2026;

function dayStart(d: Date) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
function daysUntil(m: number, d: number, nowMs: number) { const today = dayStart(new Date(nowMs)); return Math.round((new Date(YEAR, m, d).getTime() - today.getTime()) / 86400000); }

function status(s: { at: [number, number]; end?: [number, number] }, nowMs: number) {
  const n = daysUntil(s.at[0], s.at[1], nowMs);
  if (s.end) {
    const e = daysUntil(s.end[0], s.end[1], nowMs);
    if (n > 0) return { tag: "Starts in " + n + (n === 1 ? " day" : " days"), done: false };
    if (e >= 0) return { tag: e === 0 ? "Ends today" : "Ends in " + e + (e === 1 ? " day" : " days"), done: false, live: true };
    return { tag: "Done", done: true };
  }
  if (n > 0) return { tag: n + (n === 1 ? " day" : " days") + " to go", done: false };
  if (n === 0) return { tag: "Today", done: false, live: true };
  return { tag: "Done", done: true };
}

export default function Timeline() {
  // Start at 0 so the server and the hydration render match, then tick after mount.
  const [now, setNow] = useState(0);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 60_000);
    window.addEventListener("resize", tick);
    return () => {
      clearInterval(id);
      window.removeEventListener("resize", tick);
    };
  }, []);

  const steps = STEPS.map((s) => ({ ...s, _st: status(s, now) }));
  const nextIdx = (() => {
    let ni = -1;
    steps.forEach((s, i) => { if (ni < 0 && !s._st.done) ni = i; });
    if (ni < 0) ni = steps.length - 1;
    return ni;
  })();
  const [active, setActive] = useState(nextIdx);

  return (
    <section className="sec" id="timeline" aria-label="Timeline">
      <div className="grunge c-tl sm"></div><div className="grunge c-br sm"></div>
      <div className="scrap" style={{ left: 0, bottom: 12, width: 44, height: 90 }}></div>
      <svg className="scribbles" viewBox="0 0 120 60" aria-hidden="true"><path d="M8 20l20 8-14 4 22 8M70 12c14 4 24 10 40 6M40 48c20-6 44 0 70-10"/></svg>
      <div className="wrap">
        <div className="eyebrow"><span>Timeline / 2026</span></div>
        <div className="sec-head">
          <div>
            <div className="title-row">
              <h2 className="h-display">Timeline</h2>
              <button className="star-btn" type="button" data-wiggle aria-label="Sparkle"><svg className="star" viewBox="0 0 100 100"><use href="#i-star"/></svg></button>
            </div>
            <p className="sub">Key dates. Keep building.</p>
          </div>
          <div className="note head-note" data-wiggle tabIndex={0} role="button" aria-label="Note about the timeline" style={{ maxWidth: 250, transform: 'rotate(-6deg)' }}>Same chaos. Bigger ideas.<svg className="ico crown" viewBox="0 0 100 80" aria-hidden="true" style={{ strokeWidth: 3.5 }}><use href="#i-crown"/></svg></div>
        </div>

        <div className="tl" id="tl" role="group" aria-label="Key dates, select one for details">
          {steps.map((s, i) => (
            <button key={i} type="button" className="step" aria-pressed={i === active ? "true" : "false"} onClick={() => setActive(i)}>
              <span className="date">{s.date}</span>
              {i === nextIdx && !s._st.done && <span className="next-tag">{s._st.live ? "NOW" : "NEXT"}</span>}
              <h3>{s.title}</h3>
              <span className="ico-row">
                <svg className="ico" viewBox="0 0 100 100" aria-hidden="true"><use href={"#" + s.icon} /></svg>
              </span>
              <p>{s.text}</p>
            </button>
          ))}
        </div>
        <div className="tl-detail" id="tlDetail" aria-live="polite">
          {steps[active] && (
            <>
              <strong>{steps[active].date} · {steps[active].title}</strong>
              <span>{steps[active].text}</span>
              <span className={"pill" + ((steps[active]._st.live || (active === nextIdx && !steps[active]._st.done)) ? " red" : "")}>{steps[active]._st.tag}</span>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
