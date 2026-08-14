const APPS_DATA = {
  ios: {
    recommended: [
      {
        id: "wisp",
        name: "wisp",
        icon: "../media/icons/wisp.webp",
        url: "https://apps.apple.com/ru/app/wisp-vpn-proxy-vless-xray/id6767654269",
      },
      {
        id: "v2ray",
        name: "v2ray",
        icon: "../media/icons/v2ray.webp",
        url: "https://apps.apple.com/ru/app/v2ray-client/id6747379524",
      },
      {
        id: "incy",
        name: "incy",
        icon: "../media/icons/incy.webp",
        url: "https://apps.apple.com/ru/app/incy/id6756943388",
      },
    ],
    alternative: [
      { id: "happ", name: "Happ", icon: "../media/icons/happ.webp", url: "#" },
      {
        id: "hiddify",
        name: "Hiddify",
        icon: "../media/icons/hiddify.webp",
        url: "#",
      },
    ],
  },
  windows: {
    recommended: [
      {
        id: "v2rayn",
        name: "v2rayN",
        icon: "assets/icons/v2rayn.png",
        url: "#",
      },
      {
        id: "nekoray",
        name: "Nekoray",
        icon: "assets/icons/nekoray.png",
        url: "#",
      },
    ],
    alternative: [
      {
        id: "outline",
        name: "Outline",
        icon: "assets/icons/outline.png",
        url: "#",
      },
      {
        id: "flclash",
        name: "Flclash",
        icon: "assets/icons/flclash.png",
        url: "#",
      },
    ],
  },
  macos: {
    recommended: [
      { id: "v2box", name: "V2Box", icon: "assets/icons/v2box.png", url: "#" },
      {
        id: "hiddify",
        name: "Hiddify",
        icon: "assets/icons/Hiddify.png",
        url: "#",
      },
    ],
    alternative: [
      {
        id: "foxray",
        name: "FoXray",
        icon: "assets/icons/foxray.png",
        url: "#",
      },
      {
        id: "streisand",
        name: "Streisand",
        icon: "assets/icons/streisand.png",
        url: "#",
      },
    ],
  },
  android: {
    recommended: [
      {
        id: "v2rayng",
        name: "v2rayNG",
        icon: "assets/icons/v2rayng.png",
        url: "#",
      },
      { id: "happ", name: "Happ", icon: "assets/icons/happ.png", url: "#" },
    ],
    alternative: [
      {
        id: "hiddify",
        name: "Hiddify",
        icon: "assets/icons/Hiddify.png",
        url: "#",
      },
      {
        id: "nekobox",
        name: "NekoBox",
        icon: "assets/icons/nekobox.png",
        url: "#",
      },
    ],
  },
  linux: {
    recommended: [
      {
        id: "nekoray",
        name: "Nekoray",
        icon: "assets/icons/nekoray.png",
        url: "#",
      },
      {
        id: "hiddify",
        name: "Hiddify",
        icon: "assets/icons/Hiddify.png",
        url: "#",
      },
    ],
    alternative: [
      {
        id: "v2raya",
        name: "v2rayA",
        icon: "assets/icons/v2raya.png",
        url: "#",
      },
    ],
  },
};

const DEFAULT_FALLBACK_GUIDE = {
  title: "Инструкция по настройке",
  steps: [
    {
      badge: "Шаг 1",
      title: "Скопируйте ключ подписки",
      desc: 'Нажмите кнопку «Скопировать» в <a href="login.html" class="link">личном кабинете</a>.',
    },
    {
      badge: "Шаг 2",
      title: "Откройте приложение",
      desc: "Запустите установленный клиент на вашем устройстве.",
    },
    {
      badge: "Шаг 3",
      title: "Импортируйте конфигурацию",
      desc: "Найдите кнопку добавления профиля (значок «+» или «Импорт из буфера обмена») и вставьте скопированный ключ.",
    },
    {
      badge: "Шаг 4",
      title: "Подключитесь к серверу",
      desc: "Выберите добавленный профиль из списка и нажмите кнопку подключения (тумблер или «Start»).",
    },
  ],
};

