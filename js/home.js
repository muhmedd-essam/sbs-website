// ================= Helper: update year in footer =================
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ================= Navbar behavior =================
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    navbar.classList.add("navbar--solid");
  } else {
    navbar.classList.remove("navbar--solid");
  }
});

// Mobile nav toggle
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navLinks.classList.toggle("open");
  });

  // Close nav when clicking a link (mobile)
  navLinks.addEventListener("click", (e) => {
    if (e.target.classList.contains("nav-link")) {
      navToggle.classList.remove("active");
      navLinks.classList.remove("open");
    }
  });
}

// ================= Smooth scroll =================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href").slice(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ================= Timeline on-scroll animation =================
const timelineItems = document.querySelectorAll(".timeline-item.hidden");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  timelineItems.forEach((item) => observer.observe(item));
} else {
  // Fallback: simply show all
  timelineItems.forEach((item) => item.classList.add("show"));
}

// ================= Stats count-up animation =================
const statNumbers = document.querySelectorAll(".stat-number");

function animateCounter(el) {
  const target = Number(el.getAttribute("data-target")) || 0;
  const duration = 1500; // ms
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.floor(progress * target);
    el.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target; // ensure final value
    }
  }

  requestAnimationFrame(update);
}

if ("IntersectionObserver" in window) {
  const statsObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          statNumbers.forEach((num) => animateCounter(num));
          obs.disconnect(); // run once
        }
      });
    },
    { threshold: 0.3 }
  );

  const statsSection = document.querySelector(".stats-section");
  if (statsSection) statsObserver.observe(statsSection);
} else {
  // Fallback: animate immediately
  statNumbers.forEach((num) => animateCounter(num));
}

