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
    
    const createdAt = new Date(data.created_at);
    startCountdown(createdAt);

    document.getElementById("invoice-order").textContent = data.order_id;
    document.getElementById("invoice-char").textContent = data.char_id;
    document.getElementById("invoice-server").textContent = data.server_id;
    document.getElementById("invoice-voucher").textContent = data.voucher;
    document.getElementById("invoice-payment").textContent = data.payment;
    document.getElementById("invoice-total").textContent = data.total;
    
    const status = document.getElementById("invoice-status");
    status.textContent = data.status;
    status.className = data.status.toLowerCase();

}

// Countdown
async function startCountdown(createdAt){

    const expireTime = createdAt.getTime() + (15 * 60 * 1000);

    const timer = setInterval(()=>{

        const now = Date.now();

        const remaining = Math.floor((expireTime - now)/1000);

        if(remaining <= 0){

            clearInterval(timer);

            document.getElementById("countdown").textContent="00:00";

            document.querySelector(".payment-status").textContent =
            "❌ Invoice Kedaluwarsa";

            document.querySelector(".hero-btn").disabled=true;

            document.querySelector(".hero-btn").textContent =
            "Invoice Expired";

            await supabaseClient
            .from("orders")
            .update({
                status: "Expired"
            })
            .eq("order_id", orderId);
            
            return;

        }

        const minute=Math.floor(remaining/60);

        const second=remaining%60;

        document.getElementById("countdown").textContent=
        `${minute}:${second.toString().padStart(2,"0")}`;

    },1000);

}

// Copy Order ID
document.getElementById("copyOrder").addEventListener("click", async () => {

    const orderText = document.getElementById("invoice-order").textContent;

    await navigator.clipboard.writeText(orderText);

    alert("Order ID berhasil disalin.");

});