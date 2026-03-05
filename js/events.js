// ================ Helper: navbar behavior ================
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

// ================ Smooth scroll for same-page hashes ================
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

// ================ Hero counters (count up) ================
const counterElements = document.querySelectorAll(".counter-number");

function animateCounter(el, target, duration) {
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(progress * target);
    el.textContent = value.toLocaleString();
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString();
    }
  }

  requestAnimationFrame(update);
}

if ("IntersectionObserver" in window && counterElements.length) {
  const counterObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          counterElements.forEach((el) => {
            const target = Number(el.getAttribute("data-target")) || 0;
            animateCounter(el, target, 1600);
          });
          obs.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );

  const heroSection = document.querySelector(".hero");
  if (heroSection) counterObserver.observe(heroSection);
} else {
  counterElements.forEach((el) => {
    const target = Number(el.getAttribute("data-target")) || 0;
    el.textContent = target.toLocaleString();
  });
}

// ================ Filter system for events grid ================
const filterButtons = document.querySelectorAll(".filter-btn");
const eventCards = document.querySelectorAll(".event-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");

    filterButtons.forEach((b) => b.classList.remove("filter-btn--active"));
    btn.classList.add("filter-btn--active");

    eventCards.forEach((card) => {
      const category = card.getAttribute("data-category");
      if (filter === "all" || filter === category) {
        card.classList.remove("is-hidden");
      } else {
        card.classList.add("is-hidden");
      }
    });
  });
});

// ================ Timeline fill on scroll ================
const timelineWrapper = document.getElementById("timelineWrapper");
const timelineFill = document.getElementById("timelineFill");

function updateTimelineFill() {
  if (!timelineWrapper || !timelineFill) return;

  const rect = timelineWrapper.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  const start = rect.top - windowHeight * 0.2;
  const end = rect.bottom - windowHeight * 0.4;

  if (end <= start) return;

  const progress = Math.min(Math.max((window.scrollY + windowHeight - (window.scrollY + start)) / (end - start), 0), 1);
  const heightPercent = progress * 100;
  timelineFill.style.height = `${heightPercent}%`;
}

window.addEventListener("scroll", updateTimelineFill);
window.addEventListener("resize", updateTimelineFill);
window.addEventListener("load", updateTimelineFill);

// Show year cards on scroll
const yearCards = document.querySelectorAll(".hidden-year");

if ("IntersectionObserver" in window && yearCards.length) {
  const yearObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show-year");
          yearObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  yearCards.forEach((card) => yearObserver.observe(card));
} else {
  yearCards.forEach((card) => card.classList.add("show-year"));
}

// ================ Modal system ================
const modal = document.getElementById("eventModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalMeta = document.getElementById("modalMeta");
const modalDescription = document.getElementById("modalDescription");
const modalImage = document.getElementById("modalImage");

function openModal({ title, date, sponsor, description, image }) {
  if (!modal) return;
  modalTitle.textContent = title;
  modalMeta.textContent = `${date} • ${sponsor}`;
  modalDescription.textContent = description;
  modalImage.style.backgroundImage = `url('${image}')`;

  modal.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("is-open");
  document.body.style.overflow = "";
}

document.querySelectorAll(".event-details-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const data = {
      title: btn.getAttribute("data-title") || "",
      date: btn.getAttribute("data-date") || "",
      sponsor: btn.getAttribute("data-sponsor") || "",
      description: btn.getAttribute("data-description") || "",
      image: btn.getAttribute("data-image") || "",
    };
    openModal(data);
  });
});

if (modalBackdrop) {
  modalBackdrop.addEventListener("click", closeModal);
}
if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal && modal.classList.contains("is-open")) {
    closeModal();
  }
});

