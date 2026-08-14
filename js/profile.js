const PROFILE_DATA = {
  user: {
    name: "Иван Иванов",
    email: "name@example.com",
    key: "https://sub_mokat/kdB8",
  },
  subscription: {
    status: "active",
    statusText: "активна",
    expiresAt: "24 сентября 2026",
    devices: {
      limit: 5,
    },
    traffic: {
      value: "не установлен",
    },
  },
  devices: [
    {
      ip: "185.220.101.4",
      status: "online",
      statusText: "активное соединение",
    },
    {
      ip: "92.255.85.12",
      status: "offline",
      statusText: "В сети: вчера в 21:40",
    },
    {
      ip: "46.17.40.89",
      status: "offline",
      statusText: "В сети: 3 дня назад",
    },
  ],
  settings: {
    showIp: true,
    twoFactorAuth: false,
  },
  support: {
    telegram: "https://t.me/b1twave_bot",
    email: "dev.pevnev@gmail.com",
  },
};

function escapeHTML(value) {
  if (value === null || value === undefined) {
    return "";
  }
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getCurrentPage() {
  const hash = window.location.hash;
  if (hash === "#profile") {
    return "profile";
  }
  return "subscription";
}

function ensureHash() {
  if (!window.location.hash) {
    history.replaceState(null, "", "#subscription");
  }
}

function getDevicesCount() {
  return PROFILE_DATA.devices.length;
}

function iconProfile() {
  return `
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
  `;
}

function iconEdit() {
  return `
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
  `;
}

function iconHelp() {
  return `
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
  `;
}

function iconTelegram() {
  return `
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
  `;
}

function iconMail() {
  return `
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
  `;
}

function iconGlobe() {
  return `
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
  `;
}

function iconCrown() {
  return `
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M2 4l3 12h14l3-12-6 7-4-5-4 5-6-7z"></path>
  </svg>
  `;
}

function iconCalendar() {
  return `
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="3" y="4" width="18" height="18" rx="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
  `;
}

function iconCopy() {
  return `
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="9" y="9" width="13" height="13" rx="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
  `;
}

function iconLogout() {
  return `
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
  `;
}

function renderSidebar() {
  const container = document.getElementById("dashboard-sidebar");
  if (!container) return;
  const currentPage = getCurrentPage();
  container.innerHTML = `
    <span class="sidebar-title">РАЗДЕЛЫ</span>
    <div class="sidebar-nav-wrapper">
      <div class="sidebar-item">
        <a href="#subscription" class="sidebar-link ${currentPage === "subscription" ? "active" : ""}">
          ${iconProfile()} О подписке
        </a>
      </div>
      <div class="sidebar-item">
        <a href="#profile" class="sidebar-link ${currentPage === "profile" ? "active" : ""}">
          ${iconEdit()} Профиль
        </a>
      </div>
    </div>
    <div class="sidebar-help-card">
      <div class="help-header">
        ${iconHelp()}
        <span>Нужна помощь?</span>
      </div>
      <p class="help-desc">Свяжитесь с нами в Telegram или по e-mail.</p>
      <a href="${escapeHTML(PROFILE_DATA.support.telegram)}" class="btn-help-link" target="_blank" rel="noopener noreferrer">
        ${iconTelegram()} Написать в Telegram
      </a>
      <a href="mailto:${escapeHTML(PROFILE_DATA.support.email)}" class="btn-help-link">
        ${iconMail()} ${escapeHTML(PROFILE_DATA.support.email)}
      </a>
    </div>
  `;
}

function renderWelcomeCard() {
  const user = PROFILE_DATA.user;
  const devices = PROFILE_DATA.devices;
  const limit = PROFILE_DATA.subscription.devices.limit;
  const showIp = PROFILE_DATA.settings.showIp;
  return `
    <div class="profile-card welcome-card">
      <h2 class="welcome-title">
        Добро пожаловать, <span>${escapeHTML(user.name)}</span>
      </h2>
      <div class="key-section">
        <label class="field-label">Ваш ключ:</label>
        <div class="input-copy-group">
          <input type="text" id="user-key" readonly value="${escapeHTML(user.key)}">
          <button class="btn-copy" type="button" id="copy-key-button">
            <span class="btn-text">Копировать</span>
            ${iconCopy()}
          </button>
        </div>
      </div>
      <div class="devices-divider-section">
        <div class="info-row-flex">
          <span>Ваши устройства</span>
          <strong>${devices.length} / ${limit}</strong>
        </div>
        <div class="toggle-row">
          <label class="switch-container">
            <input type="checkbox" id="toggle-name-detection" ${showIp ? "checked" : ""}>
            <span class="switch-slider"></span>
          </label>
          <span class="toggle-label">Включить отображение IP адресов</span>
          <a href="resources.html#sec-ip">
            <span class="tooltip-icon" title="Перейти в раздел ответов на вопросы">?</span>
          </a>
        </div>
      </div>
    </div>
  `;
}

function renderSubscriptionCard() {
  const subscription = PROFILE_DATA.subscription;
  const statusClass = subscription.status === "active" ? "badge-active" : "";
  return `
    <div class="profile-card subscription-card">
      <div class="sub-header">
        <div class="sub-title-group">
          <div class="crown-icon">${iconCrown()}</div>
          <h3>Ваша подписка</h3>
        </div>
        <div class="sub-actions">
          <span class="${statusClass}">${escapeHTML(subscription.statusText)}</span>
        </div>
      </div>
      <div class="sub-period">
        <span class="field-label">Срок действия:</span>
        <div class="sub-period-row">
          <div class="date-display">
            <strong>${escapeHTML(subscription.expiresAt)}</strong>
            ${iconCalendar()}
          </div>
        </div>
      </div>
      <div class="sub-metrics">
        <div class="metric-item">
          <span class="field-label">Лимит устройств</span>
          <div class="metric-value green-text">${PROFILE_DATA.devices.length} / ${subscription.devices.limit}</div>
          <a href="#" class="metric-link" data-action="change-devices">Изменить</a>
        </div>
        <div class="metric-item">
          <span class="field-label">Лимит трафика</span>
          <div class="metric-value">${escapeHTML(subscription.traffic.value)}</div>
          <a href="#" class="metric-link" data-action="change-traffic">Изменить</a>
        </div>
      </div>
    </div>
  `;
}

function renderDevice(device, index) {
  const isOnline = device.status === "online";
  return `
    <div class="device-card-row" data-device-index="${index}">
      <div class="device-left-group">
        <div class="device-icon">${iconGlobe()}</div>
        <div class="device-info">
          <strong class="device-name">${escapeHTML(device.ip)}</strong>
          ${
            isOnline
              ? `<div class="status-online"><span class="dot"></span>${escapeHTML(device.statusText)}</div>`
              : `<div class="status-offline">${escapeHTML(device.statusText)}</div>`
          }
        </div>
      </div>
      <button class="btn-disconnect" type="button" data-action="disconnect" data-device-index="${index}">
        Отключить
      </button>
    </div>
  `;
}

function renderDevices() {
  const devices = PROFILE_DATA.devices;
  return `
    <div class="devices-section">
      <h3 class="section-title">Подключенные устройства</h3>
      <div class="devices-list">
        ${
          devices.length
            ? devices
                .map((device, index) => renderDevice(device, index))
                .join("")
            : `<div class="device-card-row"><span class="status-offline">Нет подключенных устройств</span></div>`
        }
      </div>
    </div>
  `;
}

function renderLogoutCard() {
  return `
    <div class="logout-card" data-action="logout">
      <div class="logout-icon-box">${iconLogout()}</div>
      <div class="logout-info">
        <h4>Выйти из системы</h4>
        <p>Завершить текущую сессию.</p>
      </div>
      <div class="logout-arrow">›</div>
    </div>
  `;
}

function renderSubscriptionPage() {
  const container = document.getElementById("dashboard-content");
  if (!container) return;

  container.innerHTML = `
    <div class="dashboard-main-grid">
      <div class="content-col">
        ${renderWelcomeCard()}
        ${renderSubscriptionCard()}
      </div>
      <div class="content-col">
        ${renderDevices()}
        ${renderLogoutCard()}
      </div>
    </div>
  `;

  bindSubscriptionEvents();
}

function renderProfilePage() {
  const container = document.getElementById("dashboard-content");
  if (!container) return;

  const user = PROFILE_DATA.user;
  const settings = PROFILE_DATA.settings;

  container.innerHTML = `
    <div class="content-col">
      <div class="profile-card profile-card-wide">
        <div class="profile-header-banner" style="margin-bottom: 32px;">
          <h2 class="welcome-title" style="margin: 0;">Настройки профиля</h2>
        </div>
        <div class="profile-field-row" style="margin-bottom: 24px;">
          <span class="field-label" style="margin-bottom: 8px;">Имя</span>
          <div class="input-copy-group" style="align-items: center; margin-bottom: 0;">
            <input type="text" value="${escapeHTML(user.name)}" readonly style="font-family: inherit;">
            <button class="btn-copy" type="button" data-action="edit-name" style="border: none; background: transparent; color: var(--neon-green);">
              Изменить
            </button>
          </div>
        </div>
        <div class="profile-field-row" style="margin-bottom: 28px;">
          <span class="field-label" style="margin-bottom: 8px;">Почта</span>
          <div class="input-copy-group" style="margin-bottom: 0;">
            <input type="text" value="${escapeHTML(user.email)}" readonly style="font-family: inherit;">
          </div>
        </div>
        <div style="margin-bottom: 28px;">
          <button class="btn-freeze" type="button" data-action="change-password" style="width: 100%; padding: 12px; font-size: 14px; font-weight: 500; text-align: center;">
            Изменить пароль
          </button>
        </div>
        <div class="toggle-row" style="border-top: 1px solid rgba(255, 255, 255, 0.05); margin-top: 0; padding-top: 20px;">
          <label class="switch-container">
            <input type="checkbox" id="toggle-2fa" ${settings.twoFactorAuth ? "checked" : ""}>
            <span class="switch-slider"></span>
          </label>
          <span class="toggle-label" style="font-weight: 500;">Двухфакторная аутентификация (2FA)</span>
        </div>
      </div>
    </div>
  `;

  bindProfileEvents();
}

function bindSubscriptionEvents() {
  const copyButton = document.getElementById("copy-key-button");
  if (copyButton) {
    copyButton.addEventListener("click", () => {
      copyUserKey(copyButton);
    });
  }

  const ipToggle = document.getElementById("toggle-name-detection");
  if (ipToggle) {
    ipToggle.addEventListener("change", () => {
      PROFILE_DATA.settings.showIp = ipToggle.checked;
    });
  }

  document.querySelectorAll('[data-action="disconnect"]').forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.deviceIndex);
      disconnectDevice(index);
    });
  });

  const logout = document.querySelector('[data-action="logout"]');
  if (logout) {
    logout.addEventListener("click", handleLogout);
  }

  const changeDevices = document.querySelector(
    '[data-action="change-devices"]',
  );
  if (changeDevices) {
    changeDevices.addEventListener("click", (event) => {
      event.preventDefault();
      alert("Здесь будет изменение лимита устройств.");
    });
  }

  const changeTraffic = document.querySelector(
    '[data-action="change-traffic"]',
  );
  if (changeTraffic) {
    changeTraffic.addEventListener("click", (event) => {
      event.preventDefault();
      alert("Здесь будет изменение лимита трафика.");
    });
  }
}

