const CA = "TBA";
const ANSWERS = [
  "MAKE IT GREAT",
  "BUY THE DIP",
  "TOO BASED TO FAIL",
  "FIRE AND FURY",
  "THE MACHINE SAYS YES",
  "HOLD THE LINE",
  "CYBER BULL RUN",
  "ASK AGAIN, PATRIOT",
  "1000X ENERGY",
  "NOT FINANCIAL ADVICE",
  "PROTOCOL LOCKED IN",
  "THE CHARTS LOOK HUGE"
];

const FEED = [
  "@leo just got upgraded",
  "@sam bought $CYBERTRUMP",
  "@mira is watching the skyline",
  "@dev said based and left",
  "@kate is holding the line",
  "@nick paper-handed the dip",
  "@ava is doing research (scrolling X)",
  "@jules asked the protocol",
  "@ren typed and deleted 4 times",
  "@zoe bought $CYBERTRUMP",
  "@theo whispered cyber",
  "@ivy is not financial advice"
];

function $(sel, root = document) {
  return root.querySelector(sel);
}

function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    if (!btn) return;
    const prev = btn.textContent;
    btn.textContent = "copied";
    setTimeout(() => { btn.textContent = prev; }, 1400);
  }).catch(() => {
    window.prompt("copy this", text);
  });
}

function setupNav() {
  const toggle = $("[data-menu]");
  const menu = $("[data-mobile]");
  if (!toggle || !menu) return;
  toggle.addEventListener("click", () => menu.classList.toggle("open"));
  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => menu.classList.remove("open"));
  });
}

function setupCopy() {
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", () => copyText(btn.dataset.copy || CA, btn));
  });
}

function setupOrb() {
  const orb = $("[data-orb]");
  const out = $("[data-answer]");
  if (!orb || !out) return;
  orb.addEventListener("click", () => {
    const next = ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
    out.classList.remove("pop");
    void out.offsetWidth;
    out.textContent = next;
    out.classList.add("pop");
  });
}

function setupLightbox() {
  const box = document.createElement("div");
  box.className = "lb";
  box.innerHTML = "<img alt='Cyber Trump meme' />";
  document.body.appendChild(box);
  const img = box.querySelector("img");
  box.addEventListener("click", () => box.classList.remove("open"));
  document.querySelectorAll("[data-meme]").forEach((btn) => {
    btn.addEventListener("click", () => {
      img.src = btn.dataset.meme;
      box.classList.add("open");
    });
  });
}

function setupDownloads() {
  document.querySelectorAll("[data-download]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const url = btn.dataset.download;
      const name = btn.dataset.name || "cybertrump.jpg";
      try {
        const blob = await (await fetch(url)).blob();
        const href = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = href;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(href);
      } catch {
        window.open(url, "_blank");
      }
    });
  });
}

function fillFeed() {
  const track = $("[data-feed]");
  if (!track) return;
  const items = [...FEED, ...FEED].map((line) => {
    const span = document.createElement("span");
    span.innerHTML = `<i>&gt; </i>${line}`;
    return span;
  });
  track.replaceChildren(...items);
}

function setupParticles() {
  const canvas = $("#particles");
  if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ctx = canvas.getContext("2d");
  const dots = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function spawn() {
    dots.length = 0;
    const count = Math.min(70, Math.floor(window.innerWidth / 18));
    for (let i = 0; i < count; i += 1) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.6 + 0.3,
        s: Math.random() * 0.35 + 0.08,
        a: Math.random() * 0.5 + 0.15
      });
    }
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const d of dots) {
      d.y -= d.s;
      if (d.y < -4) {
        d.y = canvas.height + 4;
        d.x = Math.random() * canvas.width;
      }
      ctx.beginPath();
      ctx.fillStyle = `rgba(0, 229, 255, ${d.a})`;
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }

  resize();
  spawn();
  tick();
  window.addEventListener("resize", () => { resize(); spawn(); });
}

setupNav();
setupCopy();
setupOrb();
setupLightbox();
setupDownloads();
fillFeed();
setupParticles();
