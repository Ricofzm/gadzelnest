let selectedProduct = null;

const cards = document.querySelectorAll(".voucher-card");

const checkoutName = document.getElementById("checkout-name");
const checkoutPrice = document.getElementById("checkout-price");

cards.forEach(card => {

    card.addEventListener("click", () => {

        cards.forEach(c => c.classList.remove("active"));

        card.classList.add("active");

        const name = card.dataset.name;
        const price = Number(card.dataset.price);

        checkoutName.textContent = name;
        checkoutPrice.textContent =
            "Rp " + price.toLocaleString("id-ID");

    });

});