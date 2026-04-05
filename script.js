let cart = [];

function addToCart(name, price) {
    cart.push({ name, price });
    renderCart();
}

function addFruitCake() {
    const s = document.getElementById('fruit-type');
    const [name, price] = s.value.split('-');
    addToCart(`Жимстэй (${name})`, parseInt(price));
}

function addDIY() {
    const extra = parseInt(document.getElementById('extra-color').value) || 0;
    const finalPrice = 23000 + (extra * 1000);
    addToCart(`DIY (${3 + extra} өнгө)`, finalPrice);
}

function renderCart() {
    const list = document.getElementById('cart-list');
    const totalDisp = document.getElementById('total-price');
    if (cart.length === 0) { list.innerHTML = "Хоосон"; totalDisp.innerText = "0"; return; }
    
    list.innerHTML = cart.map(i => `<p>${i.name} - ${i.price.toLocaleString()}₮</p>`).join('');
    const total = cart.reduce((a, b) => a + b.price, 0);
    totalDisp.innerText = total.toLocaleString();
}

function copyAcc() {
    const acc = document.getElementById('acc-num').innerText;
    navigator.clipboard.writeText(acc).then(() => alert("Дансны дугаар амжилттай хуулагдлаа!"));
}

async function sendOrder() {
    const token = "8613168219:AAGt8Dte3hqEJu1_q8dR1NOYHvOrdSqghns";
    const chatId = "7437596154";
    const phone = document.getElementById('phone').value;
    const file = document.getElementById('receipt').files[0];

    if (!phone || !file || cart.length === 0) return alert("Мэдээллээ бүрэн бөглөнө үү!");

    const text = `🎂 ШИНЭ ЗАХИАЛГА\n📞 Утас: ${phone}\n🛒 Бараа: ${cart.map(i => i.name).join(', ')}\n💰 Нийт: ${document.getElementById('total-price').innerText}₮`;

    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('photo', file);
    formData.append('caption', text);

    const res = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
        method: 'POST',
        body: formData
    });

    if (res.ok) {
        alert("Амжилттай илгээгдлээ!");
        cart = []; renderCart();
    } else {
        alert("Алдаа гарлаа. Дахин оролдоно уу.");
    }
}

