checkSession();

async function checkSession(){

    const form=document.getElementById("loginForm");
    const msg=document.getElementById("msg");
    
    form.addEventListener("submit",async(e)=>{
    
        e.preventDefault();
    
        const email=document.getElementById("email").value;
        const password=document.getElementById("password").value;
    
        const res=await fetch(
            "https://gnest-api.enrikofzm.workers.dev/login",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email,
                    password
                })
            }
        );
    
        const result=await res.json();
    
        if(!result.success){
    
            msg.textContent=result.message;
            return;
    
        }
    
        localStorage.setItem("admin_token",result.token);
    
        location.href="/admin/admin.html";
    
    });

});