let cart = [];

function addToCart(name, price) {
    cart.push({ name, price });
    updateCartCount();
    alert(name + " сагсанд нэмэгдлээ!");
}

function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.length;
}

function addFruitCake() {
    const s = document.getElementById('fruit-type');
    const [name, price] = s.value.split('-');
    addToCart(`Жимстэй (${name})`, parseInt(price));
}

function addDIY() {
    const extra = parseInt(document.getElementById('diy-extra').value) || 0;
    const finalPrice = 23000 + (extra * 1000);
    addToCart(`DIY (${3 + extra} өнгө)`, finalPrice);
}

function showPayment() {
    if (cart.length === 0) return alert("Сагс хоосон байна!");
    document.getElementById('payment-page').style.display = 'block';
    renderCartItems();
}

function hidePayment() {
    document.getElementById('payment-page').style.display = 'none';
}

function renderCartItems() {
    const list = document.getElementById('cart-items-list');
    const totalDisp = document.getElementById('total-amount');
    
    list.innerHTML = cart.map(item => `
        <div style="display:flex; justify-content:space-between; padding: 10px 0; border-bottom: 1px solid #f9f9f9;">
            <span>${item.name}</span>
            <b>${item.price.toLocaleString()}₮</b>
        </div>
    `).join('');
    
    const sum = cart.reduce((a, b) => a + b.price, 0);
    totalDisp.innerText = sum.toLocaleString();
}

function copyAccount() {
    const acc = document.getElementById('acc-number').innerText;
    navigator.clipboard.writeText(acc).then(() => alert("Данс хуулагдлаа!"));
}

async function sendToTelegram() {
    const phone = document.getElementById('user-phone').value;
    const receipt = document.getElementById('receipt-file').files[0];
    const token = "8613168219:AAGt8Dte3hqEJu1_q8dR1NOYHvOrdSqghns";
    const chatId = "7437596154";

    if (!phone || !receipt) return alert("Утас болон баримтаа оруулна уу!");

    const itemsText = cart.map(i => i.name).join(", ");
    const total = document.getElementById('total-amount').innerText;
    
    const message = `🎂 ШИНЭ ЗАХИАЛГА\n📞 Утас: ${phone}\n🛒 Бараа: ${itemsText}\n💰 Нийт: ${total}₮`;

    const formData = new FormData();
    formData.append("chat_id", chatId);
    formData.append("photo", receipt);
    formData.append("caption", message);

    const res = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
        method: "POST",
        body: formData
    });

    if (res.ok) {
        alert("Захиалга илгээгдлээ!");
        cart = [];
        location.reload();
    }
}