const GUIDES_DATA = {
  ios: {
    happ: {
      stepsCount: 5,
      steps: [
        {
          badge: "Шаг 1",
          title: "Откройте Happ Plus",
          desc: "Запустите приложение Happ Plus на вашем iPhone.",
        },
        {
          badge: "Шаг 2",
          title: "Импортируйте ключ",
          desc: "Скопируйте ключ доступа и нажмите кнопку «Из Буфера» в нижней части экрана.",
        },
        {
          badge: "Шаг 3",
          title: "Разрешите вставку",
          desc: "Приложение запросит доступ к скопированному тексту. Нажмите «Разрешить вставку».",
        },
        {
          badge: "Шаг 4",
          title: "Добавьте конфигурацию",
          desc: "Приложение запросит разрешение на добавление конфигурации VPN. Нажмите «Разрешить» и введите пароль от вашего устройства.",
        },
        {
          badge: "Шаг 5",
          title: "Включите соединение",
          desc: "Выберите нужный сервер из списка и нажмите кнопку подключения по центру экрана. Готово, наслаждайтесь безопасным интернетом!",
        },
      ],
    },
    v2ray: {
      stepsCount: 9,
      steps: [
        {
          badge: "Шаг 1",
          title: "Откройте V2Ray",
          desc: "Запустите приложение V2Ray на вашем iPhone.",
        },
        {
          badge: "Шаг 2",
          title: "Добавьте сервер",
          desc: "На главном экране нажмите кнопку «+ Добавить сервер».",
        },
        {
          badge: "Шаг 3",
          title: "Выберите способ импорта",
          desc: "В появившемся меню снизу выберите пункт «Добавить ключ ссылкой».",
        },
        {
          badge: "Шаг 4",
          title: "Вставьте ключ",
          desc: "Скопируйте ключ доступа и нажмите зеленую кнопку «Вставить» справа от поля ввода.",
        },
        {
          badge: "Шаг 5",
          title: "Подтвердите добавление",
          desc: "Нажмите кнопку «Добавить сервер» под полем ввода.",
        },
        {
          badge: "Шаг 6",
          title: "Завершите импорт",
          desc: "После появления уведомления «Профиль успешно добавлен!» нажмите кнопку «Начать использование».",
        },
        {
          badge: "Шаг 7",
          title: "Добавьте конфигурацию",
          desc: "Приложение запросит разрешение на добавление конфигурации VPN. Нажмите «Разрешить» и введите пароль от вашего устройства.",
        },
        {
          badge: "Шаг 8",
          title: "Выберите сервер",
          desc: "Выберите нужный сервер из списка или оставьте «Auto», затем нажмите на тумблер справа.",
        },
        {
          badge: "Шаг 9",
          title: "Соединение установлено",
          desc: "Убедитесь, что тумблер включился и появился статус «Подключено». Готово, пользуйтесь!",
        },
      ],
    },
    wisp: {
      stepsCount: 5,
      steps: [
        {
          badge: "Шаг 1",
          title: "Откройте Wisp",
          desc: "Запустите приложение Wisp на вашем iPhone.",
        },
        {
          badge: "Шаг 2",
          title: "Добавьте профиль",
          desc: "Скопируйте ключ доступа и нажмите «Вставить из буфера».",
        },
        {
          badge: "Шаг 3",
          title: "Разрешите вставку",
          desc: "Приложение запросит доступ к скопированному тексту. Нажмите «Разрешить вставку».",
        },
        {
          badge: "Шаг 4",
          title: "Добавьте конфигурацию",
          desc: "Приложение запросит разрешение на добавление конфигурации VPN. Нажмите «Разрешить» и введите пароль от вашего устройства.",
        },
        {
          badge: "Шаг 5",
          title: "Активируйте соединение",
          desc: "Нажмите на круг в центре экрана для подключения. Готово, пользуйтесь!",
        },
      ],
    },
    incy: {
      stepsCount: 6,
      steps: [
        {
          badge: "Шаг 1",
          title: "Откройте INCY",
          desc: "Запустите приложение INCY на вашем iPhone или iPad.",
        },
        {
          badge: "Шаг 2",
          title: "Добавьте профиль",
          desc: "Скопируйте ключ в личном кабинете и нажмите «Вставить» в приложении.",
        },
        {
          badge: "Шаг 3",
          title: "Разрешите вставку",
          desc: "Приложение запросит доступ к скопированному тексту. Предоставьте его.",
        },
        {
          badge: "Шаг 4",
          title: "Активируйте соединение",
          desc: "Нажмите кнопку подключения по центру экрана.",
        },
        {
          badge: "Шаг 5",
          title: "Добавьте конфигурацию",
          desc: "Приложение запросит разрешение на добавление конфигурации VPN. Нажмите «Разрешить» и введите пароль от вашего устройства.",
        },
        {
          badge: "Шаг 6",
          title: "Соединение установлено",
          desc: "Убедитесь, что статус сменился на «Подключено». Готово, ваш трафик зашифрован!<br>Чтобы приостановить работу VPN, повторно нажмите на главную кнопку",
        },
      ],
    },
  },
  android: {
    v2rayng: {
      stepsCount: 4,
      steps: [
        {
          badge: "Шаг 1",
          title: "Запустите v2rayNG",
          desc: "Откройте приложение v2rayNG на вашем устройстве Android.",
        },
        {
          badge: "Шаг 2",
          title: "Импорт ключа",
          desc: "Нажмите «+» в верхнем меню и выберите «Импортировать профиль из буфера обмена».",
        },
        {
          badge: "Шаг 3",
          title: "Проверка подключения",
          desc: "Нажмите на три точки и выберите «Проверить подключение».",
        },
        {
          badge: "Шаг 4",
          title: "Запуск",
          desc: "Нажмите на круговую кнопку в правом нижнем углу для подключения.",
        },
      ],
    },
  },
  windows: {
    v2rayn: {
      stepsCount: 4,
      steps: [
        {
          badge: "Шаг 1",
          title: "Откройте v2rayN",
          desc: "Распакуйте архив и запустите v2rayN.exe от имени администратора.",
        },
        {
          badge: "Шаг 2",
          title: "Вставьте ссылку",
          desc: "Нажмите `Ctrl + V` в главном окне программы или добавьте профиль из буфера.",
        },
        {
          badge: "Шаг 3",
          title: "Установите системный прокси",
          desc: "В нижней панели выберите режим «Set system proxy».",
        },
        {
          badge: "Шаг 4",
          title: "Подключитесь",
          desc: "Выберите сервер и нажмите Enter для активации.",
        },
      ],
    },
  },
};

