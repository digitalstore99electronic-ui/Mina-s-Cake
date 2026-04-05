let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    renderCart();
}

function renderCart() {
    const list = document.getElementById('cart-list');
    const totalDisp = document.getElementById('total-price');
    list.innerHTML = cart.map(i => `<p>${i.name} - ${i.price}₮</p>`).join('');
    total = cart.reduce((sum, i) => sum + i.price, 0);
    totalDisp.innerText = total.toLocaleString();
}

function sendToTelegram() {
    const token = "8613168219:AAGt8Dte3hqEJu1_q8dR1NOYHvOrdSqghns";
    const chatId = "7437596154";
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const msg = document.getElementById('msg').value;

    if(!name || !phone || cart.length === 0) return alert("Мэдээллээ бүрэн бөглөнө үү!");

    const text = `🎂 ШИНЭ ЗАХИАЛГА!\nНэр: ${name}\nУтас: ${phone}\nБараа: ${cart.map(i => i.name).join(', ')}\nНийт: ${total}₮\nТайлбар: ${msg}`;
    
    fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`)
    .then(() => alert("Захиалга илгээгдлээ!"));
}

