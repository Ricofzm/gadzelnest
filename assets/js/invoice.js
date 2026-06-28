const order = JSON.parse(localStorage.getItem("order"));

if(order){

    document.getElementById("invoice-char").textContent = order.charId;
    
    document.getElementById("invoice-server").textContent = order.serverId;
    
    document.getElementById("invoice-voucher").textContent = order.voucher;
    
    document.getElementById("invoice-payment").textContent = order.payment;
    
    document.getElementById("invoice-total").textContent = order.total;

}

const orderId = "GN-" + Date.now();

    document(.getElementById("invoice-order").textContent = orderId;