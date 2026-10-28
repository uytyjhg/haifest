// HAIFEST — cuenta atrás y menú móvil
(() => {
  "use strict";

  // El evento termina al comenzar el 14 de julio de 2027, en hora peninsular española.
  // En julio España usa CEST (UTC+2), por eso se indica +02:00 explícitamente.
  const targetDate = new Date("2027-07-14T00:00:00+02:00").getTime();
  const fields = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds")
  };

  const pad = (number, length = 2) => String(number).padStart(length, "0");

  function updateCountdown() {
    const remaining = Math.max(0, targetDate - Date.now());
    const totalSeconds = Math.floor(remaining / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    fields.days.textContent = pad(days, 3);
    fields.hours.textContent = pad(hours);
    fields.minutes.textContent = pad(minutes);
    fields.seconds.textContent = pad(seconds);

    if (remaining === 0) {
      document.querySelector(".countdown").setAttribute("aria-label", "HAIFEST comienza hoy");
    }
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  const menuButton = document.querySelector(".menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  menuButton.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  });

  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Abrir menú");
    });
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
