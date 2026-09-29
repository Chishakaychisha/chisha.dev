gsap.registerPlugin(ScrollTrigger);

// ============ CUSTOM MAGNETIC CURSOR ============
const cursor = document.querySelector(".cursor");
const cursorDot = document.querySelector(".cursor-dot");

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursorDot) {
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  }
});

(function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.18;
  cursorY += (mouseY - cursorY) * 0.18;
  if (cursor) {
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
  }
  requestAnimationFrame(animateCursor);
})();

// Cursor Hover Scaling on Interactive Elements
document.querySelectorAll("a, button, .tile, .fpill, .project-card, .feature-card, input, select, textarea, .p-link").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    if (cursor) gsap.to(cursor, { width: 44, height: 44, duration: 0.3, ease: "power2.out" });
  });
  el.addEventListener("mouseleave", () => {
    if (cursor) gsap.to(cursor, { width: 14, height: 14, duration: 0.3, ease: "power2.out" });
  });
});

// ============ REDESIGNED STORY & SKILLS ECOSYSTEM INTERACTIONS ============

// 1. Dynamic Live Skill Inspector HUD
const hudStatus = document.getElementById("hudStatus");
const hudLevel = document.getElementById("hudLevel");
const hudTitle = document.getElementById("hudTitle");
const hudDesc = document.getElementById("hudDesc");
const allSkillPills = document.querySelectorAll(".skill-pill");

if (allSkillPills.length > 0 && hudTitle) {
  allSkillPills.forEach((pill) => {
    pill.addEventListener("mouseenter", () => {
      const name = pill.dataset.name || pill.textContent.trim();
      const cat = pill.dataset.cat || "Architecture";
      const desc = pill.dataset.desc || "Enterprise-ready framework for scalable digital applications.";
      const exp = pill.dataset.exp || "Production Ready";

      allSkillPills.forEach(p => p.classList.remove("is-active"));
      pill.classList.add("is-active");

      if (hudStatus) hudStatus.textContent = `${cat.toUpperCase()} RADAR`;
      if (hudLevel) hudLevel.textContent = exp;
      if (hudTitle) hudTitle.textContent = name;
      if (hudDesc) hudDesc.textContent = desc;

      gsap.fromTo(
        [hudTitle, hudDesc],
        { opacity: 0.3, y: 3 },
        { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }
      );
    });
  });
}

// 2. Interactive Category Filter Nav
const filterButtons = document.querySelectorAll(".filter-btn");
const skillRows = document.querySelectorAll(".skill-cat-row");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    skillRows.forEach((row) => {
      const rowCat = row.dataset.cat;
      if (filter === "all" || rowCat === filter) {
        row.classList.remove("dimmed");
        gsap.to(row, { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" });
        gsap.fromTo(
          row.querySelectorAll(".skill-pill"),
          { scale: 0.88, opacity: 0.7 },
          { scale: 1, opacity: 1, stagger: 0.02, duration: 0.4, ease: "back.out(1.6)" }
        );
      } else {
        row.classList.add("dimmed");
        gsap.to(row, { opacity: 0.25, scale: 0.98, duration: 0.35, ease: "power2.out" });
      }
    });
  });
});

// 3. 3D Subtle Tilt on Story & Skills Cards
const interactiveCards = document.querySelectorAll(".se-card");
interactiveCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotationY: x * 6,
      rotationX: -y * 6,
      duration: 0.5,
      transformPerspective: 1200,
      ease: "power2.out"
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.9,
      ease: "elastic.out(1, 0.6)"
    });
  });
});

// ============ PAGE ENTRANCE TIMELINE ============
const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

