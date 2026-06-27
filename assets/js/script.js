function activateVoucher(){

    const cards=document.querySelectorAll(".voucher-card");

    const checkoutName=document.getElementById("checkout-name");

    const checkoutPrice=document.getElementById("checkout-price");

    cards.forEach(card=>{

        card.onclick=()=>{

            cards.forEach(c=>c.classList.remove("active"));

            card.classList.add("active");

            checkoutName.innerHTML=card.dataset.name;

            checkoutPrice.innerHTML="Rp "+Number(card.dataset.price).toLocaleString("id-ID");

        }

    });

}