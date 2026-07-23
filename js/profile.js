// Динамическое заполнение данных профиля при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Перенаправление на страницу входа, если пользователь не авторизован
    const isLoggedIn = localStorage.getItem('bitwave_logged_in') === 'true';
    if (!isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }

    const email = localStorage.getItem('bitwave_user_email') || 'Пользователь';
    const tgId = localStorage.getItem('bitwave_tg_id') || 'Не привязан';

    // Настраиваем приветственный текст
    const welcomeLabel = document.getElementById('profile-welcome');
    if (welcomeLabel) {
        welcomeLabel.innerText = `Рады видеть вас снова, ${email.split('@')[0]}! Здесь вы можете управлять подпиской и просматривать статус подключения.`;
    }

    // Заполняем Telegram ID
    const tgIdLabel = document.getElementById('profile-tg-id');
    if (tgIdLabel) {
        tgIdLabel.innerText = tgId;
    }

    // Заполняем статус линковки
    const linkStatusLabel = document.getElementById('profile-link-status');
    if (linkStatusLabel) {
        if (tgId !== 'Не привязан') {
            linkStatusLabel.innerText = 'Связано с ботом';
            linkStatusLabel.style.color = '#30d158'; // Зеленый Apple
        } else {
            linkStatusLabel.innerText = 'Не привязан';
            linkStatusLabel.style.color = '#ff453a'; // Красный Apple
        }
    }
});