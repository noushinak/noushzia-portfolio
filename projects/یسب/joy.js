document.addEventListener("DOMContentLoaded", () => {

  const root = document.documentElement;

  const languageButtons = document.querySelectorAll(".lang-btn");
  const themeButtons = document.querySelectorAll(".theme-btn");

  // LANGUAGE
  function setLanguage(language) {
    const selectedLanguage = language === "fa" ? "fa" : "en";

    root.lang = selectedLanguage;
    root.dir = selectedLanguage === "fa" ? "rtl" : "ltr";

    document.querySelectorAll("[data-en][data-fa]").forEach(element => {
      element.textContent = element.dataset[selectedLanguage];
    });

    languageButtons.forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.lang === selectedLanguage
      );
    });

    localStorage.setItem("language", selectedLanguage);
  }

  // THEME
  function setTheme(theme) {
    const validThemes = ["light", "dark", "system"];

    const selectedTheme = validThemes.includes(theme)
      ? theme
      : "system";

    root.setAttribute("data-theme", selectedTheme);

    themeButtons.forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.themeChoice === selectedTheme
      );
    });

    localStorage.setItem("theme", selectedTheme);
  }

  // LANGUAGE BUTTONS
  languageButtons.forEach(button => {
    button.addEventListener("click", () => {
      setLanguage(button.dataset.lang);
    });
  });

  // THEME BUTTONS
  themeButtons.forEach(button => {
    button.addEventListener("click", () => {
      setTheme(button.dataset.themeChoice);
    });
  });

  // LOAD SAVED PREFERENCES
  const savedLanguage =
    localStorage.getItem("language") ||
    localStorage.getItem("lang") ||
    "en";

  const savedTheme = localStorage.getItem("theme") || "system";

  setLanguage(savedLanguage);
  setTheme(savedTheme);

});