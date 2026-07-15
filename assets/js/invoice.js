let timer;

const params = new URLSearchParams(window.location.search);
const orderId = params.get("id");

if (!orderId) {
    window.location.href = "../index.html";
}

loadInvoice();

setInterval(loadInvoice,3000);

async function loadInvoice() {

    const res = await fetch(
    `https://gnest-api.enrikofzm.workers.dev/invoice?id=${orderId}`
    );
    
    const result = await res.json();
    
    if(!result.success){
    
        alert(result.message);
        location.href="../index.html";
        return;
    
    }
    
    const data = result.data;

    document.getElementById("invoice-order").textContent = data.order_id;
    document.getElementById("invoice-char").textContent = data.char_id;
    document.getElementById("invoice-server").textContent = data.server_id;
    document.getElementById("invoice-voucher").textContent = data.voucher;
    document.getElementById("invoice-payment").textContent = data.payment;
    document.getElementById("invoice-total").textContent =
    "Rp " + Number(data.total).toLocaleString("id-ID");

    updateStatusUI(data.status);

    const createdAt = data.created_at
    ? new Date(data.created_at)
    : new Date();

    startCountdown(createdAt, data.status);

}

function updateStatusUI(status){

    const statusEl =
    document.getElementById("invoice-status");

    const paymentStatus =
    document.querySelector(".payment-status");

    statusEl.className =
    status.toLowerCase();

    switch(status){

        case "Pending":

            statusEl.textContent = "🟡 Pending";

            paymentStatus.className =
            "payment-status waiting";

            paymentStatus.textContent =
            "⏳ Menunggu Pembayaran";

            break;

        case "Paid":

            statusEl.textContent = "🟢 Paid";

            paymentStatus.className =
            "payment-status success";

            paymentStatus.textContent =
            "✅ Pembayaran Berhasil";

            clearInterval(timer);

            break;

        case "Expired":

            statusEl.textContent = "🔴 Expired";

            paymentStatus.className =
            "payment-status expired-box";

            paymentStatus.textContent =
            "❌ Invoice Kedaluwarsa";

            document.getElementById("countdown").textContent =
            "00:00";

            clearInterval(timer);

            break;

    }

}

function startCountdown(createdAt, status){

    clearInterval(timer);

    if(status !== "Pending"){
        document.getElementById("countdown").textContent="00:00";
        return;
    }

    const expireTime = createdAt.getTime() + (15 * 60 * 1000);

    timer = setInterval(()=>{

        const remaining = Math.floor(
            (expireTime - Date.now()) / 1000
        );

        if(remaining <= 0){

            clearInterval(timer);

            document.getElementById("countdown").textContent="00:00";

            return;

        }

        const minute = Math.floor(remaining / 60);
        const second = remaining % 60;

        document.getElementById("countdown").textContent =
            `${minute}:${second.toString().padStart(2,"0")}`;

    },1000);

}

// Copy Order ID
document
    .getElementById("copyOrder")
    .addEventListener("click", async () => {

        const order = document.getElementById("invoice-order").textContent;
        await navigator.clipboard.writeText(order);

        alert("Order ID berhasil disalin.");

    });