document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth < 1024) {
    return;
  }

  const sidebar = document.querySelector(".resources-sidebar");
  const indicator = document.getElementById("sidebar-indicator");
  const allLinks = document.querySelectorAll(".sidebar-link, .sidebar-sublink");
  const targets = document.querySelectorAll(".resources-content [id]");
  const sidebarItems = document.querySelectorAll(".sidebar-item");

  const NAVBAR_OFFSET = 140;

  let isClickScrolling = false;
  let activeLink = null;
  let currentActiveSectionId = null;
  let ticking = false;

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  function moveIndicator() {
    if (!indicator) return;

    const active = document.querySelector(
      ".sidebar-link.active, .sidebar-sublink.active",
    );
    if (!active) return;

    indicator.style.opacity = "1";
    indicator.style.transform = `translateY(${active.offsetTop}px)`;
    indicator.style.height = `${active.offsetHeight}px`;
  }

  const indicatorObserver = new MutationObserver(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(moveIndicator);
    });
  });

  allLinks.forEach((link) => {
    indicatorObserver.observe(link, {
      attributes: true,
      attributeFilter: ["class"],
    });
  });

  function setActiveLink(targetLink) {
    if (activeLink) activeLink.classList.remove("active");
    targetLink.classList.add("active");
    activeLink = targetLink;
  }

  function expandSidebar(targetLink) {
    const currentItem = targetLink.closest(".sidebar-item");

    sidebarItems.forEach((item) => {
      item.classList.toggle("open", item === currentItem);
    });
  }

  function centerSidebar(targetLink, isSmooth = true) {
    if (!sidebar || !targetLink) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const targetScrollTop =
          targetLink.offsetTop -
          sidebar.clientHeight / 2 +
          targetLink.clientHeight / 2;

        sidebar.scrollTo({
          top: targetScrollTop,
          behavior: isSmooth ? "smooth" : "auto",
        });
      });
    });
  }

  function handleMenuStateChange(targetLink, isFromClick = false) {
    if (!targetLink) return;

    setActiveLink(targetLink);
    expandSidebar(targetLink);
    centerSidebar(targetLink, !isFromClick);
  }

  function updateActiveSection() {
    if (isClickScrolling || !targets.length) return;

    let bestSection = null;
    let minDistance = Infinity;

    targets.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const distance = Math.abs(rect.top - NAVBAR_OFFSET);

      if (distance < minDistance) {
        minDistance = distance;
        bestSection = section;
      }
    });

    if (bestSection && bestSection.id !== currentActiveSectionId) {
      currentActiveSectionId = bestSection.id;
      const correspondingLink = document.querySelector(
        `[href="#${bestSection.id}"]`,
      );
      if (correspondingLink) {
        handleMenuStateChange(correspondingLink);
      }
    }
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      updateActiveSection();
      ticking = false;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  updateActiveSection();

  const initialActive = document.querySelector(
    ".sidebar-link.active, .sidebar-sublink.active",
  );
  if (initialActive) {
    handleMenuStateChange(initialActive, false);
    moveIndicator();
  }

  allLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (!targetElement) return;

      isClickScrolling = true;
      handleMenuStateChange(link, true);

      const targetScrollTop =
        targetElement.getBoundingClientRect().top +
        window.scrollY -
        NAVBAR_OFFSET;

      window.scrollTo({
        top: targetScrollTop,
        behavior: "smooth",
      });

      const finalizeClickScroll = () => {
        isClickScrolling = false;
        updateActiveSection();
      };

      if ("onscrollend" in window) {
        window.addEventListener("scrollend", finalizeClickScroll, {
          once: true,
        });
      } else {
        let timer;
        const fallback = () => {
          clearTimeout(timer);
          timer = setTimeout(() => {
            finalizeClickScroll();
            window.removeEventListener("scroll", fallback);
          }, 180);
        };
        window.addEventListener("scroll", fallback);
      }
    });
  });

  window.addEventListener("resize", () => {
    moveIndicator();
    if (activeLink) centerSidebar(activeLink, false);
  });
});
