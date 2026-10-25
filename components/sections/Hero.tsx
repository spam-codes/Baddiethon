"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { DISCORD_URL } from "@/data/constants";

export default function Hero() {
  const boxRef = useRef<HTMLDivElement>(null);
  const cvRef = useRef<HTMLCanvasElement>(null);
  const lampRef = useRef<HTMLButtonElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const lampOnRef = useRef(true);

  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const box = boxRef.current, cv = cvRef.current, noise = document.getElementById("boilNoise") as SVGFEComponentTransferElement | null, lamp = lampRef.current, art = artRef.current;
    if (!box || !cv || reduce) return;
    const canvasEl = cv;
    const ctx = canvasEl.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;
    const DW = 982, DH = 702;
    let W = 0, H = 0, s = 1;
    let running = false, onScreen = true, raf = 0, last = 0, seed = 1, boil = 0, lampOn = true;
    
    function size() {
      const w = canvasEl.parentElement?.offsetWidth || DW;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = Math.round(w * dpr);
      H = Math.round(w * DH / DW * dpr);
      canvasEl.width = W;
      canvasEl.height = H;
      s = W / DW;
    }
    
    function rng(seedVal: number) {
      return function () {
        let sd = seedVal |= 0;
        sd = (sd + 0x6D2B79F5) | 0;
        let t = Math.imul(sd ^ (sd >>> 15), 1 | sd);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }
    
    const R = rng(42);
    const dust: { x: number; y: number; vx: number; vy: number; r: number; a: number; light: boolean; ph: number }[] = [];
    for (let i = 0; i < 44; i++) dust.push({ x: R() * DW, y: R() * DH, vx: (R() - .5) * 5, vy: -(3 + R() * 7), r: .7 + R() * 1.6, a: .25 + R() * .35, light: R() > .55, ph: R() * 6.28 });
    const birds = [{ y: 392, x: 120, v: -26, sz: 9, ph: 0 }, { y: 424, x: 380, v: -19, sz: 7, ph: 2 }, { y: 374, x: 560, v: -33, sz: 11, ph: 4 }];
    const beacons: [number, number, number][] = [[418, 364, 0], [652, 382, 1.7], [704, 362, 3.1], [596, 408, 4.4]];
    const steam: { x: number; y: number; n: number }[] = [{ x: 252, y: 517, n: 3 }, { x: 930, y: 575, n: 3 }];
    const strands: [number, number, number][] = [[805, 398, -1.9], [818, 393, -1.55], [830, 397, -1.25], [795, 404, -2.2], [838, 404, -1.0], [812, 390, -1.7]];
    const mist: { y: number; sp: number; ox: number; k: number }[] = [{ y: 392, sp: 9, ox: 0, k: 1 }, { y: 430, sp: 14, ox: 300, k: 1.2 }, { y: 470, sp: 6, ox: 620, k: .9 }, { y: 405, sp: 11, ox: 900, k: 1.1 }];
    
    function clipWindow2() {
      ctx.beginPath(); ctx.moveTo(335, 355); ctx.lineTo(430, 352); ctx.lineTo(850, 292); ctx.lineTo(858, 295); ctx.lineTo(858, 510); ctx.lineTo(335, 510); ctx.closePath(); ctx.clip();
    }
    
    function frame(now: number) {
      const t = now / 1000, dt = Math.min(.05, (now - last) / 1000 || .016); last = now;
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, W, H); ctx.setTransform(s, 0, 0, s, 0, 0);
      ctx.save(); clipWindow2();
      mist.forEach((m) => {
        const x = ((t * m.sp + m.ox) % (DW + 500)) - 250;
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 200);
        g.addColorStop(0, "rgba(240,226,202,.42)"); g.addColorStop(1, "rgba(240,226,202,0)");
        ctx.save(); ctx.translate(x, m.y); ctx.scale(m.k, .16 * m.k); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, 200, 0, 6.283); ctx.fill(); ctx.restore();
      });
      ctx.strokeStyle = "#14110e"; ctx.lineWidth = 1.5; ctx.lineCap = "round";
      birds.forEach((b) => {
        const x = (((b.x + b.v * t) % 700) + 700) % 700 + 220, y = b.y + Math.sin(t * .7 + b.ph) * 6, f = Math.sin(t * 10 + b.ph), dy = -f * b.sz * .6;
        ctx.beginPath(); ctx.moveTo(x - b.sz, y + dy); ctx.quadraticCurveTo(x - b.sz * .5, y - b.sz * .35, x, y); ctx.quadraticCurveTo(x + b.sz * .5, y - b.sz * .35, x + b.sz, y + dy); ctx.stroke();
      });
      beacons.forEach((b) => {
        let k = Math.max(0, Math.sin(t * 2.4 + b[2])); k = k * k * k; const a = .15 + .85 * k;
        const g = ctx.createRadialGradient(b[0], b[1], 0, b[0], b[1], 10); g.addColorStop(0, "rgba(214,60,44," + (a * .6).toFixed(3) + ")"); g.addColorStop(1, "rgba(214,60,44,0)");
        ctx.fillStyle = g; ctx.fillRect(b[0] - 10, b[1] - 10, 20, 20);
        ctx.fillStyle = "rgba(214,60,44," + (.45 + .55 * a).toFixed(3) + ")"; ctx.beginPath(); ctx.arc(b[0], b[1], 2, 0, 6.283); ctx.fill();
      });
      ctx.restore();
      ctx.save(); ctx.beginPath(); ctx.rect(295, 482, 120, 70); ctx.clip();
      const sy = 482 + ((t * 26) % 110) - 24;
      const g2 = ctx.createLinearGradient(0, sy, 0, sy + 24);
      g2.addColorStop(0, "rgba(255,248,230,0)"); g2.addColorStop(.5, "rgba(255,248,230,.5)"); g2.addColorStop(1, "rgba(255,248,230,0)");
      ctx.fillStyle = g2; ctx.fillRect(295, sy, 120, 24);
      if (Math.floor(t * 2) % 2 === 0) { ctx.fillStyle = "rgba(20,17,14,.8)"; ctx.fillRect(352, 541, 5, 8); }
      ctx.restore();
      ctx.lineWidth = 1.3; ctx.lineJoin = "round";
      steam.forEach((src, si: number) => {
        for (let k = 0; k < src.n; k++) {
          const u = (t * .3 + k / src.n + si * .17) % 1, a = Math.sin(Math.PI * u) * .5;
          if (a < .02) continue;
          ctx.strokeStyle = "rgba(20,17,14," + a.toFixed(3) + ")"; ctx.beginPath();
          const by = src.y - u * 58, bx = src.x + (k - 1) * 5; ctx.moveTo(bx + Math.sin(t * 1.7 + k) * 2, by);
          for (let j = 1; j <= 5; j++) ctx.lineTo(bx + Math.sin(t * 1.9 + j * .8 + k * 2) * (1.5 + j * 1.1) + u * 6, by - j * 6);
          ctx.stroke();
        }
      });
      ctx.strokeStyle = "#14110e"; ctx.lineWidth = 1.3;
      strands.forEach((h, n: number) => {
        const len = 26 + (n % 3) * 8, ang = h[2] + Math.sin(t * 1.4 + n) * .12, ex = h[0] + Math.cos(ang) * len, ey = h[1] + Math.sin(ang) * len;
        ctx.beginPath(); ctx.moveTo(h[0], h[1]); ctx.quadraticCurveTo((h[0] + ex) / 2 + Math.sin(t * 2.1 + n * 1.3) * 5, (h[1] + ey) / 2, ex, ey); ctx.stroke();
      });
      if (lampOn) {
        const fl = .3 + .05 * Math.sin(t * 3.1) + .03 * Math.sin(t * 11.7);
        const lg = ctx.createRadialGradient(938, 470, 0, 938, 470, 95);
        lg.addColorStop(0, "rgba(255,205,120," + fl.toFixed(3) + ")"); lg.addColorStop(1, "rgba(255,205,120,0)");
        ctx.fillStyle = lg; ctx.fillRect(838, 370, 144, 200);
      }
      dust.forEach((d) => {
        d.x += d.vx * dt; d.y += d.vy * dt;
        if (d.y < -4) { d.y = DH + 4; d.x = R() * DW; }
        if (d.x < -4) d.x = DW + 4;
        if (d.x > DW + 4) d.x = -4;
        const tw = .6 + .4 * Math.sin(t * 2 + d.ph);
        ctx.fillStyle = d.light ? "rgba(245,235,215," + (d.a * tw).toFixed(3) + ")" : "rgba(20,17,14," + (d.a * tw * .8).toFixed(3) + ")";
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, 6.283); ctx.fill();
      });
      if (t % 5.3 < .09) { const sx = 120 + (Math.floor(t / 5.3) * 197) % 760; ctx.strokeStyle = "rgba(20,17,14,.22)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx + 2, DH); ctx.stroke(); }
    }
    
    function loop(now: number) {
      if (!running) return;
      frame(now);
      if (now - boil > 125) { boil = now; seed = (seed % 9) + 1; if (noise) noise.setAttribute("seed", seed.toString()); }
      raf = requestAnimationFrame(loop);
    }
    
    function sync() {
      const want = onScreen && !document.hidden;
      if (want && !running) { running = true; last = performance.now(); raf = requestAnimationFrame(loop); }
      else if (!want && running) { running = false; cancelAnimationFrame(raf); }
    }
    
    size();
    window.addEventListener("resize", size);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver((e) => { onScreen = e[0].isIntersecting; sync(); }).observe(box);
    }
    document.addEventListener("visibilitychange", sync);
    sync();
    
    if (art) {
      art.addEventListener("pointermove", (e: PointerEvent) => {
        const r = art.getBoundingClientRect();
        box.style.setProperty("--px", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
        box.style.setProperty("--py", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
      });
      art.addEventListener("pointerleave", () => {
        box.style.setProperty("--px", "0");
        box.style.setProperty("--py", "0");
      });
    }
    
    if (lamp) {
      lamp.addEventListener("click", () => {
        lampOn = !lampOn;
        lampOnRef.current = lampOn;
        box.classList.toggle("dim", !lampOn);
        lamp.setAttribute("aria-pressed", lampOn ? "true" : "false");
        lamp.setAttribute("aria-label", lampOn ? "Turn the desk lamp glow off" : "Turn the desk lamp glow on");
        const t = document.getElementById("toast");
        if (t) { t.textContent = lampOn ? "Lamp on." : "Lamp off. Late-night build mode."; t.hidden = false; setTimeout(() => { t.hidden = true; }, 2600); }
      });
    }
    
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  const goTo = (hash: string) => {
    const t = document.getElementById(hash.replace("#", ""));
    if (!t) return;
    t.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="sec hero" id="about" aria-label="About Baddiethon">
      <div className="grunge c-tl"></div><div className="grunge c-bl sm"></div>
      <div className="scrap" style={{ left: 0, bottom: 80, width: 46, height: 60 }}></div>
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow hero-eyebrow"><span>V0 / 2026</span><i></i><span>Online Hackathon</span></div>
            <div className="title-wrap">
              <button className="star-btn hero-star" type="button" data-wiggle aria-label="Sparkle"><svg className="star" viewBox="0 0 100 100"><use href="#i-star5"/></svg></button>
              <h1 className="h-display hero-title">Baddiethon</h1>
              <svg className="oval" viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden="true"><ellipse cx="100" cy="50" rx="98" ry="46" pathLength="1" transform="rotate(-3 100 50)"/><ellipse cx="102" cy="51" rx="96" ry="43" pathLength="1" transform="rotate(2 100 50)"/></svg>
            </div>
            <p className="tag">Bored of traditional hackathons?<br />We got you bro!</p>
            <p className="lede">Ideas are everywhere. Build something people actually use.</p>
            <div className="cta-row">
              <button className="btn btn-lg" type="button" data-register>Register Now <svg className="ico-s" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18L18 6M8 6h10v10"/></svg></button>
              <button className="btn btn-lg" type="button" ><a target="_blank" href={DISCORD_URL}>Join Discord</a> <svg className="ico-s" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18L18 6M8 6h10v10"/></svg></button>
              <svg className="arrow-doodle" viewBox="0 0 74 34" aria-hidden="true"><path d="M3 22C18 8 40 6 66 20M56 12l11 9-14 5"/></svg>
            </div>
          </div>

          <div className="hero-art" id="heroArt" ref={artRef}>
            <div className="live" id="live" ref={boxRef}>
              <div className="plate">
                <Image id="liveImg" src="/hero-art.webp" width={982} height={702} alt="Ink sketch of a builder slouched in a chair at a laptop, a city skyline in the window and a note that reads: In 2026, building is only the first step btw. Xavier." priority />
                <canvas id="fx" aria-hidden="true" ref={cvRef}></canvas>
                <button className="lamp-hit" id="lamp" type="button" aria-pressed="true" aria-label="Turn the desk lamp glow off" ref={lampRef}></button>
              </div>
            </div>
          </div>
        </div>                                                  

        <div className="steps">
          <button className="st" type="button" data-go="#tracks" onClick={() => goTo("#tracks")}><span className="num">01</span><span className="lbl">Come up with an Idea</span></button>
          <svg className="sep" viewBox="0 0 38 22" aria-hidden="true"><path d="M2 18C10 6 22 4 34 10M27 4l8 6-9 5"/></svg>
          <button className="st" type="button" data-go="#timeline" onClick={() => goTo("#timeline")}><span className="num">02</span><span className="lbl">Build it</span></button>
          <svg className="sep" viewBox="0 0 38 22" aria-hidden="true"><path d="M2 18C10 6 22 4 34 10M27 4l8 6-9 5"/></svg>
          <button className="st" type="button" data-go="#faqs" onClick={() => goTo("#faqs")}><span className="num">03</span><span className="lbl">Bring real users</span></button>
          <svg className="sep" viewBox="0 0 38 22" aria-hidden="true"><path d="M2 18C10 6 22 4 34 10M27 4l8 6-9 5"/></svg>
          <button className="st" type="button" data-go="#prizes" onClick={() => goTo("#prizes")}><span className="num">04</span><span className="lbl">7 crore</span></button>
          <button className="globe-btn" type="button" id="globe" aria-label="Where is Baddiethon held?" style={{ justifySelf: 'end' }}><svg className="ico" viewBox="0 0 100 100" style={{ width: 'clamp(46px,4.6vw,64px)', height: 'clamp(46px,4.6vw,64px)', strokeWidth: 3 }}><use href="#i-globe"/></svg></button>
          <p className="tagline">Same people.<br />Bigger ideas.</p>
        </div>
      </div>
    </section>
  );
}