function detectUserOS() {
  const ua = navigator.userAgent.toLowerCase();

  if (
    ua.includes("iphone") ||
    ua.includes("ipad") ||
    (navigator.maxTouchPoints &&
      navigator.maxTouchPoints > 2 &&
      ua.includes("mac"))
  ) {
    return "ios";
  }
  if (ua.includes("android")) return "android";
  if (ua.includes("win")) return "windows";
  if (ua.includes("mac")) return "macos";
  if (ua.includes("linux")) return "linux";

  return "windows";
}

function createCardHtml(app, isAlternative = false) {
  const downloadBtnHtml = isAlternative
    ? ""
    : `<a href="${app.url}" target="_blank" class="app-download-btn">Скачать</a>`;

  return `
    <button class="app-btn" data-app="${app.id}">
      <div class="app-icon">
        <img src="${app.icon}" alt="${app.name}" onerror="this.style.display='none'">
      </div>
      <div class="app-name">${app.name}</div>
      ${downloadBtnHtml}
    </button>
  `;
}

function renderApps(osKey) {
  const container = document.getElementById("configurator-wrapper");
  if (!container) return;

  const data = APPS_DATA[osKey] || APPS_DATA["windows"];

  const recommendedHtml = data.recommended
    .map((app) => createCardHtml(app, false))
    .join("");

  let alternativeHtml = "";

  if (data.alternative && data.alternative.length > 0) {
    const altCardsHtml = data.alternative
      .map((app) => createCardHtml(app, true))
      .join("");

    alternativeHtml = `
      <div class="alternatives-wrapper">
        <h4 class="alternatives-title">Альтернативные клиенты</h4>
        <div class="apps-grid alternatives-grid">
          ${altCardsHtml}
        </div>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="apps-grid" id="apps-grid-${osKey}">
      ${recommendedHtml}
    </div>
    ${alternativeHtml}
  `;
}

function setStep3EmptyState(isEmpty) {
  const step3Section = document.getElementById("step-3-section");
  const guideWrapper = document.getElementById("guide-wrapper");
  const placeholder = document.getElementById("guide-placeholder");
  const finalBlock = document.querySelector(".setup-final");

  if (!step3Section) return;

  step3Section.classList.toggle("step-muted", isEmpty);

  if (guideWrapper) guideWrapper.style.display = isEmpty ? "none" : "block";
  if (placeholder) placeholder.style.display = isEmpty ? "flex" : "none";

  if (finalBlock) {
    finalBlock.style.display = isEmpty ? "none" : "block";
  }
}

function toggleFallbackUI(isFallback) {
  const guideWrapper = document.getElementById("guide-wrapper");
  const phoneMockup = document.querySelector(".guide-phone-mockup");
  const progressBlock = document.querySelector(".stories-progress");

  if (!guideWrapper) return;

  if (isFallback) {
    guideWrapper.classList.add("fallback-mode");
    if (phoneMockup) phoneMockup.style.display = "none";
    if (progressBlock) progressBlock.style.display = "none";
    guideWrapper.style.height = "auto";
  } else {
    guideWrapper.classList.remove("fallback-mode");
    if (phoneMockup) phoneMockup.style.display = "block";
    if (progressBlock) progressBlock.style.display = "flex";
  }
}

function activateFallback(textContainer) {
  setStep3EmptyState(false);
  toggleFallbackUI(true);

  textContainer.innerHTML = "";

  DEFAULT_FALLBACK_GUIDE.steps.forEach((step) => {
    const stepCard = document.createElement("div");
    stepCard.className = "fallback-step-card";

    stepCard.innerHTML = `
    <a href="login.html">
      <span class="step-badge">${step.badge}</span>
      <h3>${step.title}</h3>
      <p>${step.desc}</p>
    </a>
    `;
    textContainer.appendChild(stepCard);
  });
}

function renderGuide(osId, appId) {
  if (!appId || !osId) {
    setStep3EmptyState(true);
    return;
  }

  const imagesContainer = document.getElementById("guide-images-container");
  const textContainer = document.getElementById("guide-text-container");
  const totalStepsEl = document.getElementById("total-steps");
  const currentStepEl = document.getElementById("current-step");
  const pFill = document.getElementById("guide-progress-fill");

  if (!imagesContainer || !textContainer) return;

  const rawGuideData = GUIDES_DATA[osId]?.[appId];
  const hasValidSteps =
    rawGuideData &&
    Array.isArray(rawGuideData.steps) &&
    rawGuideData.steps.length > 1;
  const stepsCount = rawGuideData?.stepsCount || 0;

  if (!hasValidSteps || stepsCount <= 0) {
    activateFallback(textContainer);
    return;
  }

  setStep3EmptyState(false);
  toggleFallbackUI(false);

  imagesContainer.innerHTML = "";
  textContainer.innerHTML = "";

  const steps = rawGuideData.steps;
  let imageLoadErrors = 0;

  for (let i = 1; i <= stepsCount; i++) {
    const imgPath = `../media/guide/${osId}/${appId}/${i}.webp`;

    const tempImg = new Image();
    tempImg.src = imgPath;

    const img = document.createElement("img");
    img.src = imgPath;
    img.className = `step-img ${i === 1 ? "active" : ""}`;
    img.dataset.step = (i - 1).toString();
    img.alt = `Шаг ${i}`;

    img.onerror = function () {
      imageLoadErrors++;
      if (imageLoadErrors >= stepsCount) {
        activateFallback(textContainer);
      }
    };

    imagesContainer.appendChild(img);
  }

  steps.forEach((step, index) => {
    const slide = document.createElement("div");
    slide.className = `text-slide ${index === 0 ? "active" : ""}`;
    slide.dataset.step = index.toString();

    slide.innerHTML = `
      <span class="step-badge">${step.badge || `Шаг ${index + 1}`}</span>
      <h3>${step.title}</h3>
      <p>${step.desc}</p>
    `;
    textContainer.appendChild(slide);
  });

  if (totalStepsEl) totalStepsEl.textContent = steps.length.toString();
  if (currentStepEl) currentStepEl.textContent = "1";
  if (pFill) pFill.style.width = `${(1 / steps.length) * 100}%`;

  initStickyGuide();
}

let scrollListenerRef = null;
let resizeListenerRef = null;

function initStickyGuide() {
  const wrapper = document.getElementById("guide-wrapper");
  if (!wrapper || wrapper.classList.contains("fallback-mode")) return;

  const images = Array.from(wrapper.querySelectorAll(".step-img"));
  const textSlides = wrapper.querySelectorAll(".text-slide");
  const progressFill = wrapper.querySelector(".progress-fill");
  const currentStepEl = document.getElementById("current-step");
  const totalStepsEl = document.getElementById("total-steps");

  const totalSteps = images.length;
  if (totalSteps === 0) return;

  if (totalStepsEl) {
    totalStepsEl.textContent = totalSteps.toString();
  }

  const isMobile = window.innerWidth <= 800;

  if (isMobile) {
    const vhPerStep = 45;
    wrapper.style.height = `${vhPerStep * totalSteps}vh`;
  } else {
    const heightPerStep = 250 / 4;
    wrapper.style.height = `${heightPerStep * totalSteps}vh`;
  }

  let currentActiveIndex = -1;

  let wrapperOffsetTop = 0;
  let maxScroll = 0;

  function updateMetrics() {
    const rect = wrapper.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    wrapperOffsetTop = rect.top + scrollTop;
    maxScroll = wrapper.offsetHeight - window.innerHeight;
  }

  updateMetrics();

  function onScroll() {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    const scrolled = st - wrapperOffsetTop;

    let stepIndex = 0;

    if (maxScroll <= 0) {
      stepIndex = 0;
    } else if (scrolled <= 0) {
      stepIndex = 0;
    } else if (scrolled >= maxScroll) {
      stepIndex = totalSteps - 1;
    } else {
      const progress = scrolled / maxScroll;
      stepIndex = Math.floor(progress * totalSteps);
      if (stepIndex >= totalSteps) stepIndex = totalSteps - 1;
    }

    setActiveStep(stepIndex);
  }

  function setActiveStep(index) {
    if (index === currentActiveIndex) return;

    currentActiveIndex = index;

    images.forEach((img, i) => {
      img.classList.toggle("active", i === index);
    });

    textSlides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });

    if (currentStepEl) currentStepEl.textContent = (index + 1).toString();
    if (progressFill) {
      progressFill.style.width = `${((index + 1) / totalSteps) * 100}%`;
    }
  }

  if (scrollListenerRef) {
    window.removeEventListener("scroll", scrollListenerRef);
    window.removeEventListener("touchmove", scrollListenerRef);
  }
  if (resizeListenerRef) {
    window.removeEventListener("resize", resizeListenerRef);
  }

  let ticking = false;
  scrollListenerRef = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  };

  resizeListenerRef = () => {
    updateMetrics();
    onScroll();
  };

  window.addEventListener("scroll", scrollListenerRef, { passive: true });
  window.addEventListener("touchmove", scrollListenerRef, { passive: true });
  window.addEventListener("resize", resizeListenerRef);

  onScroll();
}

