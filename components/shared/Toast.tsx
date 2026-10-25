"use client";

import { useEffect, useState } from "react";

export default function Toast() {
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { msg?: string } | undefined;
      setMsg(detail?.msg || "");
      setShow(true);
      setTimeout(() => setShow(false), 2600);
    };
    window.addEventListener("baddiethon:toast", handler);
    // also listen to existing toast id for backward compatibility
    const obs = new MutationObserver(() => {
      const t = document.getElementById("toast");
      if (t && !t.hidden && t.textContent) {
        setMsg(t.textContent);
        setShow(true);
        setTimeout(() => setShow(false), 2600);
        t.hidden = true;
      }
    });
    const t = document.getElementById("toast");
    if (t) obs.observe(t, { attributes: true, childList: true, characterData: true });
    return () => {
      window.removeEventListener("baddiethon:toast", handler);
      obs.disconnect();
    };
  }, []);

  if (!show && !msg) return null;
  return <div className="toast" id="toast" role="status" hidden={!show}>{msg}</div>;
}
