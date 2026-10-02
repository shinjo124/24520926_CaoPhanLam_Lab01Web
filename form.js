(() => {
  const form = document.querySelector("#contact form");
  const button = form?.querySelector('button[type="submit"]');
  const status = document.querySelector("#contact-status");

  if (!form || !button || !status) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    button.disabled = true;
    status.textContent = "Sending your message.";

    window.setTimeout(() => {
      try {
        status.textContent = "Thanks, Lâm will reply soon.";
        form.reset();
      } catch {
        status.textContent = "Something went wrong. Please try again.";
      } finally {
        button.disabled = false;
      }
    }, 500);
  });
})();
