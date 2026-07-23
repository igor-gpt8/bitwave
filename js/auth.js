// auth.js — Управление сессиями, авторизацией и состоянием пользователя

document.addEventListener('DOMContentLoaded', () => {
    // Проверяем состояние авторизации при каждой загрузке страницы
    checkAuthStatus();

    // Инициализируем обработчики форм, если мы находимся на страницах login или register
    const loginForm = document.querySelector('.auth-form');
    if (loginForm) {
        // Определяем, какая именно форма перед нами, по ID её полей
        const emailInput = document.getElementById('email');
        const regEmailInput = document.getElementById('reg-email');

        if (emailInput) {
            loginForm.addEventListener('submit', handleLogin);
        } else if (regEmailInput) {
            loginForm.addEventListener('submit', handleRegister);
        }
    }
});

// Проверка статуса авторизации и обновление UI навбара
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('bitwave_logged_in') === 'true';
    const userEmail = localStorage.getItem('bitwave_user_email') || 'User';

    const navRight = document.querySelector('.nav-right');
    if (!navRight) return;

    if (isLoggedIn) {
        // Если пользователь авторизован — заменяем кнопки Входа/Регистрации на премиальный бейдж
        navRight.innerHTML = `
            <div class="user-badge" onclick="redirectToProfile()" style="display: flex; align-items: center; gap: 10px; cursor: pointer; padding: 6px 14px; background: rgba(255, 255, 255, 0.05); border: 1px solid var(--border-subtle); border-radius: var(--radius-capsule); transition: var(--transition-fast);">
                <span class="status-dot" style="width: 8px; height: 8px; background: #30d158; border-radius: 50%; box-shadow: 0 0 10px rgba(48, 209, 88, 0.5);"></span>
                <span class="user-email-label" style="font-size: 13px; font-weight: 500; color: var(--text-primary);">${userEmail.split('@')[0]}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color: var(--text-muted);">
                    <path d="M6 9l6 6 6-6"></path>
                </svg>
            </div>
        `;
    } else {
        // Если гость — возвращаем стандартные кнопки
        navRight.innerHTML = `
            <a href="login.html" class="nav-link-auth">Войти</a>
            <a href="register.html" class="btn-linear-nav">Регистрация</a>
        `;
    }
}

// Обработка Входа (Email + Password)
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Валидация
    if (!email || !password) {
        alert("Пожалуйста, заполните все поля.");
        return;
    }

    // Симуляция успешного входа (здесь в будущем будет fetch к твоему API)
    localStorage.setItem('bitwave_logged_in', 'true');
    localStorage.setItem('bitwave_user_email', email);
    localStorage.setItem('bitwave_tg_id', 'Не привязан'); // По умолчанию для email

    showSuccessNotification("Вход выполнен успешно! Перенаправление...");
    
    setTimeout(() => {
        window.location.href = 'profile.html'; // Перенаправляем в личный кабинет
    }, 1500);
}

// Обработка Регистрации
function handleRegister(event) {
    event.preventDefault();

    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const passwordConfirm = document.getElementById('reg-password-confirm').value;
    const termsCheckbox = document.getElementById('terms');

    // Проверки
    if (password.length < 8) {
        alert("Пароль должен содержать минимум 8 символов.");
        return;
    }

    if (password !== passwordConfirm) {
        alert("Пароли не совпадают.");
        return;
    }

    if (termsCheckbox && !termsCheckbox.checked) {
        alert("Необходимо согласиться с условиями обслуживания.");
        return;
    }

    // Сохраняем сессию (симуляция регистрации)
    localStorage.setItem('bitwave_logged_in', 'true');
    localStorage.setItem('bitwave_user_email', email);
    localStorage.setItem('bitwave_tg_id', 'Не привязан');

    showSuccessNotification("Аккаунт успешно создан!");

    setTimeout(() => {
        window.location.href = 'profile.html';
    }, 1500);
}

// Интеграция с Telegram авторизацией (Хук для твоего бота / виджета)
function loginWithTelegram() {
    // Временная эмуляция успешного входа через Telegram
    const mockTelegramId = Math.floor(Math.random() * 900000000) + 100000000;
    
    localStorage.setItem('bitwave_logged_in', 'true');
    localStorage.setItem('bitwave_user_email', `tg_user_${mockTelegramId}@telegram.org`);
    localStorage.setItem('bitwave_tg_id', mockTelegramId.toString());

    showSuccessNotification("Успешная авторизация через Telegram!");

    setTimeout(() => {
        window.location.href = 'profile.html';
    }, 1200);
}

// Выход из аккаунта (Logout)
function handleLogout() {
    localStorage.removeItem('bitwave_logged_in');
    localStorage.removeItem('bitwave_user_email');
    localStorage.removeItem('bitwave_tg_id');
    
    showSuccessNotification("Вы вышли из аккаунта.");
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Навигация по клику на бейдж пользователя
function redirectToProfile() {
    window.location.href = 'profile.html';
}

// Вспомогательный UI-элемент: красивое всплывающее уведомление в стиле Apple
function showSuccessNotification(message) {
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.bottom = '24px';
    notification.style.right = '24px';
    notification.style.background = 'rgba(10, 10, 10, 0.9)';
    notification.style.border = '1px solid var(--border-subtle)';
    notification.style.borderRadius = 'var(--radius-medium)';
    notification.style.padding = '12px 24px';
    notification.style.color = 'var(--text-primary)';
    notification.style.fontSize = '14px';
    notification.style.fontWeight = '500';
    notification.style.backdropFilter = 'blur(10px)';
    notification.style.zIndex = '9999';
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(10px)';
    notification.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    notification.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
    
    notification.innerText = message;
    document.body.appendChild(notification);

    // Анимация появления
    requestAnimationFrame(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    });

    // Исчезновение
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(10px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}