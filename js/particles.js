class ParticlesBackground {
  constructor() {
    this.canvas = document.getElementById("particles-canvas");
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 180 };

    // Считываем CSS-переменные
    this.loadColorsFromCSS();

    this.init();
    this.animate();

    window.addEventListener("resize", () => this.resize());
    window.addEventListener("mousemove", (e) => this.mouseMove(e));
    window.addEventListener("mouseleave", () => this.mouseLeave());

    // На случай, если на сайте динамически меняется тема (dark/light)
    window.addEventListener("themechange", () => this.loadColorsFromCSS());
  }

  // Метод получения цветов из стилей документа
  loadColorsFromCSS() {
    const rootStyles = getComputedStyle(document.documentElement);

    // Получаем RGB компоненты (убираем лишние пробелы)
    this.colorAccentRGB =
      rootStyles.getPropertyValue("--accent-particles-rgb").trim() ||
      "0, 113, 227";
    this.colorTextRGB =
      rootStyles.getPropertyValue("--text-primary-rgb").trim() ||
      "255, 255, 255";

    // Получаем чистый HEX/строковый цвет для эффекта свечения (shadowColor)
    this.colorAccent =
      rootStyles.getPropertyValue("--accent-particles").trim() || "#0071e3";
  }

  init() {
    this.resize();
    this.createParticles();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    const count = Math.min(
      80,
      Math.floor((window.innerWidth * window.innerHeight) / 20000),
    );
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2 + 1.2,
      });
    }
  }

  mouseMove(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }

  mouseLeave() {
    this.mouse.x = null;
    this.mouse.y = null;
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Сначала рисуем связи
    this.drawConnections();

    // Затем рисуем точки поверх связей
    this.particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

      if (this.mouse.x !== null) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.mouse.radius) {
          const pull = 1 - dist / this.mouse.radius;
          // Используем переменную основного текста для цвета частиц
          this.ctx.fillStyle = `rgba(${this.colorTextRGB}, ${0.25 + pull * 0.45})`;
          this.ctx.shadowBlur = pull * 8;
          this.ctx.shadowColor = this.colorAccent;
        } else {
          this.ctx.fillStyle = `rgba(${this.colorTextRGB}, 0.25)`;
          this.ctx.shadowBlur = 0;
        }
      } else {
        this.ctx.fillStyle = `rgba(${this.colorTextRGB}, 0.25)`;
        this.ctx.shadowBlur = 0;
      }

      this.ctx.fill();
    });

    this.ctx.shadowBlur = 0;
    requestAnimationFrame(() => this.animate());
  }

  drawConnections() {
    const maxDist = 135;

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];

        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          let alpha = (1 - dist / maxDist) * 0.15;
          let lineWidth = 0.8;
          let useGlow = false;
          let glowIntensity = 0;

          if (this.mouse.x !== null) {
            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2;

            const mdx = midX - this.mouse.x;
            const mdy = midY - this.mouse.y;
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

            if (mdist < this.mouse.radius) {
              glowIntensity = 1 - mdist / this.mouse.radius;
              alpha += glowIntensity * 0.45;
              lineWidth += glowIntensity * 0.6;
              useGlow = true;
            }
          }

          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);

          this.ctx.strokeStyle = `rgba(${this.colorAccentRGB}, ${alpha})`;
          this.ctx.lineWidth = lineWidth;

          if (useGlow) {
            this.ctx.shadowBlur = glowIntensity * 12;
            this.ctx.shadowColor = this.colorAccent;
          } else {
            this.ctx.shadowBlur = 0;
          }

          this.ctx.stroke();
        }
      }
    }
    this.ctx.shadowBlur = 0;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new ParticlesBackground();
});
