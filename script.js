let cart = [];

function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if(id === 'payment-page') renderCart();
}

function addToCart(name, price) {
    cart.push({ name, price });
    document.getElementById('cart-count').innerText = cart.length;
}

function renderCart() {
    const list = document.getElementById('cart-list');
    const totalDisp = document.getElementById('final-total');
    
    list.innerHTML = cart.length === 0 ? "Сагс хоосон байна." : cart.map(i => `
        <div style="display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #f9f9f9;">
            <span>${i.name}</span>
            <b>${i.price.toLocaleString()}₮</b>
        </div>
    `).join('');
    
    const sum = cart.reduce((a, b) => a + b.price, 0);
    totalDisp.innerText = sum.toLocaleString();
}

function copyAcc() {
    navigator.clipboard.writeText("5465121770");
    alert("Данс хуулагдлаа!");
}

async function sendOrder() {
    const phone = document.getElementById('user-tel').value;
    const file = document.getElementById('receipt-img').files[0];
    
    if(!phone || !file || cart.length === 0) return alert("Мэдээлэл дутуу байна!");

    const token = "8613168219:AAGt8Dte3hqEJu1_q8dR1NOYHvOrdSqghns";
    const chatId = "7437596154";
    const msg = `🎂 ШИНЭ ЗАХИАЛГА\n📞 Утас: ${phone}\n🛒 Бараа: ${cart.map(i=>i.name).join(', ')}\n💰 Нийт: ${document.getElementById('final-total').innerText}₮`;

    const fd = new FormData();
    fd.append("chat_id", chatId);
    fd.append("photo", file);
    fd.append("caption", msg);

    const res = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, { method: "POST", body: fd });
    if(res.ok) { alert("Захиалга илгээгдлээ!"); cart=[]; location.reload(); }
}
