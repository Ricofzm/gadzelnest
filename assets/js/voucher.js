function activateVoucher() {

    const cards = document.querySelectorAll(".voucher-card");
    const checkoutName = document.getElementById("checkout-name");
    const checkoutPrice = document.getElementById("checkout-price");

    cards.forEach(card => {
        card.addEventListener("click",()=>{
            cards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");

            checkoutName.textContent = card.dataset.name;
            checkoutPrice.textContent =
                "Rp " + Number(card.dataset.price).toLocaleString("id-ID");

            // Update Ringkasan Pesanan
            document.getElementById("summary-voucher").textContent = card.dataset.name;
            document.getElementById("summary-total").textContent =
                "Rp " + Number(card.dataset.price).toLocaleString("id-ID");
                
            validateCheckout();
            showToast("✅ Voucher berhasil dipilih");
        });
    });
}

window.activateVoucher = activateVoucher;
