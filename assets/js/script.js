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

summaryPayment.textContent = "QRIS";

document
.querySelector(".payment-card")
.classList.add("active");

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

        const total = parseInt(
            summaryTotal.textContent.replace(/[^\d]/g, ""),
            10
        );
    
        const order = {
    
            charId: charInput.value.trim(),
            serverId: serverInput.value.trim(),
            voucher: summaryVoucher.textContent,
            payment: summaryPayment.textContent,
            total: total
    
        };
    
        const res = await fetch(
            "https://gnest-api.enrikofzm.workers.dev/order",
            {
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(order)
            }
        );
    
        const result = await res.json();
    
        if(!result.success){
            throw new Error("Gagal membuat order");
        }
    
        window.location.href =
        `pages/invoice.html?id=${result.orderId}`;
    
    } catch(err){
    
        console.error(err);
    
        alert(
            err?.message ||
            err?.stack ||
            JSON.stringify(err) ||
            String(err)
        );
    
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

const menuBtn = document.getElementById("menuBtn");
const sideMenu = document.getElementById("sideMenu");
const menuOverlay = document.getElementById("menuOverlay");

menuBtn.onclick = () =>{

    sideMenu.classList.add("active");
    menuOverlay.classList.add("active");

}

menuOverlay.onclick = ()=>{

    sideMenu.classList.remove("active");
    menuOverlay.classList.remove("active");

}