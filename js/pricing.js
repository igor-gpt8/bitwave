// Полное сохранение исходных данных тарифов
let currentCurrency = "RUB";
const tariffData = {
    "RUB": [ 
        {days: 30, price: 500, title: "Стартовый"}, 
        {days: 90, price: 1300, title: "Выгодный"}, 
        {days: 365, price: 4500, title: "Безлимит"} 
    ],
    "USD": [ 
        {days: 30, price: 6.25, title: "Starter"}, 
        {days: 90, price: 16.25, title: "Optimal"}, 
        {days: 365, price: 56.25, title: "Unlimited"} 
    ],
    "STARS": [ 
        {days: 30, price: 300, title: "Telegram Base"}, 
        {days: 90, price: 780, title: "Telegram Pro"}, 
        {days: 365, price: 2700, title: "Telegram Ultra"} 
    ]
};

// Переключение валюты с красивой анимацией табов
function switchCurrency(currency) {
    if (!tariffData[currency]) return;
    currentCurrency = currency;
    
    // Обновляем активный класс на кнопках переключения
    document.querySelectorAll('.btn-currency').forEach(btn => {
        if (btn.getAttribute('data-currency') === currency) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    renderTariffs();
}

// Рендеринг карточек тарифов в премиальном дизайне
function renderTariffs() {
    const container = document.getElementById('tariffs-container');
    if (!container) return;
    
    // Плавное исчезновение перед обновлением контента
    container.style.opacity = '0';
    container.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        container.innerHTML = '';
        
        tariffData[currentCurrency].forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'pricing-card reveal';
            card.style.transitionDelay = `${index * 50}ms`;
            
            // Символ или название валюты для красивого отображения
            let currencySign = currentCurrency;
            if (currentCurrency === 'RUB') currencySign = '₽';
            if (currentCurrency === 'USD') currencySign = '$';
            if (currentCurrency === 'STARS') currencySign = '★';

            card.innerHTML = `
                <div class="pricing-card-glow"></div>
                <div class="pricing-badge">${item.days} дней</div>
                <h4 class="pricing-title">${item.title}</h4>
                <div class="pricing-price-wrapper">
                    <span class="pricing-price">${item.price}</span>
                    <span class="pricing-currency">${currencySign}</span>
                </div>
                <p class="pricing-desc">Высокоскоростные ноды, без лимита трафика и поддержка 24/7.</p>
                <button class="btn-primary card-action-btn">Выбрать тариф</button>
            `;
            
            // Привязка оригинального обработчика покупки
            card.onclick = function() {
                checkoutSub(item.days, item.price, currentCurrency);
            };
            
            container.appendChild(card);
            
            // Инициализация слежения мыши для эффекта свечения на картах тарифов
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
            });
        });
        
        // Плавное появление обновленных карт
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
        
        // Запуск Observer для анимации появления карт
        const reveals = container.querySelectorAll('.reveal');
        reveals.forEach(el => el.classList.add('revealed'));

    }, 200);
}

// Функция вызова инвойса / перехода к оплате
function checkoutSub(days, price, currency) {
    const finalPriceLabel = document.getElementById('final-price-label');
    if (finalPriceLabel) {
        finalPriceLabel.innerText = `${price} ${currency}`;
    }
    
    const invoiceStep = document.getElementById('invoice-step');
    if (invoiceStep) {
        invoiceStep.classList.remove('hidden');
        invoiceStep.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Инициализация при загрузке страницы быстрого старта
document.addEventListener('DOMContentLoaded', () => {
    // Навешиваем клики на кнопки валют, если они есть на странице
    document.querySelectorAll('.btn-currency').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const currency = e.currentTarget.getAttribute('data-currency');
            switchCurrency(currency);
        });
    });

    renderTariffs();
});