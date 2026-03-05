(function () {
  "use strict";

  // ============ Navbar behavior ============
  var navbar = document.getElementById("navbar");
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 20) {
      navbar.classList.add("navbar--solid");
    } else {
      navbar.classList.remove("navbar--solid");
    }
  });

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      navToggle.classList.toggle("active");
      navLinks.classList.toggle("open");
    });

    navLinks.addEventListener("click", function (e) {
      if (e.target.classList.contains("nav-link")) {
        navToggle.classList.remove("active");
        navLinks.classList.remove("open");
      }
    });
  }

  // ============ Smooth scroll for same-page anchors ============
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var targetId = this.getAttribute("href").slice(1);
      if (!targetId) return;
      var target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ============ Tabs: Committees / Councils ============
  var tabs = document.querySelectorAll(".program-tab");
  var panels = document.querySelectorAll("section[data-panel]");

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var target = tab.getAttribute("data-target");
      if (!target) return;

      tabs.forEach(function (t) {
        t.classList.remove("program-tab--active");
      });
      tab.classList.add("program-tab--active");

      panels.forEach(function (panel) {
        if (panel.getAttribute("data-panel") === target) {
          panel.classList.remove("is-hidden");
        } else {
          panel.classList.add("is-hidden");
        }
      });
    });
  });

  // ============ Fade-on-scroll animations ============
  var fadeElements = document.querySelectorAll(".fade-on-scroll");

  if ("IntersectionObserver" in window && fadeElements.length) {
    var fadeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    fadeElements.forEach(function (el) {
      fadeObserver.observe(el);
    });
  } else {
    fadeElements.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();

