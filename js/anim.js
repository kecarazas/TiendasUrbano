/* Simple scroll reveal for elements with .reveal */
document.addEventListener('DOMContentLoaded', ()=>{
  const rev = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('revealed'); obs.unobserve(e.target); }
    });
  }, {threshold: 0.12});
  rev.forEach(el=>obs.observe(el));
});

// --- CAMBIAR IMAGEN PRINCIPAL DESDE MINIATURA ---
const mainImg = document.getElementById("mainImg");
const thumbs = document.querySelectorAll(".thumb");

thumbs.forEach(thumb => {
  thumb.addEventListener("click", () => {
    mainImg.src = thumb.src;

    // activar estilo
    thumbs.forEach(t => t.classList.remove("active"));
    thumb.classList.add("active");
  });
});

// --- CAMBIAR IMAGEN PRINCIPAL SEGÚN COLOR ---
const colorCircles = document.querySelectorAll(".color-circle");

colorCircles.forEach(circle => {
  circle.addEventListener("click", () => {
    const newImg = circle.dataset.img;
    mainImg.src = newImg;

    colorCircles.forEach(c => c.classList.remove("active"));
    circle.classList.add("active");
  });
});

// --- SELECCIÓN DE TALLAS ---
const sizeButtons = document.querySelectorAll(".size");

sizeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    sizeButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

document.querySelector(".logo-fala").onclick = () => {
    window.location.href = "index.html";
};

document.querySelector(".menu-btn").onclick = () => {
    alert("Aquí abrirías tu menú lateral :)");
};
