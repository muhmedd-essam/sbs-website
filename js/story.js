// ================= Navbar =================
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

window.addEventListener("scroll", () => {
  if (navbar && window.scrollY > 20) navbar.classList.add("navbar--solid");
  else if (navbar) navbar.classList.remove("navbar--solid");
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

// ================= Fade-in on scroll =================
const storyItems = document.querySelectorAll(".story-item.hidden");
if ("IntersectionObserver" in window && storyItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  storyItems.forEach((item) => observer.observe(item));
} else {
  storyItems.forEach((item) => item.classList.add("show"));
}

// ================= Lightbox =================
const modal = document.getElementById("storyModal");
const modalImg = document.getElementById("storyModalImg");
const modalBackdrop = document.getElementById("storyModalBackdrop");
const modalClose = document.getElementById("storyModalClose");

function openLightbox(src, alt) {
  if (!modal || !modalImg) return;
  modalImg.src = src;
  modalImg.alt = alt || "";
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".story-item img").forEach((img) => {
  img.addEventListener("click", () => openLightbox(img.src, img.alt));
});

if (modalBackdrop) modalBackdrop.addEventListener("click", closeLightbox);
if (modalClose) modalClose.addEventListener("click", closeLightbox);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal && modal.classList.contains("is-open")) closeLightbox();
});
