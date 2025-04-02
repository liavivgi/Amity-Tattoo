document.addEventListener("DOMContentLoaded", function () {
    let currentSlide = 0;
    const track = document.querySelector(".slider-track");
    const slides = document.querySelectorAll(".slide");
    const nextBtn = document.querySelector(".nav.next");
    const prevBtn = document.querySelector(".nav.prev");
  
    // בדיקה שחייבים!
    if (!track || slides.length === 0 || !nextBtn || !prevBtn) {
      console.error("❌ אלמנט אחד או יותר לא נמצא: track / slide / next / prev");
      return;
    }
  
    function updateSlide() {
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  
    nextBtn.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlide();
    });
  
    prevBtn.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlide();
    });
  
    // תמיכה ב־touch
    let startX = 0;
  
    track.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });
  
    track.addEventListener("touchend", (e) => {
      let endX = e.changedTouches[0].clientX;
      let diff = startX - endX;
  
      if (diff > 50) {
        currentSlide = (currentSlide + 1) % slides.length;
      } else if (diff < -50) {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      }
  
      updateSlide();
    });
  });
  
  