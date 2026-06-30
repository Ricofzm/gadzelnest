async function loadProducts(){

    try{

        const response = await fetch("data/products.json");

        const products = await response.json();

        const grid = document.getElementById("voucherGrid");

        let html = "";

        products.forEach(product => {
        
            html += `
                <div class="voucher-card"
                    data-name="${product.name}"
                    data-price="${product.price}">

                    <h3>${product.name}</h3>

                    <p>${product.cash}</p>

                    <span>
                        Rp ${product.price.toLocaleString("id-ID")}
                    </span>

                </div>
            `;

        });
        
        grid.innerHTML = html;

        activateVoucher();

    }catch(err){

        console.error(err);

    }

}

loadProducts();