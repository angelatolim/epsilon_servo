const sectionRight = document.querySelector(".section-right");
const sectionLeft = document.querySelector(".section-left");
const pageWrapper = document.querySelector(".page-wrapper");
const sectionMiddle = document.querySelector(".section-middle");

pageWrapper.addEventListener("keydown", handleHotKey);

function handleHotKey(event) {
  if (event.ctrlKey && event.shiftKey && event.key === "B") {
    sectionRight.classList.toggle("hidden");
    sectionLeft.classList.toggle("hidden");
    pageWrapper.classList.toggle("page-wrapper-hotkey");
    pageWrapper.classList.toggle("page-wrapper");
  }
}
