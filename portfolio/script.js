/* =========================================
   NOUSHIN ZIA — PORTFOLIO
   JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const root = document.documentElement;

/* ---------------------------------------
   LANGUAGE
--------------------------------------- */

const languageButtons = document.querySelectorAll("[data-lang]");
const resumeDownloads = document.querySelectorAll(".resume-download");

function setLanguage(language) {
  const selectedLanguage = language === "en" ? "en" : "fa";

  root.lang = selectedLanguage;
  root.dir = selectedLanguage === "fa" ? "rtl" : "ltr";

  // Change text content
  document.querySelectorAll("[data-fa][data-en]").forEach(element => {
    const value = element.dataset[selectedLanguage];

    if (value !== undefined) {
      element.textContent = value;
    }
  });

  // Change resume PDF based on selected language
  resumeDownloads.forEach(link => {
    if (selectedLanguage === "fa") {
      link.href = "../assets/nushzia-fa.pdf";
      link.download = "Nushzia-Resume-FA.pdf";
    } else {
      link.href = "../assets/nushzia-en.pdf";
      link.download = "Nushzia-Resume-EN.pdf";
    }
  });

  // Update language buttons
  languageButtons.forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.lang === selectedLanguage
    );
  });

  // Save selected language
  try {
    localStorage.setItem("portfolio-language", selectedLanguage);
  } catch (error) {
    // The page still works if localStorage is unavailable.
  }
}

// Language button events
languageButtons.forEach(button => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.lang);
  });
});

// Load saved language
let savedLanguage = "fa";

try {
  savedLanguage = localStorage.getItem("portfolio-language") || "fa";
} catch (error) {
  savedLanguage = "fa";
}

