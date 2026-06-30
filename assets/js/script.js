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

validateCheckout();

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

const continueBtn = document.getElementById("continueBtn");

continueBtn.addEventListener("click", async () => {

    continueBtn.disabled = true;
    continueBtn.textContent = "Memproses...";

    try {

        const order = {

            orderId: "GN-" + Date.now(),

            charId: charInput.value.trim(),

            serverId: serverInput.value.trim(),

            voucher: document.getElementById("summary-voucher").textContent,

            payment: document.getElementById("summary-payment").textContent,

            total: document.getElementById("summary-total").textContent

        };

        const { error } = await supabaseClient
        .from("orders")
        .insert([{

            order_id: order.orderId,
            char_id: order.charId,
            server_id: order.serverId,
            voucher: order.voucher,
            payment: order.payment,
            total: order.total,
            status: "Pending"

        }]);

        if(error) throw error;

        localStorage.setItem("order", JSON.stringify(order));

        window.location.href =
        `pages/invoice.html?id=${order.orderId}`;

    } catch(err) {

        console.error(err);

        alert("Gagal membuat pesanan.\n" + err.message);

    } finally {

        continueBtn.disabled = false;
        continueBtn.textContent = "Lanjut Bayar";

    }

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

function scrollToTopup(){

    document
    .querySelector(".account-section")
    .scrollIntoView({
    
        behavior:"smooth"
    
    });

}