tl.to(".site-header", { opacity: 1, duration: 0.8 }, 0)
  .to(".title-inner", { y: 0, duration: 1.1, stagger: 0.08, ease: "power4.out" }, 0.15)
  .to(".hero-desc", { opacity: 1, y: 0, duration: 0.8 }, 0.7)
  .from(".hero-desc", { y: 20, duration: 0.8 }, 0.7)
  .to(".hero-actions", { opacity: 1, y: 0, duration: 0.7 }, 0.85)
  .from(".hero-actions", { y: 15, duration: 0.7 }, 0.85)
  .to(".hero-tech-strip", { opacity: 1, duration: 0.6 }, 0.95)
  .from(".hero-portrait-card", {
    opacity: 0,
    y: 30,
    scale: 0.95,
    duration: 1.1,
    ease: "power3.out"
  }, 0.3)
  .to(".workspace", { opacity: 1, duration: 0.8 }, 1.2)
  .from(".fpill", {
    y: 25,
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "back.out(1.6)"
  }, 1.2);

// ============ STORY & SKILLS ECOSYSTEM SCROLL ENTRANCE ============
ScrollTrigger.create({
  trigger: ".story-ecosystem-section",
  start: "top 80%",
  once: true,
  onEnter: () => {
    gsap.fromTo(
      ".se-header",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
    gsap.fromTo(
      ".story-card",
      { opacity: 0, y: 40, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9, delay: 0.1, ease: "power3.out" }
    );
    gsap.fromTo(
      ".skills-card",
      { opacity: 0, y: 40, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9, delay: 0.2, ease: "power3.out" }
    );
    gsap.fromTo(
      ".meta-item",
      { opacity: 0, x: -15 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, delay: 0.35, ease: "power2.out" }
    );
    gsap.fromTo(
      ".skill-pill",
      { opacity: 0, scale: 0.6, y: 15 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: { each: 0.02, from: "start" }, delay: 0.3, ease: "back.out(1.8)" }
    );
  }
});

gsap.to(".hero-left", {
  y: 50,
  opacity: 0.6,
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: 1.2
  }
});

// ============ STATS NUMBER COUNTER ============
document.querySelectorAll(".stat-num").forEach((el) => {
  const target = parseInt(el.dataset.num, 10);
  const suffixEl = el.querySelector(".accent");
  const suffix = suffixEl ? suffixEl.outerHTML : "";

  ScrollTrigger.create({
    trigger: el,
    start: "top 88%",
    once: true,
    onEnter: () => {
      let counter = { val: 0 };
      gsap.to(counter, {
        val: target,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => {
          el.innerHTML = Math.floor(counter.val) + suffix;
        }
      });
    }
  });
});

// ============ TEXT REVEAL ANIMATIONS ============
function splitWords(selector) {
  document.querySelectorAll(selector).forEach((el) => {
    const text = el.innerText.trim();
    const words = text.split(/\s+/);
    el.innerHTML = words
      .map(
        (w) =>
          `<span class="sword" style="display:inline-block;overflow:hidden;padding-bottom:0.12em;vertical-align:top;"><span class="sword-inner" style="display:inline-block;transform:translateY(110%);will-change:transform;">${w}</span></span>`
      )
      .join(" ");
  });
}

splitWords(".se-main-title");
splitWords(".projects-title");
splitWords(".features-title");
splitWords(".quote-text");
splitWords(".final-cta-h2");

// Re-color accent text in final CTA
document.querySelectorAll(".final-cta-h2 .sword-inner").forEach((el) => {
  if (el.textContent.includes("life") || el.textContent.includes("extraordinary")) {
    el.style.color = "var(--yellow)";
  }
});

// Animate reveals on scroll
const headings = [
  { sel: ".se-main-title", trig: ".se-main-title" },
  { sel: ".projects-title", trig: ".projects-title" },
  { sel: ".features-title", trig: ".features-title" },
  { sel: ".quote-text", trig: ".quote-text" },
  { sel: ".final-cta-h2", trig: ".final-cta-h2" }
];

