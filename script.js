/*
 * GridBridge Power — site script
 *
 * TODO (John): replace the placeholder below with the real contact email.
 * This is the ONLY place the email address is set. The contact form and the
 * "Prefer email?" link both use it.
 */
var CONTACT_EMAIL = "info@example.com"; // PLACEHOLDER: not a real address

(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Contact email link ---------- */
  document.querySelectorAll(".js-contact-email").forEach(function (link) {
    link.href = "mailto:" + CONTACT_EMAIL;
    link.textContent = CONTACT_EMAIL;
  });

  /* ---------- Mobile navigation ---------- */
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");
  var mobileQuery = window.matchMedia("(max-width: 1180px)");

  function setMenu(open) {
    if (!nav || !toggle || !menu) return;
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.inert = mobileQuery.matches && !open;
  }

  if (nav && toggle && menu) {
    setMenu(false);
    toggle.addEventListener("click", function () {
      setMenu(!nav.classList.contains("is-open"));
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setMenu(false);
        toggle.focus();
      }
    });
    document.addEventListener("click", function (event) {
      if (nav.classList.contains("is-open") && !nav.contains(event.target)) setMenu(false);
    });
    mobileQuery.addEventListener("change", function () { setMenu(false); });
  }

  /* ---------- Contact form (opens the visitor's email app) ---------- */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var status = document.getElementById("form-status");
      var fields = ["name", "company", "email", "phone", "role", "location", "message"];
      var v = {};
      fields.forEach(function (id) {
        var el = document.getElementById(id);
        v[id] = el ? el.value.trim() : "";
      });

      var invalid = [];
      ["name", "email", "message"].forEach(function (id) {
        var el = document.getElementById(id);
        var bad = !v[id] || (id === "email" && !el.checkValidity());
        el.setAttribute("aria-invalid", bad ? "true" : "false");
        if (bad) invalid.push(el);
      });
      if (invalid.length) {
        status.textContent = "Please fill in your name, a valid email, and a short message.";
        status.classList.add("is-error");
        invalid[0].focus();
        return;
      }
      status.classList.remove("is-error");

      var body = [
        "Name: " + v.name,
        "Company: " + (v.company || "Not provided"),
        "Email: " + v.email,
        "Phone: " + (v.phone || "Not provided"),
        "I am a: " + (v.role || "Not provided"),
        "Project or site location: " + (v.location || "Not provided"),
        "",
        v.message
      ].join("\n");

      status.textContent = "Opening your email app with a pre-filled message to " + CONTACT_EMAIL + ".";
      window.location.href = "mailto:" + CONTACT_EMAIL +
        "?subject=" + encodeURIComponent("GridBridge Power inquiry" + (v.role ? " (" + v.role + ")" : "") + (v.company ? " from " + v.company : "")) +
        "&body=" + encodeURIComponent(body);
    });
  }

  /* ---------- Reveal on scroll (skipped for reduced motion) ---------- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealTargets = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -32px 0px" });
    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Highlight current section in the nav ---------- */
  var sectionLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-menu a[href^="#"]'))
    .filter(function (link) { return !link.classList.contains("nav-cta"); });
  var sections = sectionLinks.map(function (link) {
    return document.querySelector(link.getAttribute("href"));
  }).filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        sectionLinks.forEach(function (link) {
          if (link.getAttribute("href") === "#" + entry.target.id) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });
    sections.forEach(function (section) { sectionObserver.observe(section); });
  }
})();
