document.addEventListener("DOMContentLoaded", () => {
  const trigger = document.querySelector(".dropdown-trigger");
  const menu = document.querySelector(".dropdown-menu");

  if (!trigger || !menu) return;

  let timeoutId = null;

  trigger.addEventListener("mouseenter", () => {
    clearTimeout(timeoutId);
    menu.style.display = "flex";
    requestAnimationFrame(() => {
      menu.style.opacity = "1";
      menu.style.transform = "translateX(-50%) translateY(0)";
      menu.style.pointerEvents = "auto";
    });
  });

  trigger.addEventListener("mouseleave", () => {
    timeoutId = setTimeout(() => {
      menu.style.opacity = "0";
      menu.style.transform = "translateX(-50%) translateY(10px)";
      menu.style.pointerEvents = "none";

      setTimeout(() => {
        if (menu.style.opacity === "0") {
          menu.style.display = "none";
        }
      }, 200);
    }, 200);
  });

  menu.addEventListener("mouseenter", () => {
    clearTimeout(timeoutId);
  });

  menu.addEventListener("mouseleave", () => {
    trigger.dispatchEvent(new Event("mouseleave"));
  });
});
