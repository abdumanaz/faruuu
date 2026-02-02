const CONFIG = {
  name: "Faruuuuu",
  footer: "Made with ❤️ (and mild stubbornness)",
};

const STEPS = [
  {
    title: (n) => `Dear ${n}, will you be my valentine?`,
    caption: `Since you take 2-3 business days to respond 😌`,
    noLevel: 0,
    yesPulse: true,
  },
  {
    comment: `Dhushttaa!!! Let’s do this one more time!!!`,
    caption: `I think you misclicked 😏`,
    noLevel: 1,
    yesPulse: false,
  },
  {
    title: () => `Eee pennine konda!!!!`,
    caption: `Still saying no? Bold move 🙃`,
    noLevel: 2,
    yesPulse: false,
  },
  {
    title: () => `Heheheeee!!! Kali ennod venda 😌`,
    caption: `Okay, okay… enough games 😇`,
    noLevel: 3,
    yesPulse: false,
    finalYes: true,
  },
];

let step = 0;

const titleEl = document.getElementById("title");
const captionEl = document.getElementById("caption");
const footerEl = document.getElementById("footer");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const iconWrap = document.getElementById("iconWrap");
const commentEl = document.getElementById("comment");

footerEl.textContent = CONFIG.footer;

function render() {
  const s = STEPS[step];

  commentEl.textContent = s.comment || "";
  titleEl.textContent = `Dear ${CONFIG.name}, will you be my valentine?`;
  captionEl.textContent = s.caption ?? captionEl.textContent;

  yesBtn.classList.toggle("pulse", !!s.yesPulse);

  noBtn.classList.remove("level-0", "level-1", "level-2", "level-3");
  noBtn.classList.add(`level-${s.noLevel}`);

  noBtn.textContent = s.finalYes ? "Yes" : "No";
  iconWrap.innerHTML = `
  <img
    src="cat.png"
    alt="Smiling cat"
    class="cat-img"
  />
`;
}

function nextStep() {
  if (step < STEPS.length - 1) step++;
  render();
}

function showYay() {
  document.querySelector(".card").innerHTML = `
    <div style="text-align:center">
      <div style="font-size:54px">💖</div>
      <h2 style="margin:10px 0;font-size:44px">Yayyyy!</h2>
      <p style="font-weight:700">See you on Valentine’s ✨</p>
    </div>
  `;
}

yesBtn.addEventListener("click", showYay);

noBtn.addEventListener("click", () => {
  if (STEPS[step].finalYes) {
    showYay();
    return;
  }
  noBtn.classList.remove("wiggle");
  void noBtn.offsetWidth;
  noBtn.classList.add("wiggle");
  nextStep();
});

// Initial render
render();

function catHeartSvg() {
  return `
  <svg viewBox="0 0 120 120" width="84" height="84">
    <defs>
      <radialGradient id="g2" cx="50%" cy="55%" r="60%">
        <stop offset="0%" stop-color="#F8C9A0"/>
        <stop offset="100%" stop-color="#EFB07D"/>
      </radialGradient>
    </defs>
    <circle cx="60" cy="66" r="38" fill="url(#g2)"/>
    <path d="M35 44 L48 26 L52 50 Z" fill="#EFB07D"/>
    <path d="M85 44 L72 26 L68 50 Z" fill="#EFB07D"/>
    <circle cx="48" cy="67" r="5" fill="#1f2937"/>
    <circle cx="72" cy="67" r="5" fill="#1f2937"/>
    <path d="M60 72 L55 79 L65 79 Z" fill="#F472B6"/>
    <path d="M94 34
             C94 27, 86 26, 84 32
             C82 26, 74 27, 74 34
             C74 44, 84 50, 84 50
             C84 50, 94 44, 94 34Z"
          fill="#EF3A7A"/>
  </svg>`;
}

/**
 * Tiny confetti (no libraries)
 */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let pieces = [];
let raf;

function resize() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener("resize", resize);
resize();

function popConfetti() {
  cancelAnimationFrame(raf);
  pieces = Array.from({ length: 170 }, () => ({
    x: Math.random() * innerWidth,
    y: -20 - Math.random() * innerHeight * 0.25,
    w: 6 + Math.random() * 6,
    h: 3 + Math.random() * 5,
    vx: -2 + Math.random() * 4,
    vy: 2 + Math.random() * 5,
    r: Math.random() * Math.PI,
    vr: -0.18 + Math.random() * 0.36,
    a: 1,
  }));
  tick();
  setTimeout(() => {
    pieces = [];
  }, 3800);
}

function tick() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (const p of pieces) {
    p.x += p.vx;
    p.y += p.vy;
    p.r += p.vr;
    p.vy += 0.03;
    p.a -= 0.0022;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.r);
    ctx.globalAlpha = Math.max(0, p.a);

    const hue = (p.x + p.y) % 360;
    ctx.fillStyle = `hsl(${hue} 85% 60%)`;
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);

    ctx.restore();
  }

  if (pieces.length) raf = requestAnimationFrame(tick);
}
