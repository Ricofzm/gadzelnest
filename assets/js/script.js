let selectedProduct = null;

const cards = document.querySelectorAll(".voucher-card");

const prices = [
    12850,
    65921,
    131850,
    259900
];

cards.forEach((card, index) => {

    card.addEventListener("click", () => {

        cards.forEach(c => c.classList.remove("active"));

        card.classList.add("active");

        document.getElementById("checkout-price").innerHTML =
            "Rp " + prices[index].toLocaleString("id-ID");

        document.getElementById("checkout-name").innerHTML =
            card.querySelector("h3").innerHTML;

    });

});