setLanguage(savedLanguage);



  /* ---------------------------------------
     THEME
  --------------------------------------- */

  const themeButtons = document.querySelectorAll("[data-theme-choice]");

  function setTheme(theme) {
    const selectedTheme = ["light", "dark", "system"].includes(theme)
      ? theme
      : "light";

    root.dataset.theme = selectedTheme;

    themeButtons.forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.themeChoice === selectedTheme
      );
    });

    try {
      localStorage.setItem("portfolio-theme", selectedTheme);
    } catch (error) {
      // Theme remains functional without localStorage.
    }
  }

  themeButtons.forEach(button => {
    button.addEventListener("click", () => {
      setTheme(button.dataset.themeChoice);
    });
  });

  let savedTheme = "light";

  try {
    savedTheme = localStorage.getItem("portfolio-theme") || "light";
  } catch (error) {
    savedTheme = "light";
  }

  setTheme(savedTheme);


  /* ---------------------------------------
     CAREER JOURNEY DATA
  --------------------------------------- */

  const careerStages = [
    {
      period: "۱۳۹۵–۱۳۹۹",
      periodEn: "2016–2020",
      status: "پایه تحصیلی",
      statusEn: "Education",
      title: "طراحی صنعتی",
      titleEn: "Industrial Design",
      roleEn: "Industrial Design",
      description: "شکل‌گیری نگاه طراحی، تفکر ساختاری و حل مسئله؛ یادگیری دیدن مسائل از زوایای مختلف و تبدیل نیاز به راهکار.",
      descriptionEn: "Developing a design mindset, structured thinking and problem-solving. Learning to approach challenges from different perspectives and translate needs into solutions.",
      skills: ["Design Thinking", "Problem Solving", "Visual Communication"]
    },
    {
      period: "۱۳۹۹–۱۴۰۳",
      periodEn: "2020–2024",
      status: "ورود به فضای حرفه‌ای",
      statusEn: "Early Career",
      title: "کارشناس محتوا",
      titleEn: "Content Specialist",
      roleEn: "Content Specialist",
      description: "ورود به فضای حرفه‌ای محتوا، شناخت مخاطب، تولید محتوا و درک ارتباط میان نیاز مخاطب و اهداف کسب‌وکار.",
      descriptionEn: "Entering the content field, understanding audiences, creating content and learning how audience needs connect with business goals.",
      skills: ["Content Creation", "Audience Research", "SEO Fundamentals"]
    },
    {
      period: "۱۴۰۳–۱۴۰۵",
      periodEn: "2024–2026",
      status: "توسعه تخصص",
      statusEn: "Growing Expertise",
      title: "کارشناس ارشد محتوا",
      titleEn: "Senior Content Specialist",
      roleEn: "Senior Content Specialist",
      description: "گسترش مسئولیت‌ها، بهبود کیفیت محتوا، تحلیل عملکرد و حرکت از اجرای صرف به سمت نگاه استراتژیک‌تر.",
      descriptionEn: "Expanding responsibilities, improving content quality, analyzing performance and moving from execution toward a more strategic perspective.",
      skills: ["Content Strategy", "Performance Analysis", "Content Operations"]
    },
    {
      period: "۱۴۰۵–اکنون",
      periodEn: "2026–Present",
      status: "مسئولیت و راهبری",
      statusEn: "Leadership",
      title: "سرپرست تیم محتوا",
      titleEn: "Content Team Lead",
      roleEn: "Content Team Lead",
      description: "راهبری تیم محتوا، هماهنگی نویسندگان، برنامه‌ریزی و کنترل کیفیت، تحلیل عملکرد و همکاری با بخش‌های مختلف کسب‌وکار.",
      descriptionEn: "Leading the content team, coordinating writers, planning and quality control, analyzing performance and collaborating across business functions.",
      skills: ["Team Leadership", "Content Strategy", "Analytics", "Cross-functional Collaboration"]
    }
  ];

  const stageButtons = document.querySelectorAll(".cj-stop");

  const periodElement = document.getElementById("cj-period");
  const statusElement = document.getElementById("cj-status");
  const titleElement = document.getElementById("cj-stage-title");
  const roleElement = document.getElementById("cj-role-en");
  const descriptionElement = document.getElementById("cj-description");
  const skillsElement = document.getElementById("cj-skills");

  let currentStage = 0;

  function renderCareerStage(index) {
    const stage = careerStages[index];

    if (!stage) return;

    currentStage = index;

    const language = root.lang === "en" ? "en" : "fa";

    periodElement.textContent = language === "en"
      ? stage.periodEn
      : stage.period;

    statusElement.textContent = language === "en"
      ? stage.statusEn
      : stage.status;

    titleElement.textContent = language === "en"
      ? stage.titleEn
      : stage.title;

    roleElement.textContent = stage.roleEn;

    descriptionElement.textContent = language === "en"
      ? stage.descriptionEn
      : stage.description;

    skillsElement.replaceChildren();

    stage.skills.forEach(skill => {
      const tag = document.createElement("span");
      tag.textContent = skill;
      skillsElement.appendChild(tag);
    });

    stageButtons.forEach((button, buttonIndex) => {
      const active = buttonIndex === index;

      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
    });
  }

  stageButtons.forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.stage);
      renderCareerStage(index);
    });
  });

  renderCareerStage(currentStage);

  /* Re-render dynamic career content after language changes. */
  languageButtons.forEach(button => {
    button.addEventListener("click", () => {
      renderCareerStage(currentStage);
    });
  });


  /* ---------------------------------------
     ACTIVE NAVIGATION
  --------------------------------------- */

  const navLinks = document.querySelectorAll(".nav-link:not(.disabled)");
  const sections = document.querySelectorAll("main section[id]");

  function setActiveNavigation(id) {
    navLinks.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${id}`
      );
    });
  }

  const observer = new IntersectionObserver(entries => {
    const visibleEntries = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

    if (visibleEntries.length) {
      setActiveNavigation(visibleEntries[0].target.id);
    }
  }, {
    root: null,
    rootMargin: "-20% 0px -60% 0px",
    threshold: [0, 0.15, 0.3, 0.5]
  });

  sections.forEach(section => observer.observe(section));

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      const target = link.getAttribute("href").slice(1);
      setActiveNavigation(target);
    });
  });


  /* ---------------------------------------
     CURRENT YEAR
  --------------------------------------- */

  const yearElement = document.getElementById("current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

});