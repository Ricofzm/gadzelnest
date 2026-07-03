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

    if(error){

        alert(error.message);
        return;

    }

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

        <div class="summary-card" style="margin-bottom:20px">

            <div class="summary-row">
                <span>Order</span>
                <strong>${order.order_id}</strong>
            </div>

            <div class="summary-row">
                <span>Char ID</span>
                <strong>${order.char_id}</strong>
            </div>

            <div class="summary-row">
                <span>Voucher</span>
                <strong>${order.voucher}</strong>
            </div>

            <div class="summary-row">
                <span>Total</span>
                <strong>${order.total}</strong>
            </div>

            <div class="summary-row">
                <span>Status</span>
                <strong>${order.status}</strong>
            </div>

            <button onclick="changeStatus('${order.order_id}','Paid')">
                Paid
            </button>

            <button onclick="changeStatus('${order.order_id}','Expired')">
                Expired
            </button>

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