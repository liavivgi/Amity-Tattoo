document.addEventListener("DOMContentLoaded", function () {
  // Slider functionality
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  let currentSlide = 0;
  let slideInterval;
  const intervalTime = 5000; // Time between auto slides (5 seconds)

  // Initialize slider
  function initSlider() {
    // Set first slide as active
    slides[0].classList.add("active");
    dots[0].classList.add("active");

    // Start auto sliding
    startSlideInterval();
  }

  // Go to specific slide
  function goToSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    // Add active class to current slide and dot
    slides[index].classList.add("active");
    dots[index].classList.add("active");

    // Update current slide index
    currentSlide = index;

    // Restart auto sliding
    resetSlideInterval();
  }

  // Go to next slide
  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
  }

  // Go to previous slide
  function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prev);
  }

  // Start auto sliding
  function startSlideInterval() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  // Reset auto sliding
  function resetSlideInterval() {
    clearInterval(slideInterval);
    startSlideInterval();
  }

  // Event listeners
  prevBtn.addEventListener("click", function (e) {
    e.preventDefault();
    prevSlide();
  });

  nextBtn.addEventListener("click", function (e) {
    e.preventDefault();
    nextSlide();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", function (e) {
      e.preventDefault();
      goToSlide(index);
    });
  });

  // Initialize slider
  initSlider();

  // Add 3D tilt effect to slider
  const sliderContainer = document.querySelector(".slider-container");

  sliderContainer.addEventListener("mousemove", function (e) {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 35;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 35;

    this.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  });

  sliderContainer.addEventListener("mouseenter", function () {
    this.style.transition = "none";
  });

  sliderContainer.addEventListener("mouseleave", function () {
    this.style.transition = "all 0.5s ease";
    this.style.transform = "perspective(1000px) rotateY(0) rotateX(0)";
  });

  // Social icons animation
  const socialIcons = document.querySelectorAll(".social-icon");

  socialIcons.forEach((icon, index) => {
    // Add floating animation with different delays
    icon.style.animation = `float 3s ease-in-out ${index * 0.5}s infinite`;

    icon.addEventListener("mouseenter", function () {
      this.style.animation = "none";
      this.style.transform = "translateY(-5px) scale(1.1)";
    });

    icon.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
      setTimeout(() => {
        this.style.animation = `float 3s ease-in-out ${index * 0.5}s infinite`;
      }, 100);
    });
  });

  // Add slide swipe functionality for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  const slider = document.querySelector(".slider");

  slider.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].screenX;
  });

  slider.addEventListener("touchend", function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      // Swipe left, go to next slide
      nextSlide();
    }

    if (touchEndX > touchStartX + 50) {
      // Swipe right, go to previous slide
      prevSlide();
    }
  }

  // Add keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      prevSlide();
    }

    if (e.key === "ArrowRight") {
      nextSlide();
    }
  });

  // Handle video background fallback
  const video = document.querySelector(".video-background video");

  video.addEventListener("error", function () {
    // If video fails to load, add a class to use the fallback image
    document.querySelector(".video-background").classList.add("video-fallback");
  });
});
