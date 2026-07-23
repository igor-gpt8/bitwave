document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(".reveal");

  // Определяем, где сейчас находится прокрутка
  const scrollY = window.scrollY || window.pageYOffset;

  revealElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const elementTopAbsolute = rect.top + scrollY;

    // Если элемент находится ВЫШЕ текущего экрана (пользователь обновил страницу внизу),
    // мы показываем его сразу без анимации, чтобы не ждать ее при скролле вверх.
    if (elementTopAbsolute < scrollY) {
      el.classList.add("revealed");
    }
  });

  // Инициализируем Observer для всех остальных элементов
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        } else {
          // Убираем класс при выходе из зоны видимости (для повторной анимации)
          entry.target.classList.remove("revealed");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px", // Срабатывает чуть раньше
    },
  );

  revealElements.forEach((el) => {
    // Вешаем обсервер только если класс еще не добавлен принудительно выше
    if (!el.classList.contains("revealed")) {
      revealObserver.observe(el);
    }
  });
});
