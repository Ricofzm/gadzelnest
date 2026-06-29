const params = new URLSearchParams(window.location.search);
const orderId = params.get("id");

if (!orderId) {
    window.location.href = "../index.html";
}

loadInvoice();

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
    document.getElementById("invoice-total").textContent = data.total;

    updateStatusUI(data.status);

    const createdAt = new Date(data.created_at);
    startCountdown(createdAt, data.status);

}

function updateStatusUI(status) {

    const statusEl = document.getElementById("invoice-status");
    const paymentStatus = document.querySelector(".payment-status");
    const confirmBtn = document.getElementById("confirmPayment");

    statusEl.className = status.toLowerCase();

    switch (status) {

        case "Pending":

            statusEl.innerHTML = "🟡 Pending";
            paymentStatus.textContent = "⏳ Menunggu Pembayaran";

            confirmBtn.disabled = false;
            confirmBtn.textContent = "Saya Sudah Bayar";

            break;

        case "Paid":

            statusEl.innerHTML = "🟢 Paid";
            paymentStatus.textContent = "✅ Pembayaran Berhasil";

            confirmBtn.disabled = true;
            confirmBtn.textContent = "Sudah Dibayar";

            break;

        case "Expired":

            statusEl.innerHTML = "🔴 Expired";
            paymentStatus.textContent = "❌ Invoice Kedaluwarsa";

            confirmBtn.disabled = true;
            confirmBtn.textContent = "Invoice Expired";

            document.getElementById("countdown").textContent = "00:00";

            break;
    }

}

function startCountdown(createdAt, status) {

    if (status !== "Pending") return;

    const expireTime = createdAt.getTime() + (15 * 60 * 1000);

    const timer = setInterval(async () => {

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

// Tombol Konfirmasi Bayar
document
    .getElementById("confirmPayment")
    .addEventListener("click", async () => {

        const btn = document.getElementById("confirmPayment");

        btn.disabled = true;
        btn.textContent = "Memproses...";

        const { error } = await supabaseClient
            .from("orders")
            .update({
                status: "Paid"
            })
            .eq("order_id", orderId);

        if (error) {

            alert(error.message);

            btn.disabled = false;
            btn.textContent = "Saya Sudah Bayar";

            return;
        }

        updateStatusUI("Paid");

        alert("Pembayaran berhasil dikonfirmasi.");

    });

// Copy Order ID
document
    .getElementById("copyOrder")
    .addEventListener("click", async () => {

        const order = document.getElementById("invoice-order").textContent;

        await navigator.clipboard.writeText(order);

        alert("Order ID berhasil disalin.");

    });