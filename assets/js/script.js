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
            validateCheckout();
            showToast("✅ Voucher berhasil dipilih");

        };

    });

}

const charInput = document.getElementById("charId");
const serverInput = document.getElementById("serverId");

charInput.addEventListener("input", () => {
    document.getElementById("summary-char").textContent =
        charInput.value || "-";
    validateCheckout();
});

serverInput.addEventListener("input", () => {
    document.getElementById("summary-server").textContent =
        serverInput.value || "-";
    validateCheckout();
});

const payments = document.querySelectorAll(".payment-card");

payments.forEach(payment => {

    payment.addEventListener("click", () => {

        payments.forEach(p => p.classList.remove("active"));

        payment.classList.add("active");

        document.getElementById("summary-payment").textContent =
            payment.textContent;
            
        validateCheckout();
        showToast("💳 Metode pembayaran dipilih");

    });

});

const checkoutBtn = document.getElementById("checkoutBtn");
const modal = document.getElementById("orderModal");

checkoutBtn.addEventListener("click", () => {

    document.getElementById("modal-char").textContent =
        document.getElementById("summary-char").textContent;

    document.getElementById("modal-server").textContent =
        document.getElementById("summary-server").textContent;

    document.getElementById("modal-voucher").textContent =
        document.getElementById("summary-voucher").textContent;

    document.getElementById("modal-payment").textContent =
        document.getElementById("summary-payment").textContent;

    document.getElementById("modal-total").textContent =
        document.getElementById("summary-total").textContent;

    modal.classList.add("active");

});

document.getElementById("closeModal").addEventListener("click", () => {

    modal.classList.remove("active");

});

document.getElementById("continueBtn").addEventListener("click", () => {

    showToast("🎉 Pesanan berhasil dibuat!");

    modal.classList.remove("active");

});

modal.addEventListener("click",(e)=>{

    if(e.target===modal){
    
        modal.classList.remove("active");
    
    }

});

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){
    
        modal.classList.remove("active");
    
    }

});

function validateCheckout(){

    const charId = charInput.value.trim();

    const serverId = serverInput.value.trim();

    const voucher =
        document.getElementById("summary-voucher").textContent;

    const payment =
        document.getElementById("summary-payment").textContent;

    checkoutBtn.disabled = !(
        charId &&
        serverId &&
        voucher !== "-" &&
        payment !== "-"
    );

}

function scrollToTopup(){

    document
    .querySelector(".account-section")
    .scrollIntoView({
    
        behavior:"smooth"
    
    });

}

function showToast(message){

    const toast = document.getElementById("toast");

    const toastMessage = document.getElementById("toast-message");

    toastMessage.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}