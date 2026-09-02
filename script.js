/* Dominion Barber Shop — interactions */
(function () {
  "use strict";

  // Current year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Sticky nav shadow + mobile toggle
  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");
  var mobile = document.getElementById("navMobile");

  window.addEventListener(
    "scroll",
    function () {
      if (!nav) return;
      nav.classList.toggle("scrolled", window.scrollY > 12);
    },
    { passive: true }
  );

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  if (mobile) {
    mobile.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Highlight today's hours
  var today = new Date().getDay(); // 0 = Sun
  var todayLi = document.querySelector('.hours li[data-day="' + today + '"]');
  if (todayLi) todayLi.classList.add("is-today");

  // Scroll reveal
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (el, i) {
      // gentle stagger for grouped items
      el.style.transitionDelay = (i % 4) * 70 + "ms";
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("in");
    });
  }
})();
