let toastTimeout;

function showToast(message){

    const toast=document.getElementById("toast");

    const toastMessage=document.getElementById("toast-message");

    clearTimeout(toastTimeout);

    toastMessage.textContent=message;

    toast.classList.add("show");

    toastTimeout=setTimeout(()=>{

        toast.classList.remove("show");

    },2500);

}

window.showToast = showToast;