headings.forEach(({ sel, trig }) => {
  gsap.to(`${sel} .sword-inner`, {
    y: 0,
    duration: 1,
    stagger: 0.04,
    ease: "power4.out",
    scrollTrigger: {
      trigger: trig,
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });
});

// ============ PROJECT CARDS STAGGERED REVEAL ============
gsap.from(".project-card", {
  y: 60,
  opacity: 0,
  duration: 1,
  stagger: 0.18,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".projects-grid",
    start: "top 78%",
    toggleActions: "play none none reverse"
  }
});

// ============ FEATURE CARDS 3D HOVER & REVEAL ============
gsap.from(".feature-card", {
  y: 70,
  opacity: 0,
  duration: 1,
  stagger: 0.16,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".feature-cards",
    start: "top 75%",
    toggleActions: "play none none reverse"
  }
});

document.querySelectorAll(".feature-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotationY: x * 8,
      rotationX: -y * 8,
      y: -10,
      duration: 0.4,
      transformPerspective: 1200,
      ease: "power2.out"
    });
  });
  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      rotationY: 0,
      rotationX: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)"
    });
  });
});

// ============ QUOTE MARK ANIMATION ============
gsap.from(".quote-mark", {
  scale: 0,
  rotation: -45,
  duration: 1.2,
  ease: "elastic.out(1, 0.6)",
  scrollTrigger: {
    trigger: ".quote-mark",
    start: "top 85%",
    toggleActions: "play none none reverse"
  }
});

// ============ FINAL CTA ENTRY ============
gsap.from(".final-cta-card", {
  scale: 0.94,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".final-cta-card",
    start: "top 82%",
    toggleActions: "play none none reverse"
  }
});

// ============ CONTACT FORM HANDLER ============
window.handleFormSubmit = function () {
  const name = document.getElementById("userName").value.trim();
  const email = document.getElementById("userEmail").value.trim();
  const type = document.getElementById("projectType").value;
  const message = document.getElementById("userMessage").value.trim();
  const feedback = document.getElementById("formFeedback");
  const submitBtn = document.getElementById("submitBtn");

  if (!name || !email || !message) {
    if (feedback) {
      feedback.style.color = "#ff6b6b";
      feedback.textContent = "Please fill in all required fields.";
    }
    return;
  }

  // Visual success state
  submitBtn.disabled = true;
  submitBtn.innerHTML = `Sending... <span class="cta-arrow">&#10003;</span>`;

  setTimeout(() => {
    feedback.style.color = "var(--yellow)";
    feedback.innerHTML = `Thank you, ${name}! Opening mail draft to <strong>chishachisha05@gmail.com</strong>...`;
    
    // Fallback: Trigger standard mailto with prefilled details
    const subject = encodeURIComponent(`Project Inquiry: ${type} from ${name}`);
    const body = encodeURIComponent(`Hi Chisha,\n\nName: ${name}\nEmail: ${email}\nProject Type: ${type}\n\nDetails:\n${message}\n\nBest regards,\n${name}`);
    
    window.location.href = `mailto:chishachisha05@gmail.com?subject=${subject}&body=${body}`;

    submitBtn.innerHTML = `Message Sent! <span class="cta-arrow">&#10003;</span>`;
    document.getElementById("contactForm").reset();

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `Send Message Directly <span class="cta-arrow">&rarr;</span>`;
    }, 4000);
  }, 600);
};

// ============ LOCAL TIME DISPLAY FOR LUSAKA (CAT / UTC+2) ============
function updateLocalTime() {
  const timeEl = document.getElementById("footerTime");
  if (!timeEl) return;
  const now = new Date();
  const options = {
    timeZone: "Africa/Lusaka",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  };
  try {
    const timeString = new Intl.DateTimeFormat("en-US", options).format(now);
    timeEl.textContent = `Lusaka, ZM (CAT / UTC+2) — ${timeString}`;
  } catch (e) {
    timeEl.textContent = `Lusaka, Zambia (CAT / UTC+2)`;
  }
}
setInterval(updateLocalTime, 1000);
updateLocalTime();

