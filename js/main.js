function goHome(){ location.href="index.html"; }

// 🟣 DARK MODE
function toggleTheme(){
document.body.classList.toggle("dark");
localStorage.setItem("theme",document.body.classList.contains("dark"));
}
if(localStorage.getItem("theme")==="true") document.body.classList.add("dark");

// 🟣 LOGIN FAKE
function login(){
localStorage.setItem("user", document.getElementById("loginUser").value);
location.href="index.html";
}
function logout() {
    localStorage.removeItem("usuarioActivo");
    localStorage.removeItem("user"); // por si usas los dos
    // Puedes limpiar otras cosas si quieres:
    // localStorage.removeItem("carrito");

    location.href = "login.html"; // vuelve al login
}

function register(){
alert("Cuenta creada ✔ Ahora inicia sesión");
location.href="login.html";
}
let u = localStorage.getItem("user");
if(u) document.querySelectorAll("#userArea").forEach(b=>b.innerHTML="👤 "+u);

document.addEventListener("DOMContentLoaded", () => {
    const user = localStorage.getItem("usuarioActivo");
    const userArea = document.getElementById("userArea");

    if (user) {
        userArea.textContent = `Hola, ${user}`;
        userArea.href = "cuenta.html";
    }
});
// 🟣 CARRITO
let carrito = JSON.parse(localStorage.getItem("carrito")||"[]");
updateCarritoUI();

function agregarCarrito(nombre,precio){
carrito.push({nombre,precio});
localStorage.setItem("carrito",JSON.stringify(carrito));
updateCarritoUI();
notif();
}

function updateCarritoUI(){
document.getElementById("cartCount").innerText = carrito.length;
if(document.getElementById("carritoLista")){
document.getElementById("carritoLista").innerHTML =
carrito.map(p=>`<li>${p.nombre} - $${p.precio}</li>`).join("");
document.getElementById("totalCarrito").innerText =
"Total: $" + carrito.reduce((s,p)=>s+p.precio,0);
}
}

function vaciarCarrito(){
carrito=[];
localStorage.removeItem("carrito");
updateCarritoUI();
}

function toggleCarrito(){
document.getElementById("carritoPanel").classList.toggle("show");
}

function notif(){
let n=document.getElementById("notif");
n.classList.add("show");
setTimeout(()=>n.classList.remove("show"),1200);
}

