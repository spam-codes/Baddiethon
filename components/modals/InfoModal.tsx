"use client";

import { useEffect, useState } from "react";

type InfoData = { eyebrow: string; title: string; text: string; list: string[]; track: string | null };

export default function InfoModal() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<InfoData>({ eyebrow: "", title: "", text: "", list: [], track: null });

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as InfoData;
      setData(detail);
      setOpen(true);
    };
    window.addEventListener("baddiethon:info", handler);
    return () => window.removeEventListener("baddiethon:info", handler);
  }, []);

  if (!open) return null;

  return (
    <div className="modal" id="infoModal" onClick={(e) => { if ((e.target as HTMLElement).classList.contains('modal')) setOpen(false); }}>
      <div className="sheet" role="dialog" aria-modal="true" aria-labelledby="infoTitle">
        <button className="x" type="button" data-close aria-label="Close" onClick={() => setOpen(false)}><svg className="ico-s" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
        <div className="eyebrow" id="infoEyebrow">{data.eyebrow}</div>
        <h2 id="infoTitle">{data.title}</h2>
        <p id="infoText">{data.text}</p>
        <ul id="infoList">{(data.list || []).map((t: string, i: number) => <li key={i}>{t}</li>)}</ul>
        <div className="actions"><button className="btn" type="button" data-register data-from-modal onClick={() => { setOpen(false); window.dispatchEvent(new CustomEvent("baddiethon:register", { detail: { track: data.track } })); }}>Register Now <svg className="ico-s" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18L18 6M8 6h10v10"/></svg></button></div>
      </div>
    </div>
  );
}
