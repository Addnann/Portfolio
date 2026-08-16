document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. MULTI-THEME TOGGLE SYSTEM
  // ==========================================
  const themeBtn = document.getElementById("theme-btn");
  const themeMenu = document.getElementById("theme-menu");
  const themeButtons = document.querySelectorAll(".theme-menu button");

  // Load Saved Theme from LocalStorage
  const savedTheme = localStorage.getItem("selected-theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);

  // Toggle Theme Dropdown
  themeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    themeMenu.classList.toggle("show");
  });

  // Close Dropdown when clicking outside
  document.addEventListener("click", () => {
    themeMenu.classList.remove("show");
  });

  // Handle Theme Selection
  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedTheme = button.getAttribute("data-theme");
      document.documentElement.setAttribute("data-theme", selectedTheme);
      localStorage.setItem("selected-theme", selectedTheme);
      themeMenu.classList.remove("show");
    });
  });

  // ==========================================
  // 2. SCROLL-TO-TOP WITH PROGRESS ANIMATION
  // ==========================================
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  const progressCircle = document.querySelector(".progress-ring-circle");
  
  const radius = progressCircle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;

  progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
  progressCircle.style.strokeDashoffset = circumference;

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;

    // Calculate stroke offset
    const offset = circumference - scrollPercent * circumference;
    progressCircle.style.strokeDashoffset = offset;

    // Show/Hide button based on scroll distance
    if (scrollTop > 300) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  }

  // Smooth Scroll to Top
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Event Listener for Window Scroll
  window.addEventListener("scroll", updateScrollProgress);
});
