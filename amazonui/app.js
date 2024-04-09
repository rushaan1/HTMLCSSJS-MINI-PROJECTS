document.addEventListener("DOMContentLoaded", function() {
    const wrapper = document.querySelector(".slider-section"),
      carousel = document.querySelector(".slider"),
      images = document.querySelectorAll(".slider-section-img")
      buttons = document.querySelectorAll(".bcontainer");  
  
    let imageIndex = 1,
      intervalId;
  
    const autoSlide = () => {
      intervalId = setInterval(() => slideImage(++imageIndex), 2000);
    };
    autoSlide();
    const slideImage = () => {
      imageIndex = imageIndex === images.length ? 0 : imageIndex < 0 ? images.length - 1 : imageIndex;
      carousel.style.transform = `translate(-${imageIndex * 100}%)`;
    };

    const updateClick = (e) => {
        clearInterval(intervalId);
        imageIndex += e.target.id === "next" ? 1 : -1;
        slideImage(imageIndex);
        autoSlide();
      };


    // Add event listeners to the navigation buttons
buttons.forEach((button) => button.addEventListener("click", updateClick));

// Add mouseover event listener to wrapper element to stop auto sliding
wrapper.addEventListener("mouseover", () => clearInterval(intervalId));
// Add mouseleave event listener to wrapper element to start auto sliding again
wrapper.addEventListener("mouseleave", autoSlide);
  });
  