function bindProfileEvents() {
  const twoFactorToggle = document.getElementById("toggle-2fa");
  if (twoFactorToggle) {
    twoFactorToggle.addEventListener("change", () => {
      PROFILE_DATA.settings.twoFactorAuth = twoFactorToggle.checked;
    });
  }

  const editName = document.querySelector('[data-action="edit-name"]');
  if (editName) {
    editName.addEventListener("click", () => {
      alert("Здесь будет изменение имени.");
    });
  }

  const changePassword = document.querySelector(
    '[data-action="change-password"]',
  );
  if (changePassword) {
    changePassword.addEventListener("click", () => {
      alert("Здесь будет изменение пароля.");
    });
  }
}

async function copyUserKey(button) {
  const input = document.getElementById("user-key");
  if (!input) return;

  try {
    await navigator.clipboard.writeText(input.value);
    const textSpan = button.querySelector(".btn-text");
    if (!textSpan) return;

    textSpan.classList.add("fade-out");
    button.classList.add("copied");

    setTimeout(() => {
      textSpan.textContent = "Скопировано!";
      textSpan.classList.remove("fade-out");
      textSpan.classList.add("fade-in");
    }, 200);

    setTimeout(() => {
      textSpan.classList.add("fade-out");
      setTimeout(() => {
        textSpan.textContent = "Копировать";
        button.classList.remove("copied");
        textSpan.classList.remove("fade-out");
        textSpan.classList.add("fade-in");
      }, 200);
    }, 2000);
  } catch (error) {
    console.error("Не удалось скопировать ключ:", error);
  }
}

function disconnectDevice(index) {
  const device = PROFILE_DATA.devices[index];
  if (!device) return;

  const confirmed = confirm(`Отключить устройство ${device.ip}?`);
  if (!confirmed) return;

  PROFILE_DATA.devices.splice(index, 1);
  renderSubscriptionPage();
}

function handleLogout() {
  const confirmed = confirm("Вы действительно хотите выйти из системы?");
  if (!confirmed) return;

  alert("Здесь будет выход из системы.");
}

function renderCurrentPage() {
  const currentPage = getCurrentPage();
  renderSidebar();

  if (currentPage === "profile") {
    renderProfilePage();
  } else {
    renderSubscriptionPage();
  }
}

function initRouting() {
  window.addEventListener("hashchange", () => {
    renderCurrentPage();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  ensureHash();
  renderCurrentPage();
  initRouting();
});
