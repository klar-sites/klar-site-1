(function () {
  var root = document.documentElement;
  var storedTheme = null;

  try {
    storedTheme = window.localStorage.getItem("theme");
  } catch (error) {
    storedTheme = null;
  }

  if (storedTheme === "dark") {
    root.classList.add("dark");
  }

  document.querySelectorAll('[aria-label="Toggle theme"]').forEach(function (button) {
    button.addEventListener("click", function () {
      var isDark = root.classList.toggle("dark");

      try {
        window.localStorage.setItem("theme", isDark ? "dark" : "light");
      } catch (error) {
        /* localStorage may be unavailable; the visual toggle still works. */
      }
    });
  });

  document.querySelectorAll(".mobile-toggle").forEach(function (button) {
    var navId = button.getAttribute("aria-controls");
    var nav = navId ? document.getElementById(navId) : null;

    if (!nav) {
      return;
    }

    button.addEventListener("click", function () {
      var isOpen = button.getAttribute("aria-expanded") === "true";

      button.setAttribute("aria-expanded", String(!isOpen));
      button.setAttribute("aria-label", isOpen ? "Öppna meny" : "Stäng meny");
      nav.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("nav-open", !isOpen);
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-label", "Öppna meny");
        nav.classList.remove("is-open");
        document.body.classList.remove("nav-open");
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") {
        return;
      }

      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Öppna meny");
      nav.classList.remove("is-open");
      document.body.classList.remove("nav-open");
    });
  });

  document.querySelectorAll(".faq-question").forEach(function (button) {
    button.addEventListener("click", function () {
      var item = button.closest(".faq-item");

      if (!item) {
        return;
      }

      var isExpanded = button.getAttribute("aria-expanded") === "true";

      item.classList.toggle("is-open", !isExpanded);
      button.setAttribute("aria-expanded", String(!isExpanded));
    });
  });

  document.querySelectorAll('form[action="#"]').forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
      var originalText = submitButton ? submitButton.textContent : "";

      if (submitButton) {
        submitButton.textContent = "Tack, vi återkommer snart";
        submitButton.setAttribute("disabled", "disabled");
      }

      var existingNote = form.querySelector("[data-form-status]");
      if (existingNote) {
        existingNote.remove();
      }

      var status = document.createElement("p");
      status.className = "form-note";
      status.setAttribute("data-form-status", "success");
      status.setAttribute("role", "status");
      status.textContent = "Din förfrågan är mottagen i denna demo. I skarp miljö kopplas formuläret till klinikens bokningssystem.";
      form.appendChild(status);

      window.setTimeout(function () {
        if (submitButton) {
          submitButton.textContent = originalText;
          submitButton.removeAttribute("disabled");
        }
      }, 4500);
    });
  });
})();
