const collapse = document.querySelector(".collapse");
const button = document.querySelector(".arrow-toggle");

button.addEventListener("click", () => {
  collapse.classList.toggle("open");
  button.classList.toggle("active");
});
