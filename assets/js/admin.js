checkLogin();

async function checkLogin(){

    const {
        data:{session}
    }=await supabaseClient.auth.getSession();

    if(!session){

        location.href="/admin/login.html";
        return;

    }

    loadOrders();

}

async function loadOrders(){

    const { data, error } = await supabaseClient
        .from("orders")
        .select("*")
        .order("created_at",{ascending:false});

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if(error){
        alert(error.message);
        return;
    }

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

    const { error } = await supabaseClient
    .from("orders")
    .update({
        status:status
    })
    .eq("order_id",orderId);

    if(error){

        alert(error.message);
        return;

    }

    loadOrders();

}

document
.getElementById("search")
.addEventListener("input",async(e)=>{

    const keyword = e.target.value;

    let query = supabaseClient
    .from("orders")
    .select("*")
    .order("created_at",{ascending:false});

    if(keyword){

        query = query.ilike("order_id",`%${keyword}%`);

    }

    const { data } = await query;

    renderDashboard(data);

});

document
.getElementById("logoutBtn")
.addEventListener("click",async()=>{

    await supabaseClient.auth.signOut();

    location.href="/admin/login.html";

});