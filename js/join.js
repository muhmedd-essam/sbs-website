// Recruitment state flag
const recruitmentOpen = true;

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

// ============ Smooth scroll for internal anchors ============
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

// ============ Scroll buttons to form ============
const scrollToFormBtn = document.getElementById("scrollToForm");
const finalApplyBtn = document.getElementById("finalApplyBtn");
const applySection = document.getElementById("apply");

function scrollToForm() {
  if (applySection) {
    applySection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

if (scrollToFormBtn) scrollToFormBtn.addEventListener("click", scrollToForm);
if (finalApplyBtn) finalApplyBtn.addEventListener("click", scrollToForm);

// ============ Recruitment open / closed handling ============
const joinForm = document.getElementById("joinForm");
const applicationStatus = document.getElementById("applicationStatus");

if (!recruitmentOpen) {
  if (applicationStatus) {
    applicationStatus.textContent = "Recruitment is currently closed.";
  }
  if (joinForm) {
    joinForm.style.display = "none";
  }
}

// ============ Fade-on-scroll for cards ============
const fadeEls = document.querySelectorAll(".fade-on-scroll");

if ("IntersectionObserver" in window && fadeEls.length) {
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  fadeEls.forEach((el) => fadeObserver.observe(el));
} else {
  fadeEls.forEach((el) => el.classList.add("is-visible"));
}

// ============ Basic form validation & submission ============
const resultModal = document.getElementById("resultModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");

function showError(fieldId, message) {
  const errorElement = document.querySelector(
    `.field-error[data-error-for="${fieldId}"]`
  );
  if (errorElement) {
    errorElement.textContent = message;
  }
}

function clearErrors() {
  document
    .querySelectorAll(".field-error")
    .forEach((el) => (el.textContent = ""));
}

function openResultModal(isSuccess, title, text) {
  if (!resultModal) return;
  resultModal.classList.remove("modal--error");
  if (modalTitle) modalTitle.textContent = title;
  if (modalText) modalText.textContent = text;
  if (!isSuccess) resultModal.classList.add("modal--error");
  resultModal.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeResultModal() {
  if (!resultModal) return;
  resultModal.classList.remove("is-open", "modal--error");
  document.body.style.overflow = "";
}

if (joinForm && recruitmentOpen) {
  joinForm.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();

    const requiredFields = [
      "fullName",
      "university",
      "faculty",
      "academicYear",
      "phone",
      "email",
      "council",
    ];

    let hasError = false;

    requiredFields.forEach((id) => {
      const el = document.getElementById(id);
      if (!el || !el.value.trim()) {
        showError(id, "This field is required.");
        hasError = true;
      }
    });

    const emailInput = document.getElementById("email");
    if (emailInput && emailInput.value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        showError("email", "Please enter a valid email address.");
        hasError = true;
      }
    }

    const phoneInput = document.getElementById("phone");
    if (phoneInput && phoneInput.value) {
      const phonePattern = /^[0-9+\-\s]{7,}$/;
      if (!phonePattern.test(phoneInput.value.trim())) {
        showError("phone", "Please enter a valid phone number.");
        hasError = true;
      }
    }

    if (hasError) return;

    const submitBtn = joinForm.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.textContent : "";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Submitting…";
    }

    const formData = new FormData(joinForm);
    const submitUrl = new URL("submit.php", window.location.href).href;

    fetch(submitUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.text())
      .then((text) => {
        let data;
        try {
          data = JSON.parse(text);
        } catch (e) {
          if (!text || text.trim() === "") {
            openResultModal(
              false,
              "Error",
              "Empty response from server. Make sure you run the site with a PHP server (e.g. XAMPP or: php -S localhost:8000 in the project folder)."
            );
          } else {
            openResultModal(
              false,
              "Error",
              "Server did not return valid data. If you use a PHP server, check for PHP errors. Response: " + text.slice(0, 200)
            );
          }
          return;
        }
        if (data.success) {
          joinForm.reset();
          openResultModal(
            true,
            "Application Submitted",
            "Thank you for applying to SBS. Our team will review your application and contact you with the next steps."
          );
        } else {
          openResultModal(
            false,
            "Error",
            data.error || "Something went wrong. Please try again."
          );
        }
      })
      .catch((err) => {
        const msg = err && err.message ? err.message : "";
        const isNetwork = typeof msg === "string" && (msg.toLowerCase().includes("fetch") || msg.toLowerCase().includes("network") || msg.toLowerCase().includes("failed"));
        openResultModal(
          false,
          "Error",
          isNetwork || !msg
            ? "Could not reach the server. Open the site via a PHP server (e.g. php -S localhost:8000 in the project folder), not as a file (file://)."
            : "Error: " + msg
        );
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      });
  });
}

if (modalBackdrop) modalBackdrop.addEventListener("click", closeResultModal);
if (modalClose) modalClose.addEventListener("click", closeResultModal);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && resultModal && resultModal.classList.contains("is-open")) {
    closeResultModal();
  }
});

