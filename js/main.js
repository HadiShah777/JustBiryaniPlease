document.addEventListener("DOMContentLoaded", () => {
  const carouselInner = document.querySelector(".carousel-inner");
  const dots = document.querySelectorAll(".dot");
  const slideInterval = 3000;
  let currentSlide = 0;
  const totalSlides = document.querySelectorAll(".hero").length;

  if (!carouselInner || dots.length === 0 || totalSlides === 0) {
    console.error("Carousel components are missing or not properly set up.");
    return;
  }

  function goToSlide(index, immediate = false) {
    if (index < 0 || index >= totalSlides) return;
    currentSlide = index;
    const offset = -index * 100;

    if (immediate) {
      carouselInner.style.transition = "none";
      carouselInner.style.transform = `translateX(${offset}vw)`;
      setTimeout(() => {
        carouselInner.style.transition = "";
      }, 500);
    } else {
      requestAnimationFrame(() => {
        carouselInner.style.transform = `translateX(${offset}vw)`;
      });
    }

    dots.forEach((dot) => dot.classList.remove("active"));
    dots[index].classList.add("active");
  }

  function nextSlide() {
    if (currentSlide === totalSlides - 1) {
      goToSlide(0, true);
    } else {
      currentSlide = (currentSlide + 1) % totalSlides;
      goToSlide(currentSlide);
    }
  }
  goToSlide(currentSlide);
  const slideIntervalId = setInterval(nextSlide, slideInterval);
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => goToSlide(index));
    dot.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        goToSlide(index);
      }
    });
  });
  window.addEventListener("beforeunload", () => {
    clearInterval(slideIntervalId);
  });
});