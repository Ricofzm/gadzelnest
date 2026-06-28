const order = JSON.parse(localStorage.getItem("order"));

if(!order){
    window.location.href="../index.html";

// Isi data invoice
if (order) {

    document.getElementById("invoice-char").textContent = order.charId;

    document.getElementById("invoice-server").textContent = order.serverId;

    document.getElementById("invoice-voucher").textContent = order.voucher;

    document.getElementById("invoice-payment").textContent = order.payment;

    document.getElementById("invoice-total").textContent = order.total;

}

// Countdown
let time = 15 * 60;

const timer = setInterval(() => {

    const minute = Math.floor(time / 60);

    const second = time % 60;

    document.getElementById("countdown").textContent =
        `${minute}:${second.toString().padStart(2, "0")}`;

    if(time <= 0){

        clearInterval(timer);
    
        document.querySelector(".payment-status").textContent =
        "❌ Invoice Kedaluwarsa";
    
        document.querySelector(".hero-btn").disabled = true;
        document.querySelector(".hero-btn").textContent =
        "Invoice Expired";
    
    }

    time--;

}, 1000);

// Copy Order ID
document.getElementById("copyOrder").addEventListener("click", async () => {

    const orderId =
        document.getElementById("invoice-order").textContent;

    await navigator.clipboard.writeText(orderId);

    alert("Order ID berhasil disalin.");

});