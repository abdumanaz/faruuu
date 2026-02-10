const CONFIG = {
  name: "Faruuu",
  footer: "Made with ❤️ (and mild stubbornness)",
};

const STEPS = [
  {
    comment: "",
    caption: "Since you take 2-3 business days to respond 😌",
    noLevel: 0,
    yesBounce: true, // 👈 ADD THIS
    yesScaleLevel: 0,
    image: "cat-1.png",
  },

  {
    comment: "Dhushttaa!!! Let’s do this one more time!!!",
    caption: "I think you misclicked 😏",
    noLevel: 2,
    yesPulse: false,
    yesScaleLevel: 2,
    image: "cat-2.png",
    imageAlt: "Slightly annoyed cat",
    shakeNo: true,
    imgScale: 1.4,
  },
  {
    comment: `Eee <s>pennine</s> saadhanathine kond!!!`,
    caption: "Still saying no? 🙃 Vidilla njan 😂",
    noLevel: 3,
    yesPulse: false,
    yesScaleLevel: 2,
    image: "cat-3.png",
    imageAlt: "Exhale / exhausted cat",
    imgScale: 1.4,
  },
  {
    comment: "Heheheeee!!! Kali ennod venda 😌",
    caption: "Take your time… I'm right here 🤍",
    noLevel: 1,
    yesPulse: false,
    yesScaleLevel: 3,
    finalYes: true,
    image: "cat-4.png",
    imageAlt: "Happy relieved cat",
    finalYes: true,
    imgScale: 1.4,
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

// Preload images to avoid flicker
(function preloadImages() {
  for (const s of STEPS) {
    if (!s.image) continue;
    const img = new Image();
    img.src = s.image;
  }
})();

function setYesScale(level) {
  yesBtn.classList.remove("yes-0", "yes-1", "yes-2", "yes-3");
  yesBtn.classList.add(`yes-${Math.min(Math.max(level, 0), 3)}`);
}

function render() {
  const s = STEPS[step];

  commentEl.innerHTML = s.comment || "&nbsp;";
  if (step === 2) {
    titleEl.textContent = `${CONFIG.name} !!!!! Be my valentine !!!!`;
  } else if (step == 3) {
    titleEl.textContent = `Dear ${CONFIG.name},You've won a special prize !!!! Click Yes to claim it !!!!`;
  } else {
    titleEl.textContent = `Dear ${CONFIG.name}, will you be my valentine?`;
  }

  captionEl.textContent = s.caption || "";

  // Yes emphasis
  yesBtn.classList.toggle("pulse", !!s.yesPulse);
  setYesScale(s.yesScaleLevel ?? 0);

  // No shrink/fade
  noBtn.classList.remove("level-0", "level-1", "level-2", "level-3");
  noBtn.classList.add(`level-${Math.min(Math.max(s.noLevel ?? 0, 0), 3)}`);

  // Final step: Yes / Yes
  noBtn.textContent = s.finalYes ? "Yes" : "No";

  if (s.finalYes) {
    // Make both buttons look the same
    yesBtn.classList.remove("pulse", "glow", "pulseglow");
    setYesScale(0);

    noBtn.classList.remove("no", "level-0", "level-1", "level-2", "level-3");
    noBtn.classList.add("yes");
  } else {
    // Normal state
    noBtn.classList.remove("yes");
    noBtn.classList.add("no");
  }

  const imgScale = s.imgScale ?? 1;

  iconWrap.innerHTML = `
  <img
    src="${s.image}"
    alt="${s.imageAlt || "Cat"}"
    class="cat-img"
    style="transform: scale(${imgScale});"
    loading="eager"
    decoding="async"
  />
`;
  // only step 0
  yesBtn.classList.add("pulseglow");

  // YES emphasis
  if (s.finalYes) {
    // Reset all special styling when it's Yes / Yes
    yesBtn.classList.remove(
      "pulse",
      "pulseglow",
      "glow",
      "bounce",
      "yes-0",
      "yes-1",
      "yes-2",
      "yes-3",
    );
  } else {
    // Normal behaviour
    yesBtn.classList.toggle("pulse", step === 0);
    setYesScale(s.yesScaleLevel ?? 0);
    noBtn.classList.toggle("yes", s.finalYes);
    noBtn.classList.toggle("no", !s.finalYes);
  }
}

function nextStep() {
  if (step < STEPS.length - 1) step++;
  render();
}

let finished = false;

function showYay() {
  if (finished) return;
  finished = true;
  document.querySelector(".card").innerHTML = `
    <div style="text-align:center; padding: 12px 0;">
      <img
        src="yay.gif"
        alt="Yay!"
        style="width:220px; max-width:80%; margin-bottom: 12px;"
      />
      <div style="font-size:44px; font-weight:950; letter-spacing:-0.02em;">
        Yaayyy !!!!
      </div>
      <div style="margin-top: 10px; font-size:18px; font-weight:800; color: rgba(17,24,39,.65);">
        Happy Valentine’s Day My Dear !! ✨💖<br>
        See you soon !!!
      </div>
    </div>
  `;
  popConfetti();
}

yesBtn.addEventListener("click", showYay);

// Initial render
render();

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

noBtn.addEventListener("click", () => {
  const s = STEPS[step];

  // Final step: Yes / Yes
  if (s.finalYes) {
    showYay();
    return;
  }

  // Step 0 -> Step 1 special: after moving, shake the NO (now smaller)
  if (step === 0) {
    nextStep(); // now step === 1 and UI is rendered

    const s1 = STEPS[step];
    const scaleMap = [1, 0.92, 0.84, 0.76];
    const scale = scaleMap[Math.min(Math.max(s1.noLevel ?? 0, 0), 3)];

    noBtn.style.setProperty("--s", String(scale));
    noBtn.classList.remove("wiggle");
    void noBtn.offsetWidth;
    noBtn.classList.add("wiggle");

    return;
  }

  // Default: advance a step
  nextStep();
});
