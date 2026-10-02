(() => {
  const root = document.documentElement;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  let theme = prefersDark ? "dark" : "light";

  try {
    const savedTheme = window.localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      theme = savedTheme;
    }
  } catch {
    // Storage may be unavailable; continue with the system preference.
  }

  root.dataset.theme = theme;

  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector('header button[aria-pressed]');
    if (!toggle) return;

    toggle.setAttribute("aria-pressed", String(theme === "dark"));

    toggle.addEventListener("click", () => {
      theme = theme === "dark" ? "light" : "dark";
      root.dataset.theme = theme;
      toggle.setAttribute("aria-pressed", String(theme === "dark"));

      try {
        window.localStorage.setItem("theme", theme);
      } catch {
        // Keep the in-page theme working when storage is unavailable.
      }
    });
  });
})();
