document.addEventListener("DOMContentLoaded", () => {
  const trigger = document.querySelector(".dropdown-trigger");
  const menu = document.querySelector(".dropdown-menu");

  if (!trigger || !menu) return;

  let timeoutId = null;

  // Плавное открытие без рывков
  trigger.addEventListener("mouseenter", () => {
    clearTimeout(timeoutId);
    menu.style.display = "flex";
    // Даем браузеру один фрейм на рендеринг display перед анимацией opacity
    requestAnimationFrame(() => {
      menu.style.opacity = "1";
      menu.style.transform = "translateX(-50%) translateY(0)";
      menu.style.pointerEvents = "auto";
    });
  });

  // Умное закрытие с задержкой 200 мс (эстетика Apple/Vercel)
  trigger.addEventListener("mouseleave", () => {
    timeoutId = setTimeout(() => {
      menu.style.opacity = "0";
      menu.style.transform = "translateX(-50%) translateY(10px)";
      menu.style.pointerEvents = "none";

      // Скрываем из DOM после окончания транзишена
      setTimeout(() => {
        if (menu.style.opacity === "0") {
          menu.style.display = "none";
        }
      }, 200);
    }, 200); // Задержка в 200 миллисекунд
  });

  // Предотвращаем закрытие, если мышка находится внутри самого меню
  menu.addEventListener("mouseenter", () => {
    clearTimeout(timeoutId);
  });

  menu.addEventListener("mouseleave", () => {
    trigger.dispatchEvent(new Event("mouseleave"));
  });
});
