function validateCheckout(){

    const charInput = document.getElementById("charId");
    const serverInput = document.getElementById("serverId");
    const checkoutBtn = document.getElementById("checkoutBtn");

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

window.validateCheckout = validateCheckout;
