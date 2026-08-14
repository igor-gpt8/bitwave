document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(".reveal");

  const scrollY = window.scrollY || window.pageYOffset;

  revealElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const elementTopAbsolute = rect.top + scrollY;

    if (elementTopAbsolute < scrollY) {
      el.classList.add("revealed");
    }
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        } else {
          entry.target.classList.remove("revealed");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  revealElements.forEach((el) => {
    if (!el.classList.contains("revealed")) {
      revealObserver.observe(el);
    }
  });
});
