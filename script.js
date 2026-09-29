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

// ============ SVG CONSTELLATION LINES SETUP ============
const lines = document.querySelectorAll(".constellation-lines path");
lines.forEach((path) => {
  const length = path.getTotalLength();
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;
});

// Map nodes to connected SVG line IDs for interactive highlights
const nodeLineMap = {
  "tile-lock": ["line-lock-mint", "line-lock-yellow"],
  "tile-expand": ["line-lock-mint", "line-mint-center"],
  "tile-chart": ["line-lock-yellow", "line-yellow-center"],
  "tile-cloud": ["line-cloud-center"],
  "tile-db": ["line-mint-center", "line-yellow-center", "line-cloud-center", "line-thumb-center", "line-center-person", "line-center-globe"],
  "tile-thumb": ["line-thumb-center"],
  "tile-cursor": ["line-cursor-person"],
  "tile-person": ["line-center-person", "line-cursor-person", "line-person-hex"],
  "tile-globe": ["line-center-globe", "line-thumbpill-globe", "line-globe-hex"],
  "tile-thumbpill": ["line-thumbpill-globe"],
  "tile-hex": ["line-person-hex", "line-globe-hex"]
};

// Node Tooltip & Path Highlight Interaction
const tooltip = document.getElementById("nodeTooltip");
const tooltipBadge = document.getElementById("tooltipBadge");
const tooltipTitle = document.getElementById("tooltipTitle");
const tooltipDesc = document.getElementById("tooltipDesc");

document.querySelectorAll(".tile").forEach((tile) => {
  tile.addEventListener("mouseenter", () => {
    const skill = tile.getAttribute("data-skill");
    const desc = tile.getAttribute("data-desc");

    if (tooltip && skill && desc) {
      tooltipTitle.textContent = skill;
      tooltipDesc.textContent = desc;
      tooltipBadge.textContent = "EXPERTISE NODE";
      gsap.to(tooltip, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" });
    }

    // Highlight connecting lines
    lines.forEach(l => l.classList.remove("active-line"));
    for (const [keyClass, lineIds] of Object.entries(nodeLineMap)) {
      if (tile.classList.contains(keyClass)) {
        lineIds.forEach(id => {
          const l = document.getElementById(id);
          if (l) l.classList.add("active-line");
        });
      }
    }
  });

  tile.addEventListener("mouseleave", () => {
    lines.forEach(l => l.classList.remove("active-line"));
    if (tooltip) {
      tooltipBadge.textContent = "INTERACTIVE ECOSYSTEM";
      tooltipTitle.textContent = "Skills & Architecture Ecosystem";
      tooltipDesc.textContent = "Hover any node to inspect specialized frameworks and capabilities.";
    }
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

// ============ ECOSYSTEM CONSTELLATION ENTRANCE ============
ScrollTrigger.create({
  trigger: ".ecosystem-section",
  start: "top 80%",
  once: true,
  onEnter: () => {
    gsap.to(".tile", {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      stagger: { each: 0.06, from: "center" },
      ease: "elastic.out(1, 0.6)"
    });
    gsap.to(".constellation-lines path", {
      strokeDashoffset: 0,
      duration: 1.4,
      stagger: 0.05,
      ease: "power2.inOut"
    });
  }
});

// ============ CONSTELLATION 3D TILT ============
const constellation = document.getElementById("constellation");
const constellationInner = document.getElementById("constellationInner");

if (constellation && constellationInner) {
  constellation.addEventListener("mousemove", (e) => {
    const rect = constellation.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(constellationInner, {
      rotationY: x * 14,
      rotationX: -y * 10,
      duration: 0.8,
      transformPerspective: 1500,
      ease: "power2.out"
    });
  });

  constellation.addEventListener("mouseleave", () => {
    gsap.to(constellationInner, {
      rotationY: 0,
      rotationX: 0,
      duration: 1.2,
      ease: "elastic.out(1, 0.5)"
    });
  });
}

// ============ HERO SCROLL PARALLAX ============
gsap.to(".constellation", {
  y: 90,
  scale: 0.93,
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: 1.2
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

splitWords(".ecosystem-title");
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
  { sel: ".ecosystem-title", trig: ".ecosystem-title" },
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