document.addEventListener("DOMContentLoaded", () => {
  const osButtons = document.querySelectorAll(".os-btn");
  const configWrapper = document.getElementById("configurator-wrapper");

  const userOS = detectUserOS();
  const userOsBtn =
    document.querySelector(`.os-btn[data-os="${userOS}"]`) ||
    document.querySelector('.os-btn[data-os="windows"]');

  osButtons.forEach((b) => b.classList.remove("active"));

  if (userOsBtn) {
    userOsBtn.classList.add("user-os", "active");
  }

  renderApps(userOS);
  setStep3EmptyState(true);

  osButtons.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      btn.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      btn.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    });

    btn.addEventListener("click", function () {
      if (this.classList.contains("active")) return;

      osButtons.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      const selectedOS = this.getAttribute("data-os");

      setStep3EmptyState(true);

      if (configWrapper) {
        configWrapper.classList.add("fade-out");
        setTimeout(() => {
          renderApps(selectedOS);
          configWrapper.classList.remove("fade-out");
        }, 300);
      } else {
        renderApps(selectedOS);
      }
    });
  });

  document.addEventListener("click", (e) => {
    const appCard = e.target.closest(".app-btn");
    if (!appCard) return;

    const container = document.getElementById("configurator-wrapper");
    if (container) {
      container
        .querySelectorAll(".app-btn")
        .forEach((c) => c.classList.remove("active"));
    }
    appCard.classList.add("active");

    const appId = appCard.dataset.app;
    const activeOsBtn = document.querySelector(".os-btn.active");
    const osId = activeOsBtn ? activeOsBtn.dataset.os : userOS;

    renderGuide(osId, appId);
  });
});
