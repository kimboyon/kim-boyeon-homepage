const topButton = document.querySelector(".top-button");

window.addEventListener("scroll", () => {
  topButton.classList.toggle("is-visible", window.scrollY > 600);
});

topButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
