function activateVoucher() {

    const cards = document.querySelectorAll(".voucher-card");

    const checkoutName = document.getElementById("checkout-name");
    const checkoutPrice = document.getElementById("checkout-price");

    cards.forEach(card => {

        card.onclick = () => {

            cards.forEach(c => c.classList.remove("active"));

            card.classList.add("active");

            checkoutName.textContent = card.dataset.name;
            checkoutPrice.textContent =
                "Rp " + Number(card.dataset.price).toLocaleString("id-ID");

            // Update Ringkasan Pesanan
            document.getElementById("summary-voucher").textContent = card.dataset.name;

            document.getElementById("summary-total").textContent =
                "Rp " + Number(card.dataset.price).toLocaleString("id-ID");
                
            document.getElementById("checkoutBtn").disabled = false;

        };

    });

}

const charInput = document.getElementById("charId");
const serverInput = document.getElementById("serverId");

charInput.addEventListener("input", () => {
    document.getElementById("summary-char").textContent =
        charInput.value || "-";
});

serverInput.addEventListener("input", () => {
    document.getElementById("summary-server").textContent =
        serverInput.value || "-";
});

const payments = document.querySelectorAll(".payment-card");

payments.forEach(payment => {

    payment.addEventListener("click", () => {

        payments.forEach(p => p.classList.remove("active"));

        payment.classList.add("active");

    });

});