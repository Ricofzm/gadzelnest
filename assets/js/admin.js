let allOrders = [];

function checkLogin(){

    const token=localStorage.getItem("admin_token");

    if(!token){

        location.href="/admin/login.html";
        return;

    }

    loadOrders();

}

checkLogin();

async function loadOrders(){

    const res = await fetch(
        "https://gnest-api.enrikofzm.workers.dev/orders",
        {
            headers:{
                Authorization:
                `Bearer ${localStorage.getItem("admin_token")}`
            }
        }
    );
    
    const result = await res.json();
    
    if(!result.success){
        alert("Gagal mengambil data");
        return;
    }
    
    const data = result.data;
    
    allOrders = data;

    document.getElementById("totalOrder").textContent = data.length;

    renderDashboard(data);
}

function renderDashboard(data){

    document.getElementById("totalOrder").textContent =
    data.length;

    document.getElementById("pendingOrder").textContent =
    data.filter(o=>o.status==="Pending").length;

    document.getElementById("paidOrder").textContent =
    data.filter(o=>o.status==="Paid").length;

    document.getElementById("expiredOrder").textContent =
    data.filter(o=>o.status==="Expired").length;

    const list = document.getElementById("orderList");

    list.innerHTML = "";

    data.forEach(order=>{

        list.innerHTML += `

            <div class="order-card">
            
                <div class="order-top">
                
                    <div>
                    
                        <h3>${order.order_id}</h3>
                        
                        <p>${order.created_at ?? "-"}</p>
                    
                    </div>
                
                <span class="status-badge ${order.status.toLowerCase()}">
                ${order.status}
                </span>
                
                </div>
                
                <div class="order-grid">
                
                    <div>
                    <small>Character</small>
                    <b>${order.char_id}</b>
                    </div>
                    
                    <div>
                    <small>Server</small>
                    <b>${order.server_id}</b>
                    </div>
                    
                    <div>
                    <small>Voucher</small>
                    <b>${order.voucher}</b>
                    </div>
                    
                    <div>
                    <small>Total</small>
                    <b>Rp ${Number(order.total).toLocaleString("id-ID")}</b>
                    </div>
                    
                    <div>
                    <small>Payment</small>
                    <b>${order.payment}</b>
                    </div>
                
                </div>
                
                <div class="order-actions">
                
                    <button
                    class="paid-btn"
                    onclick="changeStatus('${order.order_id}','Paid')">
                    
                    Paid
                    
                    </button>
                    
                    <button
                    class="expired-btn"
                    onclick="changeStatus('${order.order_id}','Expired')">
                    
                    Expired
                    
                    </button>
                
                </div>
            
            </div>
        
        `;

    });

}

async function changeStatus(orderId,status){

    await fetch(
        "https://gnest-api.enrikofzm.workers.dev/status",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:
                `Bearer ${localStorage.getItem("admin_token")}`
            },
            body:JSON.stringify({
                orderId,
                status
            })
        }
    );

    loadOrders();

}

document
.getElementById("search")
.addEventListener("input",(e)=>{

    const keyword = e.target.value.toLowerCase();

    const filtered = allOrders.filter(order=>

        order.order_id.toLowerCase().includes(keyword) ||

        order.char_id.toLowerCase().includes(keyword)

    );

    renderDashboard(filtered);

});

document
.getElementById("logoutBtn")
.addEventListener("click",()=>{

    localStorage.removeItem("admin_token");

    location.href="/admin/login.html";

});