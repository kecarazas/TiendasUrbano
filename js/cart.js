/* Simple cart implementation using localStorage */
const CART_KEY = 'urbano_cart_v2';

function loadCart(){ 
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || [] } 
  catch(e){ return [] } 
}

function saveCart(cart){ 
  localStorage.setItem(CART_KEY, JSON.stringify(cart)) 
}

function cartCount(){ 
  return loadCart().reduce((s,i)=>s+i.qty,0) 
}

function addToCart(id, title, price, img, qty=1){
  const cart = loadCart();
  const found = cart.find(i => i.id === id);

  if(found){
      found.qty += qty;
  } else {
      cart.push({ id, title, price, img, qty });
  }

  saveCart(cart);
  updateCartUI();
  showToast(`${title} añadido al carrito`);
}
function quickAddFromCard(btn){
    const id = btn.dataset.id;
    const title = btn.dataset.title;
    const price = Number(btn.dataset.price);
    const img = btn.dataset.img;

    addToCart(id, title, price, img, 1);
}

function removeFromCart(id){
  let cart = loadCart().filter(i => i.id !== id);
  saveCart(cart);
  updateCartUI();
}

function updateQty(id, qty){
  const cart = loadCart();
  const it = cart.find(i => i.id === id);
  if(!it) return;

  it.qty = qty;
  if(it.qty <= 0) removeFromCart(id);
  else saveCart(cart);

  updateCartUI();
}

function cartTotal(){ 
  return loadCart().reduce((s,i)=>s + i.price * i.qty, 0) 
}

function updateCartUI(){
  const badge = document.querySelector('.cart-badge');
  if(badge) badge.textContent = cartCount();

  // renderiza carrito si está en carrito.html
  renderCartPage();

  // actualiza resumen si existe
  updateSummary();
}

function renderCartPage(){
  const wrap = document.getElementById('cart-wrap');
  if(!wrap) return;

  const cart = loadCart();

  if(cart.length === 0){
    wrap.innerHTML = `<p class="small">Tu carrito está vacío.</p>`;
    return;
  }

  let html = "";

  cart.forEach(it => {
    html += `
      <div class="cart-item">

          <img src="${it.img}" class="item-img">

          <div class="item-info">
              <h3 class="item-title">${it.title}</h3>
              <p class="item-brand">Producto estándar</p>
              <p class="item-opts">Cantidad: ${it.qty}</p>
              <a class="item-delivery">Entrega rápida</a>
          </div>

          <div class="item-price">$${it.price.toFixed(0)}</div>

          <div class="item-qty">
              <button class="qty-btn" onclick="updateQty('${it.id}', ${it.qty - 1})">–</button>
              <span class="qty">${it.qty}</span>
              <button class="qty-btn" onclick="updateQty('${it.id}', ${it.qty + 1})">+</button>
              <small class="max">Máx 10 unidades</small>
          </div>

          <button class="item-menu" onclick="removeFromCart('${it.id}')">🗑️</button>
      </div>
    `;
  });

  wrap.innerHTML = html;
}


function updateSummary(){
  const box = document.getElementById("summary-box");
  if(!box) return;

  const total = cartTotal();

  box.innerHTML = `
        <p>Productos (${cartCount()}) <span>$${total.toFixed(0)}</span></p>
        <hr>
        <p class="summary-total">Total: <span>$${total.toFixed(0)}</span></p>

        <button class="buy-btn" onclick="goToPay()" ${cartCount() === 0 ? "disabled" : ""}>
            Continuar compra
        </button>
  `;
}

// pago
function checkoutSimulate() {

  // Datos de compra simulados
  const compra = {
    fecha: new Date().toLocaleString(),
    producto: "Polera Mujer Basement",
    precio: 12990,
    cantidad: 1
  };

  // Guardar en historial (localStorage)
  let historial = JSON.parse(localStorage.getItem("historialCompras")) || [];
  historial.push(compra);
  localStorage.setItem("historialCompras", JSON.stringify(historial));

  // Mensaje de éxito
  document.getElementById("successMsg").style.display = "block";

  // Redirigir después de 2 segundos
  setTimeout(() => {
    window.location.href = "historial.html";
  }, 2000);
}
function borrarHistorial() {
  if (confirm("¿Seguro que deseas borrar todo el historial de compras?")) {
    localStorage.removeItem("historialCompras");
    location.reload(); // Recargar para actualizar la tabla
  }
}
// toast
function showToast(msg){
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.position='fixed'; 
  t.style.right='20px'; 
  t.style.bottom='20px';
  t.style.padding='12px 16px'; 
  t.style.background='rgba(2,6,23,0.9)'; 
  t.style.color='white';
  t.style.borderRadius='10px'; 
  t.style.zIndex=9999; 
  document.body.appendChild(t);

  setTimeout(()=> t.style.opacity='0',2200); 
  setTimeout(()=>t.remove(),2600);
}

document.addEventListener('DOMContentLoaded', updateCartUI);
