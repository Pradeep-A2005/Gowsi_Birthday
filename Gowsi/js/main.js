/* ============================================================
   GOWSI'S MAGICAL 1ST BIRTHDAY — MAIN JAVASCRIPT
   ============================================================ */

"use strict";

/* ─── WELCOME SCREEN ─── */
(function initWelcome() {
  const screen = document.getElementById("welcome-screen");
  const mainSite = document.getElementById("main-site");
  const enterBtn = document.getElementById("btn-enter");

  // Generate sparkle dots in the welcome background
  const sparkleWrap = document.querySelector(".welcome-bg-sparkle");
  if (sparkleWrap) {
    for (let i = 0; i < 60; i++) {
      const dot = document.createElement("span");
      dot.className = "sparkle-dot";
      dot.style.cssText = `
        left:${Math.random()*100}%;
        top:${Math.random()*100}%;
        --dur:${1.5+Math.random()*2}s;
        animation-delay:${Math.random()*2}s;
        width:${2+Math.random()*4}px;
        height:${2+Math.random()*4}px;
        background:${Math.random()>0.5?"#f0d58c":"#f4a7b9"};
      `;
      sparkleWrap.appendChild(dot);
    }
  }

  if (enterBtn) {
    enterBtn.addEventListener("click", function () {
      screen.classList.add("hide");
      mainSite.classList.add("visible");
      setTimeout(function () {
        screen.style.display = "none";
        startFloatingHearts();
      }, 900);
    });
  }
})();

/* ─── FLOATING HEARTS (background decoration) ─── */
function startFloatingHearts() {
  const layer = document.querySelector(".floating-hearts-layer");
  if (!layer) return;
  const symbols = ["💕", "✨", "🌸", "💫", "🎀", "⭐", "💗"];
  function spawnHeart() {
    const h = document.createElement("span");
    h.className = "flt-heart";
    h.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    h.style.cssText = `
      left:${Math.random()*100}%;
      font-size:${0.8+Math.random()*1.2}rem;
      animation-duration:${8+Math.random()*8}s;
      animation-delay:${Math.random()*3}s;
    `;
    layer.appendChild(h);
    setTimeout(() => h.remove(), 18000);
  }
  for (let i = 0; i < 6; i++) spawnHeart();
  setInterval(spawnHeart, 3000);
}

/* ─── SCROLL REVEAL (Intersection Observer) ─── */
(function initReveal() {
  const selectors = ".reveal, .reveal-left, .reveal-right";
  const targets = document.querySelectorAll(selectors);
  if (!targets.length) return;

  const obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  targets.forEach(function (t) { obs.observe(t); });
})();

/* ─── STICKY NAV ACTIVE LINK ─── */
(function initNavHighlight() {
  const sections = document.querySelectorAll("section[id], div[id]");
  const navLinks = document.querySelectorAll(".fairy-nav .nav-link");
  if (!sections.length) return;

  const obs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove("active"); });
          const link = document.querySelector(`.fairy-nav .nav-link[href="#${e.target.id}"]`);
          if (link) link.classList.add("active");
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach(function (s) { obs.observe(s); });
})();

/* ─── BIRTHDAY CAKE INTERACTION ─── */
(function initCake() {
  const wishBtn = document.getElementById("btn-make-wish");
  const replayBtn = document.getElementById("btn-replay");
  const flame = document.querySelector(".flame");
  const smokePuff = document.querySelector(".smoke-puff");
  const wishMessage = document.querySelector(".wish-message");

  if (!wishBtn || !flame) return;

  wishBtn.addEventListener("click", function () {
    // Blow out candle
    flame.classList.add("out");
    smokePuff && smokePuff.classList.add("active");
    wishBtn.disabled = true;
    wishBtn.textContent = "Wish Made! 🌟";

    // Show loving message
    if (wishMessage) {
      setTimeout(function () {
        wishMessage.classList.add("show");
      }, 600);
    }

    // Fire confetti
    setTimeout(launchConfetti, 400);

    // Show replay after confetti
    if (replayBtn) {
      setTimeout(function () {
        replayBtn.style.display = "inline-flex";
      }, 4000);
    }
  });

  if (replayBtn) {
    replayBtn.addEventListener("click", function () {
      flame.classList.remove("out");
      smokePuff && smokePuff.classList.remove("active");
      wishBtn.disabled = false;
      wishBtn.textContent = "🎂 Make a Birthday Wish!";
      if (wishMessage) wishMessage.classList.remove("show");
      replayBtn.style.display = "none";
      stopConfetti();
    });
  }
})();

/* ─── CONFETTI ─── */
var confettiAnimId = null;
var confettiParticles = [];

