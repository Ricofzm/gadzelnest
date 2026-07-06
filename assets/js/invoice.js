let timer;

const params = new URLSearchParams(window.location.search);
const orderId = params.get("id");

if (!orderId) {
    window.location.href = "../index.html";
}

loadInvoice();

supabaseClient
.channel("invoice-status")
.on(
    "postgres_changes",
    {
        event: "UPDATE",
        schema: "public",
        table: "orders",
        filter: `order_id=eq.${orderId}`
    },
    ({ new: order }) => {

        updateStatusUI(order.status);
    
        if (order.status !== "Pending") {
            clearInterval(timer);
        }
    
        document.getElementById("invoice-total").textContent =
            "Rp " + Number(order.total).toLocaleString("id-ID");
    
    }
)
.subscribe();

async function loadInvoice() {

    const { data, error } = await supabaseClient
        .from("orders")
        .select("*")
        .eq("order_id", orderId)
        .single();

    if (error) {
        alert(error.message);
        window.location.href = "../index.html";
        return;
    }

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

function startCountdown(createdAt, status) {
    
    clearInterval(timer);

    if (status !== "Pending") return;

    const expireTime = createdAt.getTime() + (15 * 60 * 1000);
    timer = setInterval(async () => {
        
        const now = Date.now();
        const remaining = Math.floor((expireTime - now) / 1000);
        if (remaining <= 0) {

            clearInterval(timer);

            document.getElementById("countdown").textContent = "00:00";

            await supabaseClient
                .from("orders")
                .update({
                    status: "Expired"
                })
                .eq("order_id", orderId);

            updateStatusUI("Expired");

            return;
        }

        const minute = Math.floor(remaining / 60);
        const second = remaining % 60;

        document.getElementById("countdown").textContent =
            `${minute}:${second.toString().padStart(2, "0")}`;

    }, 1000);

}

// Copy Order ID
document
    .getElementById("copyOrder")
    .addEventListener("click", async () => {

        const order = document.getElementById("invoice-order").textContent;
        await navigator.clipboard.writeText(order);

        alert("Order ID berhasil disalin.");

    });