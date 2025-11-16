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

document.querySelectorAll(".qty-btn").forEach(btn => {
    btn.addEventListener("click", e => {
        const parent = e.target.parentElement;
        const qty = parent.querySelector(".qty");
        let number = parseInt(qty.innerText);

        if (e.target.innerText === "+" && number < 10) number++;
        if (e.target.innerText === "–" && number > 1) number--;

        qty.innerText = number;
    });
});

