document.addEventListener("DOMContentLoaded", () => {

  /* ==============================
     LANGUAGE
  ================================= */
window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

  const languageToggle = document.getElementById("languageToggle");

  function getLanguage() {
    return localStorage.getItem("language") || "en";
  }

  function applyLanguage(lang) {

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";

    document.body.setAttribute(
      "dir",
      lang === "fa" ? "rtl" : "ltr"
    );

    document.body.classList.toggle("fa-mode", lang === "fa");

    document.querySelectorAll("[data-en][data-fa]").forEach(element => {

      element.textContent =
        lang === "fa"
          ? element.dataset.fa
          : element.dataset.en;

    });

    if (languageToggle) {
      languageToggle.textContent = lang === "fa" ? "EN" : "FA";
    }

  }


  if (languageToggle) {

    languageToggle.addEventListener("click", () => {

      const newLanguage = getLanguage() === "en" ? "fa" : "en";

      localStorage.setItem("language", newLanguage);
      applyLanguage(newLanguage);

      updateSliderCaption();

    });

  }


  /* ==============================
     THEME
  ================================= */

  const themeToggle = document.getElementById("themeToggle");

  function getTheme() {
    return localStorage.getItem("theme") || "light";
  }

  function applyTheme(theme) {

    const dark =
      theme === "dark" ||
      (
        theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );

    document.body.classList.toggle("dark-theme", dark);

    if (themeToggle) {
      themeToggle.querySelector(".theme-icon").textContent =
        dark ? "☾" : "☼";
    }

  }


  if (themeToggle) {

    themeToggle.addEventListener("click", () => {

      const currentTheme = getTheme();

      const nextTheme =
        currentTheme === "light" ? "dark" : "light";

      localStorage.setItem("theme", nextTheme);
      applyTheme(nextTheme);

    });

  }


  /* ==============================
     SLIDER DATA
  ================================= */

  const imageFolder = "../assets/projects/joy/";

  const galleryImages = [

    {
      file: "joy-personas.png",

      en: "User Personas",
      fa: "پرسوناهای کاربری",

      descriptionEn: "Understanding different social needs and motivations.",
      descriptionFa: "شناخت نیازها و انگیزه‌های متفاوت کاربران."
    },

    {
      file: "joy-user-flow.png",

      en: "User Flow",
      fa: "جریان کاربر",

      descriptionEn: "Mapping the user's journey through the experience.",
      descriptionFa: "ترسیم مسیر حرکت کاربر در تجربه محصول."
    },

    {
      file: "joy-ui-01.png",

      en: "UI Exploration — 01",
      fa: "کاوش طراحی رابط کاربری — ۰۱",

      descriptionEn: "Exploring the visual language of Joy.",
      descriptionFa: "بررسی زبان بصری و هویت رابط کاربری جوی."
    },

    {
      file: "joy-ui-02.png",

      en: "UI Exploration — 02",
      fa: "کاوش طراحی رابط کاربری — ۰۲",

      descriptionEn: "Selected screens from the product interface.",
      descriptionFa: "بخشی از صفحات منتخب رابط کاربری محصول."
    },

    {
      file: "joy-prototype.png",

      en: "Interactive Prototype",
      fa: "نمونه اولیه تعاملی",

      descriptionEn: "Bringing the product experience to life.",
      descriptionFa: "نمایش تجربه محصول در قالب نمونه اولیه تعاملی."
    }

  ];


  /* ==============================
     SLIDER ELEMENTS
  ================================= */

  const mainImage = document.getElementById("sliderMainImage");
  const caption = document.getElementById("sliderCaption");
  const description = document.getElementById("sliderDescription");
  const counter = document.getElementById("sliderCounter");

  const thumbnailsContainer =
    document.getElementById("sliderThumbnails");

  const prevButton = document.getElementById("sliderPrev");
  const nextButton = document.getElementById("sliderNext");

  let currentIndex = 0;

  let touchStartX = 0;
  let touchEndX = 0;


  /* ==============================
     RENDER THUMBNAILS
  ================================= */

  function renderThumbnails() {

    thumbnailsContainer.innerHTML = "";

    galleryImages.forEach((image, index) => {

      const button = document.createElement("button");

      button.className = "thumbnail";
      button.type = "button";
      button.dataset.index = index;

      button.setAttribute(
        "aria-label",
        `Show image ${index + 1}`
      );

      const img = document.createElement("img");

      img.src = imageFolder + image.file;
      img.alt = image.en;
      img.loading = "lazy";

      img.onerror = () => {
        button.remove();
      };

      button.appendChild(img);

      button.addEventListener("click", () => {
        showImage(index);
      });

      thumbnailsContainer.appendChild(button);

    });

  }


  /* ==============================
     UPDATE MAIN IMAGE
  ================================= */

  function showImage(index) {

    if (index < 0) {
      index = galleryImages.length - 1;
    }

    if (index >= galleryImages.length) {
      index = 0;
    }

    currentIndex = index;

    const image = galleryImages[currentIndex];

    mainImage.classList.add("changing");

    const newSrc = imageFolder + image.file;

    const preloadImage = new Image();

    preloadImage.onload = () => {

      mainImage.src = newSrc;
      mainImage.alt = image.en;

      requestAnimationFrame(() => {
        mainImage.classList.remove("changing");
      });

    };

    preloadImage.onerror = () => {
      mainImage.classList.remove("changing");
      console.error("Could not load image:", newSrc);
    };

    preloadImage.src = newSrc;

    updateSliderCaption();
    updateActiveThumbnail();

  }


  /* ==============================
     CAPTION
  ================================= */

  function updateSliderCaption() {

    const image = galleryImages[currentIndex];

    const lang = getLanguage();

    caption.textContent =
      lang === "fa" ? image.fa : image.en;

    description.textContent =
      lang === "fa"
        ? image.descriptionFa
        : image.descriptionEn;

    counter.textContent =
      `${String(currentIndex + 1).padStart(2, "0")} / ${String(galleryImages.length).padStart(2, "0")}`;

  }


  /* ==============================
     ACTIVE THUMBNAIL
  ================================= */

  function updateActiveThumbnail() {

    const thumbnails =
      thumbnailsContainer.querySelectorAll(".thumbnail");

    thumbnails.forEach((thumbnail, index) => {

      const active = index === currentIndex;

      thumbnail.classList.toggle("active", active);

      if (active) {
        thumbnail.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center"
        });
      }

    });

  }


  /* ==============================
     NAVIGATION
  ================================= */

  function nextImage() {
    showImage(currentIndex + 1);
  }

  function previousImage() {
    showImage(currentIndex - 1);
  }


  nextButton.addEventListener("click", nextImage);
  prevButton.addEventListener("click", previousImage);


  /* ==============================
     KEYBOARD NAVIGATION
  ================================= */

  document.addEventListener("keydown", event => {

    if (event.key === "ArrowRight") {
      nextImage();
    }

    if (event.key === "ArrowLeft") {
      previousImage();
    }

  });


  /* ==============================
     TOUCH / SWIPE
  ================================= */

  const sliderStage = document.querySelector(".slider-stage");

  sliderStage.addEventListener("touchstart", event => {

    touchStartX = event.changedTouches[0].screenX;

  }, { passive: true });


  sliderStage.addEventListener("touchend", event => {

    touchEndX = event.changedTouches[0].screenX;

    const difference = touchStartX - touchEndX;

    if (Math.abs(difference) < 45) return;

    if (difference > 0) {
      nextImage();
    } else {
      previousImage();
    }

  }, { passive: true });


  /* ==============================
     INITIALIZE
  ================================= */

  renderThumbnails();

  applyLanguage(getLanguage());
  applyTheme(getTheme());

  showImage(0);


  /* ==============================
     SYNC WITH MAIN PORTFOLIO
  ================================= */

  window.addEventListener("storage", event => {

    if (event.key === "language") {
      applyLanguage(event.newValue || "en");
      updateSliderCaption();
    }

    if (event.key === "theme") {
      applyTheme(event.newValue || "light");
    }

  });

});