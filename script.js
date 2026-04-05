let cart = [];

function addToCart(name, price) {
    cart.push({ name, price });
    renderCart();
}

function addFruit() {
    const s = document.getElementById('fruit-cake');
    const [name, price] = s.value.split('-');
    addToCart("Жимстэй: " + name, parseInt(price));
}

function addDIY() {
    const extra = parseInt(document.getElementById('diy-extra').value) || 0;
    const finalPrice = 23000 + (extra * 1000);
    addToCart(`DIY (${3 + extra} өнгө)`, finalPrice);
}

function renderCart() {
    const list = document.getElementById('cart-items');
    const totalDisp = document.getElementById('total');
    if(cart.length === 0) { list.innerHTML = "Сагс хоосон"; return; }
    
    list.innerHTML = cart.map(i => `<p>${i.name} - ${i.price}₮</p>`).join('');
    const sum = cart.reduce((a, b) => a + b.price, 0);
    totalDisp.innerText = sum.toLocaleString();
}

function copyBank() {
    const acc = document.getElementById('bank-acc').innerText;
    navigator.clipboard.writeText(acc).then(() => alert("Данс амжилттай хуулагдлаа!"));
}

async function sendOrder() {
    const token = "8613168219:AAGt8Dte3hqEJu1_q8dR1NOYHvOrdSqghns";
    const chatId = "7437596154";
    const phone = document.getElementById('user-phone').value;
    const file = document.getElementById('receipt-img').files[0];

    if (!phone || !file || cart.length === 0) return alert("Мэдээллээ бүрэн бөглөнө үү!");

    const text = `🎂 ШИНЭ ЗАХИАЛГА\n📞 Утас: ${phone}\n🛒 Бараа: ${cart.map(i => i.name).join(', ')}\n💰 Нийт: ${cart.reduce((a,b)=>a+b.price,0)}₮`;

    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('photo', file);
    formData.append('caption', text);

    const res = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
        method: 'POST',
        body: formData
    });

    if(res.ok) {
        alert("Захиалга баримтын хамт амжилттай илгээгдлээ!");
        cart = []; renderCart();
    }
}
