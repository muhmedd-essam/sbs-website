// ============ Navbar behavior ============
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

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navLinks.classList.toggle("open");
  });

  navLinks.addEventListener("click", (e) => {
    if (e.target.classList.contains("nav-link")) {
      navToggle.classList.remove("active");
      navLinks.classList.remove("open");
    }
  });
}

// ============ Smooth scroll for same-page anchors ============
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href").slice(1);
    if (!targetId) return;
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ============ Leadership timeline animations ============
const timelineWrapper = document.getElementById("timelineWrapper");
const timelineFill = document.getElementById("timelineFill");

function updateTimelineFill() {
  if (!timelineWrapper || !timelineFill) return;

  const rect = timelineWrapper.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  const start = rect.top - windowHeight * 0.2;
  const end = rect.bottom - windowHeight * 0.4;

  if (end <= start) return;

  const scrollY = window.scrollY || window.pageYOffset;
  const progress = Math.min(
    Math.max((scrollY + windowHeight - (scrollY + start)) / (end - start), 0),
    1
  );
  timelineFill.style.height = `${progress * 100}%`;
}

window.addEventListener("scroll", updateTimelineFill);
window.addEventListener("resize", updateTimelineFill);
window.addEventListener("load", updateTimelineFill);

// Reveal timeline cards on scroll
const timelineItems = document.querySelectorAll(".timeline-item.hidden");

if ("IntersectionObserver" in window && timelineItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  timelineItems.forEach((item) => observer.observe(item));
} else {
  timelineItems.forEach((item) => item.classList.add("show"));
}

