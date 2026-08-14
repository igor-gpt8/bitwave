document.addEventListener("DOMContentLoaded", async () => {
  await loadNavbar();
  initNavbar();
  initCards();

  document.querySelectorAll('[class*="delay-"]').forEach((element) => {
    const delayClass = Array.from(element.classList).find((cls) =>
      cls.startsWith("delay-"),
    );

    if (delayClass) {
      const ms = delayClass.split("-")[1];
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
  const navbarInner = document.querySelector(".navbar-inner");
  const navLinks = document.querySelectorAll(".nav-link");
  const indicator = document.querySelector(".nav-capsule-indicator");
  const toggle = document.querySelector(".mobile-menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const loginBtn = document.querySelector(".nav-link-auth");
  const registerBtn = document.querySelector(".btn-linear-nav");
  const profileBtn = document.getElementById("nav-profile-btn");

  const mobileLoginBtn = document.querySelector(
    ".mobile-menu-auth .mobile-nav-link[href='login.html']",
  );
  const mobileRegisterBtn = document.querySelector(
    ".mobile-menu-auth .mobile-nav-link[href='register.html']",
  );
  const mobileProfileBtn = document.getElementById("mobile-profile-btn");

  if (currentPage === "profile.html" || currentPage === "personal-info.html") {
    loginBtn?.classList.add("hidden");
    registerBtn?.classList.add("hidden");
    profileBtn?.classList.remove("hidden");

    mobileLoginBtn?.classList.add("hidden");
    mobileRegisterBtn?.classList.add("hidden");
    mobileProfileBtn?.classList.remove("hidden");
  } else {
    loginBtn?.classList.remove("hidden");
    registerBtn?.classList.remove("hidden");
    profileBtn?.classList.add("hidden");

    mobileLoginBtn?.classList.remove("hidden");
    mobileRegisterBtn?.classList.remove("hidden");
    mobileProfileBtn?.classList.add("hidden");
  }

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }
  });

  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  mobileNavLinks.forEach((link) => {
    link.classList.remove("active");

    const href = link.getAttribute("href");

    if (href === currentPage) {
      link.classList.add("active");
    }
  });

  function updateIndicator(element) {
    if (!element || !indicator || !navbarInner) return;

    const elemRect = element.getBoundingClientRect();
    const parentRect = navbarInner.getBoundingClientRect();

    indicator.style.width = `${elemRect.width}px`;
    indicator.style.left = `${elemRect.left - parentRect.left}px`;
    indicator.style.opacity = "1";
  }

  const activeLink = document.querySelector(".nav-link.active");

  if (activeLink) {
    setTimeout(() => updateIndicator(activeLink), 150);
  }

  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      updateIndicator(link);
    });
  });

  if (navbarInner) {
    navbarInner.addEventListener("mouseleave", () => {
      const active = document.querySelector(".nav-link.active");
      if (active) {
        updateIndicator(active);
      } else if (indicator) {
        indicator.style.opacity = "0";
      }
    });
  }

  if (toggle && navbarInner) {
    toggle.addEventListener("click", () => {
      const isOpen = navbarInner.classList.toggle("mobile-open");

      toggle.setAttribute("aria-expanded", isOpen);
      toggle.setAttribute(
        "aria-label",
        isOpen ? "Закрыть меню" : "Открыть меню",
      );

      document.body.classList.toggle("no-scroll", isOpen);
    });
  }
  document.addEventListener("click", (e) => {
    if (!navbarInner || !navbarInner.classList.contains("mobile-open")) {
      return;
    }

    if (!navbarInner.contains(e.target)) {
      navbarInner.classList.remove("mobile-open");

      toggle?.setAttribute("aria-expanded", "false");
      toggle?.setAttribute("aria-label", "Открыть меню");

      document.body.classList.remove("no-scroll");
    }
  });
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
