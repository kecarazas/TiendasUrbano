function formatPrice(n){ return '$' + Number(n).toLocaleString('es-CL', {minimumFractionDigits:0, maximumFractionDigits:2}) }

// product quick-add helper used in pages
function quickAddFromCard(el){
  const id = el.dataset.id, title = el.dataset.title, price = parseFloat(el.dataset.price);
  addToCart(id, title, price, 1);
  el.classList.add('added');
  setTimeout(()=>el.classList.remove('added'),800);
}

const products = [...document.querySelectorAll(".card-prod")];
const grid = document.getElementById("productGrid");
const orderSelect = document.getElementById("orderSelect");

// 🔹 ORDENAR
orderSelect.addEventListener("change", () => {
  let type = orderSelect.value;

  let sorted = [...products].sort((a,b)=>{
    let pa = +a.dataset.price;
    let pb = +b.dataset.price;

    if(type=="asc") return pa - pb;
    if(type=="desc") return pb - pa;
    return 0;
  });

  grid.innerHTML="";
  sorted.forEach(p=> grid.appendChild(p));
});


// 🔹 FILTRAR (checkbox)
document.querySelectorAll("input[type=checkbox]").forEach(cb=>{
  cb.addEventListener("change",filterProducts);
});

function filterProducts(){
  let discounts = getValues(".f-discount");
  let cats = getValues(".f-cat");

  products.forEach(card=>{
    let show = true;

    if(discounts.length){
      show = discounts.some(d => +card.dataset.discount >= +d);
    }
    if(show && cats.length){
      show = cats.includes(card.dataset.cat);
    }
    card.style.display = show ? "block" : "none";
  })
}

function getValues(sel){
  return [...document.querySelectorAll(sel+":checked")].map(x=>x.value);
}