function launchConfetti() {
  var canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var colors = ["#f4a7b9", "#c8b4e8", "#f0d58c", "#c9974c", "#fde8f0", "#ffffff", "#d4607a"];
  confettiParticles = [];

  for (var i = 0; i < 180; i++) {
    confettiParticles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: 6 + Math.random() * 10,
      h: 3 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * 360,
      rspeed: (Math.random() - 0.5) * 6,
      speed: 2 + Math.random() * 4,
      drift: (Math.random() - 0.5) * 1.5,
      opacity: 0.7 + Math.random() * 0.3,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiParticles.forEach(function (p) {
      p.y += p.speed;
      p.x += p.drift;
      p.rot += p.rspeed;
      if (p.y > canvas.height) { p.y = -20; p.x = Math.random() * canvas.width; }
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    confettiAnimId = requestAnimationFrame(draw);
  }

  if (confettiAnimId) cancelAnimationFrame(confettiAnimId);
  draw();

  // Auto stop after 5s
  setTimeout(stopConfetti, 5000);
}

function stopConfetti() {
  if (confettiAnimId) {
    cancelAnimationFrame(confettiAnimId);
    confettiAnimId = null;
  }
  var canvas = document.getElementById("confetti-canvas");
  if (canvas) canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
}

/* ─── GALLERY (filter + lightbox) ─── */
(function initGallery() {
  var pills = document.querySelectorAll(".filter-pill");
  var polaroids = document.querySelectorAll(".polaroid[data-cat]");

  pills.forEach(function (pill) {
    pill.addEventListener("click", function () {
      pills.forEach(function (p) { p.classList.remove("active"); });
      pill.classList.add("active");
      var cat = pill.dataset.cat;
      polaroids.forEach(function (card) {
        if (cat === "all" || card.dataset.cat === cat) {
          card.style.display = "";
          setTimeout(function () { card.style.opacity = "1"; card.style.transform = ""; }, 10);
        } else {
          card.style.opacity = "0";
          setTimeout(function () { card.style.display = "none"; }, 300);
        }
      });
    });
  });

  // Lightbox
  var lightbox = document.getElementById("lightbox");
  var lbImg = document.getElementById("lb-img");
  var lbCaption = document.getElementById("lb-caption");
  var lbClose = document.getElementById("lb-close");
  var lbPrev = document.getElementById("lb-prev");
  var lbNext = document.getElementById("lb-next");
  var currentIdx = 0;
  var visibleCards = [];

  function openLightbox(idx) {
    visibleCards = Array.from(document.querySelectorAll(".polaroid[data-cat]:not([style*='display: none'])"));
    if (!visibleCards.length) return;
    currentIdx = idx;
    updateLightbox();
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function updateLightbox() {
    var card = visibleCards[currentIdx];
    if (!card) return;
    var img = card.querySelector("img");
    var cap = card.querySelector(".caption");
    if (lbImg) { lbImg.src = img ? img.src : ""; lbImg.alt = img ? img.alt : ""; }
    if (lbCaption) lbCaption.textContent = cap ? cap.textContent : "";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  polaroids.forEach(function (card, i) {
    card.addEventListener("click", function () { openLightbox(i); });
  });

  if (lbClose) lbClose.addEventListener("click", closeLightbox);
  if (lbPrev) {
    lbPrev.addEventListener("click", function () {
      currentIdx = (currentIdx - 1 + visibleCards.length) % visibleCards.length;
      updateLightbox();
    });
  }
  if (lbNext) {
    lbNext.addEventListener("click", function () {
      currentIdx = (currentIdx + 1) % visibleCards.length;
      updateLightbox();
    });
  }
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (!lightbox || !lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft" && lbPrev) lbPrev.click();
    if (e.key === "ArrowRight" && lbNext) lbNext.click();
  });
})();

/* ─── WISHES LANGUAGE TOGGLE ─── */
(function initWishTabs() {
  var tabs = document.querySelectorAll(".wish-tab-btn");
  var wishEn = document.querySelector(".wish-body");
  var wishTa = document.querySelector(".wish-body-ta");

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.classList.remove("active"); });
      tab.classList.add("active");
      var lang = tab.dataset.lang;
      if (lang === "en") {
        if (wishEn) wishEn.style.display = "";
        if (wishTa) wishTa.style.display = "none";
      } else {
        if (wishEn) wishEn.style.display = "none";
        if (wishTa) wishTa.style.display = "block";
      }
    });
  });
})();

/* ─── RELIVE MEMORIES BUTTON ─── */
(function initRelive() {
  var btn = document.getElementById("btn-relive");
  if (!btn) return;
  btn.addEventListener("click", function () {
    var gallery = document.getElementById("gallery");
    if (gallery) {
      gallery.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
})();

/* ─── RESIZE confetti canvas ─── */
window.addEventListener("resize", function () {
  var canvas = document.getElementById("confetti-canvas");
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});

/* ─── SMOOTH SCROLL for all anchor links ─── */
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener("click", function (e) {
    var target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
      // Close mobile navbar if open
      var navCollapse = document.getElementById("navMenu");
      if (navCollapse && navCollapse.classList.contains("show")) {
        var toggler = document.querySelector(".navbar-toggler");
        if (toggler) toggler.click();
      }
    }
  });
});

console.log("Gowsi Birthday Site loaded successfully!");
