const topButton = document.querySelector(".top-button");
const lectureExampleToggle = document.querySelector(".lecture-example-toggle");
const lectureExamplePanel = document.querySelector("#lecture-example");

window.addEventListener("scroll", () => {
  topButton.classList.toggle("is-visible", window.scrollY > 600);
});

topButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

if (lectureExampleToggle && lectureExamplePanel) {
  lectureExampleToggle.addEventListener("click", () => {
    const isOpen = lectureExampleToggle.getAttribute("aria-expanded") === "true";
    lectureExampleToggle.setAttribute("aria-expanded", String(!isOpen));
    lectureExamplePanel.hidden = isOpen;
  });
}
