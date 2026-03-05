(function () {
  "use strict";

  const form = document.getElementById("riddleForm");
  const input = document.getElementById("riddleInput");
  const submitBtn = document.getElementById("riddleSubmit");
  const errorEl = document.getElementById("riddleError");
  const successEl = document.getElementById("riddleSuccess");

  function setError(msg) {
    errorEl.textContent = msg || "";
  }

  function setSubmitState(disabled) {
    submitBtn.disabled = !!disabled;
  }

  function shakeInput() {
    input.classList.remove("shake");
    void input.offsetWidth;
    input.classList.add("shake");
    setTimeout(function () {
      input.classList.remove("shake");
    }, 500);
  }

  function showSuccess(data) {
    // Build success content dynamically from server response
    successEl.innerHTML = "";

    var title = document.createElement("h2");
    title.className = "section-title";
    title.textContent = data.title;
    successEl.appendChild(title);

    if (data.image) {
      var img = document.createElement("img");
      img.src = data.image;
      img.alt = data.alt || "";
      img.className = "riddle-success-img";
      successEl.appendChild(img);
    }

    var text = document.createElement("p");
    text.className = "riddle-success-text";
    text.setAttribute("dir", "rtl");
    text.textContent = data.text;
    successEl.appendChild(text);

    form.classList.add("is-hidden");
    successEl.classList.add("is-visible");
    successEl.setAttribute("aria-hidden", "false");
    setError("");
  }

  function handleSuccess(data) {
    showSuccess(data);
    setSubmitState(true);
  }

  function handleFailure() {
    setError("Incorrect answer. Try again.");
    shakeInput();
    setSubmitState(false);
  }

  function handleNetworkError() {
    setError("Something went wrong. Please try again.");
    setSubmitState(false);
  }

  function submitAnswer(value) {
    setSubmitState(true);
    setError("");

    fetch("validate-riddle.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answer: value }),
    })
      .then(function (res) {
        if (!res.ok) {
          throw new Error("Request failed");
        }
        return res.json();
      })
      .then(function (data) {
        if (data && data.success === true) {
          handleSuccess(data);
        } else {
          handleFailure();
        }
      })
      .catch(function () {
        handleNetworkError();
      });
  }

  function updateSubmitButton() {
    submitBtn.disabled = !input.value.trim();
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var value = input.value.trim();
    if (!value) return;
    submitAnswer(value);
  });

  input.addEventListener("input", updateSubmitButton);

  updateSubmitButton();

  if (document.getElementById("navbar")) {
    var navbar = document.getElementById("navbar");
    var navToggle = document.getElementById("navToggle");
    var navLinks = document.getElementById("navLinks");

    window.addEventListener("scroll", function () {
      navbar.classList.toggle("navbar--solid", window.scrollY > 20);
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
  }
})();
