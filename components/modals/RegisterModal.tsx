"use client";

import { useEffect, useState } from "react";

export default function RegisterModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ team: "", name: "", email: "", track: "AI Agents" });
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { track?: string } | undefined;
      const t = detail?.track;
      setForm((f) => ({ ...f, track: t || f.track }));
      setDone(false);
      setErr("");
      setOpen(true);
    };
    window.addEventListener("baddiethon:register", handler);
    // also listen to any button with data-register
    const btns = document.querySelectorAll("[data-register]:not([data-from-modal])");
    btns.forEach((b) => {
      b.addEventListener("click", () => {
        setForm((f) => ({ ...f, track: "AI Agents" }));
        setDone(false);
        setErr("");
        setOpen(true);
      });
    });
    return () => {
      window.removeEventListener("baddiethon:register", handler);
    };
  }, []);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = form.email.trim();
    if (!form.team.trim() || !form.name.trim()) {
      setErr("Add your team name and your name to continue.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr("Enter a valid email address, like name@example.com.");
      return;
    }
    setErr("");
    setDone(true);
  };

  return (
    <div className="modal" id="regModal" onClick={(e) => { if ((e.target as HTMLElement).classList.contains('modal')) setOpen(false); }}>
      <div className="sheet" role="dialog" aria-modal="true" aria-labelledby="regTitle">
        <button className="x" type="button" data-close aria-label="Close" onClick={() => setOpen(false)}><svg className="ico-s" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
        <div className="eyebrow"><span>Registrations close Oct 30</span></div>
        <h2 id="regTitle">Register your team</h2>
        {!done ? (
          <form id="regForm" noValidate onSubmit={submit}>
            <div className="field"><label htmlFor="f-team">Team name</label><input id="f-team" name="team" type="text" autoComplete="organization" required value={form.team} onChange={(e) => setForm({ ...form, team: e.target.value })} /></div>
            <div className="field"><label htmlFor="f-name">Your name</label><input id="f-name" name="name" type="text" autoComplete="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div className="field"><label htmlFor="f-email">Email</label><input id="f-email" name="email" type="email" autoComplete="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div className="field"><label htmlFor="f-track">Track</label>
              <select id="f-track" name="track" value={form.track} onChange={(e) => setForm({ ...form, track: e.target.value })}><option>AI Agents</option><option>Consumer Apps</option><option>Web3 &amp; Crypto</option><option>Open Track</option></select></div>
            {err && <p id="regErr" style={{ color: 'var(--red)', fontSize: 13, marginTop: 12 }}>{err}</p>}
            <div className="actions"><button className="btn btn-lg" type="submit">Submit <svg className="ico-s" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></div>
          </form>
        ) : (
          <div id="regDone">
            <p id="regDoneText" style={{ marginTop: 6 }}>Thanks, {form.name.trim()}. This is a preview form, so nothing was sent yet. Registrations close Oct 30.</p>
            <div className="actions"><button className="btn" type="button" data-close onClick={() => setOpen(false)}>Back to the page</button></div>
          </div>
        )}
      </div>
    </div>
  );
}
