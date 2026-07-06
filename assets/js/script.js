const charInput = document.getElementById("charId");
const serverInput = document.getElementById("serverId");

const summaryChar =
document.getElementById("summary-char");
const summaryServer =
document.getElementById("summary-server");
const summaryVoucher =
document.getElementById("summary-voucher");
const summaryPayment =
document.getElementById("summary-payment");
const summaryTotal =
document.getElementById("summary-total");

charInput.addEventListener("input", () => {
    charInput.value = charInput.value.replace(/\D/g,"");
    summaryChar.textContent = charInput.value || "-";
    validateCheckout();
});

serverInput.addEventListener("input", () => {
    serverInput.value = serverInput.value.replace(/\D/g,"");
    summaryServer.textContent = serverInput.value || "-";
    validateCheckout();
});

const payments = document.querySelectorAll(".payment-card");
payments.forEach(payment => {
    payment.addEventListener("click", () => {
        payments.forEach(p => p.classList.remove("active"));
        payment.classList.add("active");
        summaryPayment.textContent = payment.textContent;
            
        validateCheckout();
        
        showToast("💳 Metode pembayaran dipilih");
    });
});

const checkoutBtn = document.getElementById("checkoutBtn");
const modal = document.getElementById("orderModal");
const modalChar =
document.getElementById("modal-char");
const modalServer =
document.getElementById("modal-server");
const modalVoucher =
document.getElementById("modal-voucher");
const modalPayment =
document.getElementById("modal-payment");
const modalTotal =
document.getElementById("modal-total");
const closeModalBtn =
document.getElementById("closeModal");

validateCheckout();

checkoutBtn.addEventListener("click", () => {

    modalChar.textContent = summaryChar.textContent;
    modalServer.textContent = summaryServer.textContent;
    modalVoucher.textContent = summaryVoucher.textContent;
    modalPayment.textContent = summaryPayment.textContent;
    modalTotal.textContent = summaryTotal.textContent;

    modal.classList.add("active");

});

closeModalBtn.addEventListener("click", () => {
    modal.classList.remove("active");
});

const continueBtn = document.getElementById("continueBtn");

continueBtn.addEventListener("click", async () => {

    continueBtn.disabled = true;
    continueBtn.textContent = "Memproses...";

    try {

        const order = {

            orderId: generateOrderId(),
            charId: charInput.value.trim(),
            serverId: serverInput.value.trim(),
            voucher: summaryVoucher.textContent,
            payment: summaryPayment.textContent,
            createdAt: new Date().toISOString(),
            total: Number(
                document
                    .getElementById("summary-total")
                    .textContent
                    .replace("Rp", "")
                    .replace(/\./g, "")
                    .trim()
            )

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
            created_at: order.createdAt,
            status: "Pending"

        }]);

        if(error) throw error;

        //localStorage.setItem("order", JSON.stringify(order));

        window.location.href =
        `pages/invoice.html?id=${order.orderId}`;

    } catch(err) {

        console.error(err);

        showToast("❌ Gagal membuat pesanan");

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