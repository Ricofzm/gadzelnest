const params = new URLSearchParams(window.location.search);
const orderId = params.get("id");

loadInvoice();

async function loadInvoice(){

    const { data, error } = await supabaseClient
    .from("orders")
    .select("*")
    .eq("order_id", orderId)
    .single();

    if(error){
        alert(error.message);
        window.location.href = "../index.html";
        return;
    }

    document.getElementById("invoice-order").textContent = data.order_id;
    document.getElementById("invoice-char").textContent = data.char_id;
    document.getElementById("invoice-server").textContent = data.server_id;
    document.getElementById("invoice-voucher").textContent = data.voucher;
    document.getElementById("invoice-payment").textContent = data.payment;
    document.getElementById("invoice-total").textContent = data.total;
    document.getElementById("invoice-status").textContent = data.status;

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

    const orderText = document.getElementById("invoice-order").textContent;

    await navigator.clipboard.writeText(orderText);

    alert("Order ID berhasil disalin.");

});