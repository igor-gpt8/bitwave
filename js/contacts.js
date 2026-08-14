document.addEventListener("DOMContentLoaded", () => {
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

  const salesForm = document.getElementById("sales-form");
  if (salesForm) {
    salesForm.addEventListener("submit", submitContactForm);
  }
});

function submitContactForm(event) {
  event.preventDefault();

  const isAuth = document
    .getElementById("view-unauth")
    .classList.contains("hidden");

  let email, message;

  if (isAuth) {
    const emailEl = document.getElementById("user-email");
    const messageEl = document.getElementById("msg-auth");

    if (!emailEl || !messageEl) {
      console.error("Не найдены поля авторизованной формы");
      return;
    }

    email = emailEl.value;
    message = messageEl.value;
  } else {
    email = document.querySelector(
      '#view-unauth .input-modern[type="email"]',
    ).value;
    message = document.getElementById("msg-unauth").value;
  }

  const ticketId = Math.floor(Math.random() * 9000) + 1000;
  const ticketEl = document.getElementById("ticket-id");
  if (ticketEl) ticketEl.innerText = ticketId;

  const userMsgEl = document.getElementById("user-chat-msg");
  if (userMsgEl) userMsgEl.innerText = message;

  const formWrapper = document.querySelector(".contact-form-wrapper");
  const chatBox = document.getElementById("chat-box");

  if (formWrapper && chatBox) {
    salesForm.style.display = "none";
    const formHeader = document.querySelector(".form-header-premium");
    if (formHeader) formHeader.style.display = "none";

    formWrapper.classList.add("chat-active");
    chatBox.classList.add("show");
  }

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
