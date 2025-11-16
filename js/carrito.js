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
