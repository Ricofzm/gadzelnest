// ==========================
// GENERATE ORDER ID
// ==========================

function generateOrderId() {

    const now = new Date();

    return `GN-${
        now.getFullYear()
    }${
        String(now.getMonth() + 1).padStart(2, "0")
    }${
        String(now.getDate()).padStart(2, "0")
    }-${
        Date.now().toString().slice(-6)
    }`;

}
