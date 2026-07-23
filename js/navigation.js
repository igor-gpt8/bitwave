document.addEventListener("DOMContentLoaded", async () => {
  await loadNavbar();
  initNavbar();
  initCards();

  // Находим вообще все элементы с классом, начинающимся на "delay-"
  document.querySelectorAll('[class*="delay-"]').forEach((element) => {
    // Ищем в списке классов именно тот, который содержит delay-
    const delayClass = Array.from(element.classList).find((cls) =>
      cls.startsWith("delay-"),
    );

    if (delayClass) {
      // Вытаскиваем число (например, из "delay-250" получим "250")
      const ms = delayClass.split("-")[1];
      // Нативно вешаем задержку
      element.style.transitionDelay = `${ms}ms`;
      element.style.animationDelay = `${ms}ms`;
    }
  });
});

async function loadNavbar() {
  try {
    const response = await fetch("../html/navbar.html");
    if (!response.ok) {
      throw new Error("Не удалось загрузить navbar.");
    }
    document.getElementById("navbar").innerHTML = await response.text();
  } catch (err) {
    console.error(err);
  }
}

function initNavbar() {
  const navLinks = document.querySelectorAll(".nav-links .nav-link");
  const indicator = document.querySelector(".nav-capsule-indicator");
  const toggle = document.querySelector(".mobile-menu-toggle");
  const overlay = document.querySelector(".mobile-overlay");

  // Определяем текущую страницу
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  // Удаляем active у всех ссылок
  navLinks.forEach((link) => link.classList.remove("active"));

  // Назначаем active нужной
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");

    if (href === currentPage) {
      link.classList.add("active");
    }
  });

  function updateIndicator(element) {
    if (!element || !indicator) return;

    const rect = element.getBoundingClientRect();
    const parentRect =
      element.parentElement.parentElement.getBoundingClientRect();

    indicator.style.width = `${rect.width}px`;
    indicator.style.left = `${rect.left - parentRect.left}px`;
    indicator.style.opacity = "1";
  }

  const activeLink = document.querySelector(".nav-links .nav-link.active");

  if (activeLink) {
    setTimeout(() => updateIndicator(activeLink), 150);
  }

  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      updateIndicator(link);
    });
  });

  const navLinksContainer = document.querySelector(".nav-links");

  if (navLinksContainer) {
    navLinksContainer.addEventListener("mouseleave", () => {
      const active = document.querySelector(".nav-links .nav-link.active");

      if (active) {
        updateIndicator(active);
      } else if (indicator) {
        indicator.style.opacity = "0";
      }
    });
  }

  if (toggle && overlay) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("active");
      overlay.classList.toggle("active");
      document.body.classList.toggle("no-scroll");
    });
  }
}

function initCards() {
  document.querySelectorAll(".feature-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    });
  });
}
