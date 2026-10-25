export default function SVGDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <filter id="rough" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency=".04" numOctaves="2" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" />
        </filter>
        <filter id="boil" x="-2%" y="-2%" width="104%" height="104%">
          <feTurbulence id="boilNoise" type="fractalNoise" baseFrequency=".021" numOctaves="2" seed="1" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="3.4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <symbol id="i-star" viewBox="0 0 100 100">
          <path d="M50 4C53 30 70 47 96 50C70 53 53 70 50 96C47 70 30 53 4 50C30 47 47 30 50 4Z" />
        </symbol>
        <symbol id="i-star5" viewBox="0 0 100 100">
          <path d="M50 8L61 38L94 38L68 57L78 90L50 70L22 90L32 57L6 38L39 38Z" />
        </symbol>
        <symbol id="i-robot" viewBox="0 0 100 100">
          <path d="M50 28V17" />
          <circle cx="50" cy="12" r="4.5" />
          <rect x="26" y="28" width="48" height="34" rx="9" />
          <rect x="18" y="39" width="8" height="14" rx="2" />
          <rect x="74" y="39" width="8" height="14" rx="2" />
          <circle cx="39" cy="43" r="5" fill="currentColor" />
          <circle cx="61" cy="43" r="5" fill="currentColor" />
          <path d="M38 54h24M42 54v4M50 54v4M58 54v4" />
          <path d="M36 62v6M64 62v6" />
          <path d="M22 96V80c0-8 8-12 15-12h26c7 0 15 4 15 12v16" />
          <path d="M50 72v10" />
        </symbol>
        <symbol id="i-phone" viewBox="0 0 100 100">
          <rect x="29" y="6" width="42" height="88" rx="9" />
          <rect x="34" y="15" width="32" height="68" rx="3" />
          <path d="M45 10.5h10" />
          <circle cx="50" cy="89" r="2.4" />
          <path d="M38 30l9 9 5 15 9 7M44 22l-6 18M52 26l8 6" />
        </symbol>
        <symbol id="i-coins" viewBox="0 0 100 100">
          <ellipse cx="40" cy="30" rx="27" ry="10" />
          <path d="M13 30v13c0 6 12 10 27 10s27-4 27-10V30" />
          <ellipse cx="40" cy="30" rx="17" ry="5.5" />
          <ellipse cx="62" cy="60" rx="27" ry="10" />
          <path d="M35 60v14c0 6 12 10 27 10s27-4 27-10V60" />
          <ellipse cx="62" cy="60" rx="17" ry="5.5" />
          <path d="M41 68v10M49 71v10M57 73v10M65 73v10M73 71v10M81 68v10" />
        </symbol>
        <symbol id="i-bulb" viewBox="0 0 100 100">
          <path d="M50 14c-14 0-25 10-25 24 0 9 5 14 9 19 3 3 4 6 4 10h24c0-4 1-7 4-10 4-5 9-10 9-19 0-14-11-24-25-24z" />
          <path d="M40 72h20M42 79h16M45 86h10" />
          <path d="M43 58l7-12 7 12M50 46v-8" />
          <path d="M10 22l7 5M90 22l-7 5M4 44h9M87 44h9M50 4V0" />
        </symbol>
        <symbol id="i-trophy" viewBox="0 0 100 100">
          <path d="M30 20h40v20c0 12-9 22-20 22S30 52 30 40z" />
          <path d="M30 26H17c0 12 6 20 15 22M70 26h13c0 12-6 20-15 22" />
          <path d="M50 62v14M40 76h20v12H40zM34 90h32" />
          <path d="M41 30c0 8 3 14 8 18" />
          <path d="M50 3v8M18 8l5 6M82 8l-5 6M6 30h8M86 30h8" />
        </symbol>
        <symbol id="i-gift" viewBox="0 0 100 100">
          <rect x="12" y="38" width="76" height="17" />
          <rect x="19" y="55" width="62" height="35" />
          <path d="M50 38v52" />
          <path d="M50 38C42 18 24 18 24 28s17 10 26 10c9 0 26 0 26-10S58 18 50 38z" />
        </symbol>
        <symbol id="i-mega" viewBox="0 0 100 100">
          <path d="M18 38h16l32-20v56L34 56H18z" />
          <path d="M66 18v56M30 56l5 24h10l-4-22" />
          <path d="M76 30l13-8M78 46h15M76 62l13 8" />
        </symbol>
        <symbol id="i-code" viewBox="0 0 100 100">
          <path d="M34 26L11 50l23 24M66 26l23 24-23 24M57 20L43 80" />
        </symbol>
        <symbol id="i-doc" viewBox="0 0 100 100">
          <path d="M18 8h42l14 14v70H18z" />
          <path d="M60 8v14h14" />
          <path d="M28 38h32M28 50h32M28 62h20" />
          <path d="M58 86l22-42 9 5-22 42-13 4z" />
        </symbol>
        <symbol id="i-globe" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" />
          <ellipse cx="50" cy="50" rx="17" ry="40" />
          <path d="M10 50h80M16 30h68M16 70h68" />
        </symbol>
        <symbol id="i-chat" viewBox="0 0 100 100">
          <path d="M12 18h76v52H50L28 88V70H12z" />
          <path d="M30 38h40M30 52h24" />
        </symbol>
        <symbol id="i-crown" viewBox="0 0 100 80">
          <path d="M10 64L4 14l26 24 20-32 20 32 26-24-6 50z" />
          <path d="M10 74h80" />
        </symbol>
      </defs>
    </svg>
  );
}
