let currentSlide = 0;
const slides = document.querySelectorAll(".hero-slide");

function changeSlide() {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}

slides[0].classList.add("active");
setInterval(changeSlide, 4000);

let qty = 1;
const qtyValue = document.getElementById("qtyValue");
const qtyPlus = document.getElementById("qtyPlus");
const qtyMinus = document.getElementById("qtyMinus");
// ------------------------
// CANTIDAD
// ------------------------
qtyPlus.addEventListener("click", () => {
  qty++;
  qtyValue.textContent = qty;
});

qtyMinus.addEventListener("click", () => {
  if (qty > 1) qty--;
  qtyValue.textContent = qty;
});

