"use client";

import { TRACKS } from "@/data/constants";

export default function Tracks() {
  const openTrack = (idx: number) => {
    const t = TRACKS[idx];
    // trigger info modal via custom event
    window.dispatchEvent(new CustomEvent("baddiethon:info", { detail: { eyebrow: "Track", title: t.name, text: t.text, list: t.ideas, track: t.name } }));
  };

  return (
    <section className="sec" id="tracks" aria-label="Tracks">
      <div className="grunge c-tr sm"></div><div className="grunge c-bl sm"></div>
      <div className="scrap" style={{ left: 0, bottom: 30, width: 70, height: 96 }}></div>
      <div className="slab slab-sq" aria-hidden="true"></div>
      <svg className="scribble-sq" viewBox="0 0 120 100" aria-hidden="true"><path d="M10 80C30 20 50 90 60 30S90 80 108 24M14 60c30-34 56 24 90-30M20 90c26-20 50 8 84-14"/></svg>
      <div className="wrap">
        <div className="eyebrow"><span>Tracks / 2026</span></div>
        <div className="sec-head">
          <div>
            <div className="title-row">
              <h2 className="h-display">Tracks</h2>
              <button className="star-btn" type="button" data-wiggle aria-label="Sparkle"><svg className="star" viewBox="0 0 100 100"><use href="#i-star"/></svg></button>
            </div>
            <p className="sub font-medium">Build... anything.<br />Actually, ANYTHING.</p>
          </div>
          <div className="note head-note" data-wiggle tabIndex={0} role="button" aria-label="Note about tracks">silly? serious? niche? WE DON&apos;T CARE. if you could make people want to use it, it belongs here!!</div>
        </div>

        <div className="cards" id="trackCards">
          <article className="card">
            <div className="tile"><svg className="ico" viewBox="0 0 100 100" aria-hidden="true"><use href="#i-robot"/></svg><svg className="ico spark" viewBox="0 0 100 100" aria-hidden="true" style={{ strokeWidth: 5 }}><use href="#i-star"/></svg></div>
            <div className="body"><h3>AI Agents</h3><p>Autonomous agents, AI tools, creative use cases or just something weird.</p>
              <button className="go stretch" type="button" data-track="0" aria-label="More about the AI Agents track" onClick={() => openTrack(0)}><svg className="ico-s" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></div>
          </article>
          <article className="card">
            <div className="tile"><svg className="ico" viewBox="0 0 100 100" aria-hidden="true" style={{ width: '56%', height: 'auto' }}><use href="#i-phone"/></svg></div>
            <div className="body"><h3>Consumer Apps</h3><p>Build products people actually want to use. Fun, useful or both.</p>
              <button className="go stretch" type="button" data-track="1" aria-label="More about the Consumer Apps track" onClick={() => openTrack(1)}><svg className="ico-s" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></div>
          </article>
          <article className="card">
            <div className="tile"><svg className="ico" viewBox="0 0 100 100" aria-hidden="true"><use href="#i-coins"/></svg></div>
            <div className="body"><h3>Web3 &amp; Crypto</h3><p>DeFi, onchain apps, new primitives, or anything experimental.</p>
              <button className="go stretch" type="button" data-track="2" aria-label="More about the Web3 and Crypto track" onClick={() => openTrack(2)}><svg className="ico-s" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></div>
          </article>
          <article className="card">
            <div className="tile"><svg className="ico" viewBox="0 0 100 100" aria-hidden="true" style={{ width: '56%' }}><use href="#i-bulb"/></svg></div>
            <div className="body"><h3>Open Track</h3><p>Literally anything. If it&apos;s a product and people can use it, you&apos;re good.</p>
              <button className="go stretch" type="button" data-track="3" aria-label="More about the Open Track" onClick={() => openTrack(3)}><svg className="ico-s" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></div>
          </article>
        </div>
      </div>
    </section>
  );
}
