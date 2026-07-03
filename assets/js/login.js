checkSession();

async function checkSession(){

    const {
        data:{session}
    }=await supabaseClient.auth.getSession();

    if(session){

        location.href="/admin/admin.html";

    }

}

const form = document.getElementById("loginForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", async (e)=>{

    e.preventDefault();

    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;

    const {error}=await supabaseClient.auth.signInWithPassword({
        email,
        password
    });

    if(error){
        msg.textContent=error.message;
        return;
    }

    location.href="/admin/admin.html";

});