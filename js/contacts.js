document.addEventListener("DOMContentLoaded", () => {
  // === 1. ЛОГИКА АВТОРЕСАЙЗА ТЕКСТОВЫХ ПОЛЕЙ ===
  const textareas = document.querySelectorAll(".textarea-auto");

  textareas.forEach((textarea) => {
    textarea.addEventListener("input", function () {
      this.style.height = "auto";
      const currentScrollHeight = this.scrollHeight;

      if (currentScrollHeight > 220) {
        this.style.height = "220px";
        this.style.overflowY = "auto";
      } else {
        this.style.height = currentScrollHeight + "px";
        this.style.overflowY = "hidden";
      }
    });
  });

  // === 2. ОБРАБОТКА ОТПРАВКИ ФОРМЫ ===
  const salesForm = document.getElementById("sales-form");
  if (salesForm) {
    salesForm.addEventListener("submit", submitContactForm);
  }
});

function submitContactForm(event) {
  event.preventDefault();

  // Определяем, авторизован ли пользователь (скрыто ли состояние unauth)
  const isAuth = document
    .getElementById("view-unauth")
    .classList.contains("hidden");

  // Получаем данные в зависимости от состояния интерфейса
  let email, message;

  if (isAuth) {
    email = document.getElementById("user-email").value;
    message = document.getElementById("msg-auth").value;
  } else {
    // Если неавторизован, но форма как-то отправилась (на будущее)
    email = document.querySelector(
      '#view-unauth .input-modern[type="email"]',
    ).value;
    message = document.getElementById("msg-unauth").value;
  }

  // --- Твоя логика чата и тикетов (адаптированная под новые классы) ---

  // Генерируем случайный номер тикета
  const ticketId = Math.floor(Math.random() * 9000) + 1000;
  const ticketEl = document.getElementById("ticket-id");
  if (ticketEl) ticketEl.innerText = ticketId;

  // Записываем отправленный текст в баббл пользователя
  const userMsgEl = document.getElementById("user-chat-msg");
  if (userMsgEl) userMsgEl.innerText = message;

  // Скрываем всю премиум-карточку (форму и шапку) и показываем чат
  const formWrapper = document.querySelector(".contact-form-wrapper");
  // Если твой чат-бокс лежит внутри или рядом, управляем им:
  const chatBox = document.getElementById("chat-box");

  if (formWrapper && chatBox) {
    // Вместо полной аннигиляции display: none, можно изящно переключить класс
    salesForm.style.display = "none";
    const formHeader = document.querySelector(".form-header-premium");
    if (formHeader) formHeader.style.display = "none";

    formWrapper.classList.add("chat-active");
    chatBox.classList.add("show");
  }

  // Симулируем набор ответа ботом через 2.5 секунды
  setTimeout(() => {
    const typingStatus = document.getElementById("typing-status");
    if (typingStatus) typingStatus.style.display = "none";

    const botReply = document.getElementById("bot-reply");
    if (botReply) {
      botReply.style.display = "block";
      botReply.style.animation = "fadeIn 0.3s ease forwards";
    }
  }, 2500);
}
