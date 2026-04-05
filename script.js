let cart = [];

function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo({top: 0, behavior: 'smooth'});
    if(id === 'payment-page') renderCart();
}

function updateFruitPrice(selectElement) {
    const price = parseInt(selectElement.value);
    document.getElementById('fruit-display-price').innerText = price.toLocaleString() + " ₮";
}

function addToCart(name, price) {
    cart.push({ name: name, price: price });
    updateUI();
}

function addFruitCake() {
    const s = document.getElementById('special-fruit');
    const totalPrice = parseInt(s.value);
    const fruitName = s.options[s.selectedIndex].text.split(' (')[0];
    cart.push({ name: `Жимстэй бялуу (${fruitName})`, price: totalPrice });
    updateUI();
}

function updateUI() {
    document.getElementById('cart-count').innerText = cart.length;
    alert("Сагсанд амжилттай нэмэгдлээ!");
}

function renderCart() {
    const list = document.getElementById('cart-items-list');
    const delivery = parseInt(document.getElementById('delivery-select').value) || 0;
    list.innerHTML = cart.map(i => `<div style="display:flex; justify-content:space-between; margin:10px 0;"><span>${i.name}</span><b>${i.price.toLocaleString()}₮</b></div>`).join('');
    const subtotal = cart.reduce((a, b) => a + b.price, 0);
    document.getElementById('total-amount').innerText = (subtotal + delivery).toLocaleString();
}

function copyAcc() {
    navigator.clipboard.writeText("5465121770").then(() => {
        alert("Амжилттай хууллаа");
    });
}

async function sendToTelegram() {
    const phone = document.getElementById('user-phone').value;
    const photo = document.getElementById('receipt-img').files[0];
    if(!phone || !photo || cart.length === 0) return alert("Мэдээллээ бүрэн бөглөнө үү!");

    const token = "8613168219:AAGt8Dte3hqEJu1_q8dR1NOYHvOrdSqghns";
    const chatId = "7437596154";
    const cakeList = cart.map(i => i.name).join(', ');
    const total = document.getElementById('total-amount').innerText;
    
    const text = `🎂 ШИНЭ ЗАХИАЛГА\n\n📞 Утас: ${phone}\n🍰 Бялуу: ${cakeList}\n💰 Нийт: ${total}₮`;

    const formData = new FormData();
    formData.append("chat_id", chatId);
    formData.append("photo", photo);
    formData.append("caption", text);

    try {
        const res = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, { method: "POST", body: formData });
        if(res.ok) {
            alert("Захиалга илгээгдлээ!");
            cart = [];
            location.reload();
        }
    } catch(e) { alert("Алдаа гарлаа!"); }
}