// Update current year dynamically
const yr = document.getElementById("currentYear");
if (yr) yr.textContent = new Date().getFullYear();

// Window Load Refresh for ScrollTrigger
window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});

// ============ HIGH-PERFORMANCE SWARM PARTICLE CANVAS ANIMATION ============
function initSwarm(canvasId, opts) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const cfg = Object.assign({ num: 75, connectDist: 130, speed: 0.5, repel: 100 }, opts);

  let W, H, particles;
  const mouse = { x: -9999, y: -9999 };
  const NUM = cfg.num;
  const CONNECT_DIST = cfg.connectDist;
  const CONNECT_DIST_SQ = CONNECT_DIST * CONNECT_DIST;
  const SPEED = cfg.speed;
  const MOUSE_REPEL = cfg.repel;
  const MOUSE_REPEL_SQ = MOUSE_REPEL * MOUSE_REPEL;

  let isVisible = true;
  let animId = null;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    W = canvas.width = rect.width;
    H = canvas.height = rect.height;
  }

  function randomColor() {
    const palette = [
      "rgba(200,236,200,",  // mint
      "rgba(251,197,54,",   // yellow
      "rgba(220,208,238,",  // purple
      "rgba(255,255,255,",  // white
    ];
    return palette[Math.floor(Math.random() * palette.length)];
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < NUM; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        r: Math.random() * 2 + 1.2,
        col: randomColor(),
      });
    }
  }

  function draw() {
    if (!isVisible) {
      animId = null;
      return;
    }

    ctx.clearRect(0, 0, W, H);

    // Fast connecting lines with squared distance check
    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < CONNECT_DIST_SQ) {
          const dist = Math.sqrt(distSq);
          const alpha = (1 - dist / CONNECT_DIST) * 0.4;
          ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
          ctx.lineWidth = 0.65;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    // Particles rendering
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const mdx = p.x - mouse.x;
      const mdy = p.y - mouse.y;
      const mdSq = mdx * mdx + mdy * mdy;
      if (mdSq < MOUSE_REPEL_SQ && mdSq > 0) {
        const md = Math.sqrt(mdSq);
        const force = (MOUSE_REPEL - md) / MOUSE_REPEL;
        p.vx += (mdx / md) * force * 0.7;
        p.vy += (mdy / md) * force * 0.7;
      }

      p.vx *= 0.985;
      p.vy *= 0.985;

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) { p.x = 0; p.vx = Math.abs(p.vx); }
      if (p.x > W) { p.x = W; p.vx = -Math.abs(p.vx); }
      if (p.y < 0) { p.y = 0; p.vy = Math.abs(p.vy); }
      if (p.y > H) { p.y = H; p.vy = -Math.abs(p.vy); }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.col + "0.85)";
      ctx.fill();
    }

    animId = requestAnimationFrame(draw);
  }

  // Mouse tracking
  canvas.parentElement.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }, { passive: true });

  canvas.parentElement.addEventListener("mouseleave", () => {
    mouse.x = -9999;
    mouse.y = -9999;
  }, { passive: true });

  window.addEventListener("resize", () => {
    resize();
    createParticles();
  }, { passive: true });

  // Pause render loop when canvas is off-screen
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animId) {
          animId = requestAnimationFrame(draw);
        } else if (!isVisible && animId) {
          cancelAnimationFrame(animId);
          animId = null;
        }
      });
    }, { rootMargin: "100px" });
    observer.observe(canvas);
  }

  resize();
  createParticles();
  animId = requestAnimationFrame(draw);
}

// Initialize swarm canvases with optimized particle counts
initSwarm("swarmCanvasHero", { num: 75, connectDist: 135, speed: 0.42, repel: 110 }); // Hero background
initSwarm("swarmCanvas",     { num: 55, connectDist: 110, speed: 0.45, repel: 90 });  // Experience section