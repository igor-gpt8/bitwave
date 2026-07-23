// Проверка IP пользователя
async function checkClientIp(manual = false) {
    const dot = document.getElementById('ip-dot');
    const statusText = document.getElementById('ip-status-text');
    const addrLabel = document.getElementById('ip-address-label');

    if (manual) {
        addrLabel.innerText = "Загрузка...";
        statusText.innerText = "Опрашиваем ноды...";
    }

    try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();

        addrLabel.innerText = data.ip || "Неизвестно";

        // Простая логика: если страна не RU (или если страна за пределами СНГ), значит VPN активен
        if (data.country !== 'RU') {
            dot.style.background = '#30d158'; // Зеленый
            dot.style.boxShadow = '0 0 10px rgba(48, 209, 88, 0.5)';
            statusText.innerText = `Подключение защищено (${data.city || data.country_name})`;
            statusText.style.color = '#30d158';
        } else {
            dot.style.background = '#ff9500'; // Оранжевый (без VPN)
            dot.style.boxShadow = 'none';
            statusText.innerText = "Вы не защищены (Прямое подключение)";
            statusText.style.color = '#ff9500';
        }
    } catch (err) {
        addrLabel.innerText = "Ошибка сети";
        statusText.innerText = "Не удалось проверить геолокацию";
        statusText.style.color = '#ff453a';
        dot.style.background = '#ff453a';
    }
}

// Автозапуск проверки при открытии
document.addEventListener('DOMContentLoaded', () => {
    checkClientIp();
});