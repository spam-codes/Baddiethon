"use client";

import { PRIZES } from "@/data/constants";

export default function Prizes() {
  const openPrize = (idx: number) => {
    const p = PRIZES[idx];
    window.dispatchEvent(new CustomEvent("baddiethon:info", { detail: { eyebrow: "Prize", title: p.amt ? p.name + " " + p.amt : p.name, text: p.amt ? "What the team in this spot takes home." : "Extra awards on top of the podium.", list: p.list, track: null } }));
  };

  return (
    <section className="sec" id="prizes" aria-label="Prizes">
      <div className="grunge c-tl sm"></div><div className="grunge c-bl sm"></div><div className="grunge c-tr sm"></div>
      <div className="slab big-one" aria-hidden="true"></div>
      <button className="trophy-art" type="button" data-wiggle aria-label="Trophy sketch"><svg className="ico" viewBox="-10 -6 120 112" aria-hidden="true"><use href="#i-trophy"/></svg></button>
      <div className="wrap">
        <div className="eyebrow"><span>Prizes / 2026</span></div>
        <div className="prize-head">
          <div className="title-row">
            <h2 className="h-display">Prizes</h2>
            <button className="star-btn" type="button" data-wiggle aria-label="Sparkle"><svg className="star" viewBox="0 0 100 100"><use href="#i-star"/></svg></button>
          </div>
          <p className="sub">Nice rewards for even<br />nicer ideas.</p>
        </div>
        <div className="note prize-note" data-wiggle tabIndex={0} role="button" aria-label="Note about prizes">Build something people use, and get rewarded for it.</div>

        <div className="pz" id="prizeGrid">
          <button type="button" data-prize="0" aria-label="1st place, 1,00,000 rupees. Show details" onClick={() => openPrize(0)}>
            <h3>1st Place</h3><div className="amt">₹1,00,000</div>
            <ul><li>Trophy + Certificates</li><li>Goodies &amp; Swags</li><li>Showcase &amp; Community Spotlight</li></ul>
          </button>
          <button type="button" data-prize="1" aria-label="2nd place, 50,000 rupees. Show details" onClick={() => openPrize(1)}>
            <h3>2nd Place</h3><div className="amt">₹50,000</div>
            <ul><li>Trophy + Certificates</li><li>Goodies &amp; Swags</li><li>Showcase &amp; Community Spotlight</li></ul>
          </button>
          <button type="button" data-prize="2" aria-label="3rd place, 25,000 rupees. Show details" onClick={() => openPrize(2)}>
            <h3>3rd Place</h3><div className="amt">₹25,000</div>
            <ul><li>Trophy + Certificates</li><li>Goodies &amp; Swags</li><li>Showcase &amp; Community Spotlight</li></ul>
          </button>
          <button type="button" className="special" data-prize="3" aria-label="Special prizes. Show details" onClick={() => openPrize(3)}>
            <h3><svg className="ico" viewBox="0 0 100 100" aria-hidden="true"><use href="#i-gift"/></svg>Special Prizes</h3>
            <ul><li>Best AI Agent</li><li>Most Creative / Fun</li><li>Best Real User Adoption</li><li>More surprises...</li></ul>
          </button>
        </div>
      </div>
    </section>
  );
}
