let cart = [];

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    window.scrollTo(0,0);
    if(pageId === 'payment-page') renderCart();
}

function addToCart(name, price) {
    cart.push({ name, price });
    document.getElementById('cart-count').innerText = cart.length;
    alert(name + " сагслагдлаа!");
}

function addFruitCake() {
    const s = document.getElementById('fruit-select');
    const [name, price] = s.value.split('-');
    addToCart(`Жимстэй (${name})`, parseInt(price));
}

function addDIY() {
    const extra = parseInt(document.getElementById('diy-val').value) || 0;
    addToCart(`DIY (${3+extra} өнгө)`, 23000 + (extra * 1000));
}

function renderCart() {
    const list = document.getElementById('cart-items-list');
    const totalDisp = document.getElementById('total-amount');
    list.innerHTML = cart.length === 0 ? "Хоосон" : cart.map(i => `<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #eee;"><span>${i.name}</span><b>${i.price.toLocaleString()}₮</b></div>`).join('');
    const sum = cart.reduce((a, b) => a + b.price, 0);
    totalDisp.innerText = sum.toLocaleString();
}

function copyAcc() {
    navigator.clipboard.writeText("5465121770");
    alert("Данс хуулагдлаа!");
}

async function sendOrder() {
    const phone = document.getElementById('phone').value;
    const file = document.getElementById('receipt').files[0];
    if(!phone || !file || cart.length === 0) return alert("Мэдээллээ бүрэн бөглөнө үү!");

    const token = "8613168219:AAGt8Dte3hqEJu1_q8dR1NOYHvOrdSqghns";
    const chatId = "7437596154";
    const text = `🎂 ШИНЭ ЗАХИАЛГА\n📞 Утас: ${phone}\n🛒 Бараа: ${cart.map(i=>i.name).join(', ')}\n💰 Нийт: ${document.getElementById('total-amount').innerText}₮`;

    const fd = new FormData();
    fd.append("chat_id", chatId);
    fd.append("photo", file);
    fd.append("caption", text);

    const res = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, { method: "POST", body: fd });
    if(res.ok) { alert("Амжилттай!"); cart=[]; location.reload(); }
}

