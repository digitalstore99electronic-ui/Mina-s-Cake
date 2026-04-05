let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    renderCart();
}

function renderCart() {
    const list = document.getElementById('cart-list');
    const totalDisp = document.getElementById('total-price');
    
    if (cart.length === 0) {
        list.innerHTML = "Хоосон байна";
        totalDisp.innerText = "0";
        return;
    }
    
    list.innerHTML = cart.map(i => `<div style="display:flex; justify-content:space-between; margin-bottom:5px;"><span>${i.name}</span><b>${i.price.toLocaleString()}₮</b></div>`).join('');
    total = cart.reduce((sum, i) => sum + i.price, 0);
    totalDisp.innerText = total.toLocaleString();
}

function sendToTelegram() {
    const token = "8613168219:AAGt8Dte3hqEJu1_q8dR1NOYHvOrdSqghns";
    const chatId = "7437596154";
    
    const uName = document.getElementById('user-name').value;
    const uPhone = document.getElementById('user-phone').value;
    const uMsg = document.getElementById('user-msg').value;

    if (!uName || !uPhone || cart.length === 0) {
        alert("Мэдээллээ бүрэн оруулна уу!");
        return;
    }

    const items = cart.map(i => i.name).join(', ');
    const text = `🆕 ШИНЭ ЗАХИАЛГА!\n👤 Нэр: ${uName}\n📞 Утас: ${uPhone}\n🎂 Бараа: ${items}\n💰 Нийт: ${total.toLocaleString()}₮\n📝 Утга: ${uMsg}`;

    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`;

    fetch(url).then(() => {
        alert("Захиалга амжилттай илгээгдлээ!");
        cart = [];
        renderCart();
        document.querySelectorAll('input, textarea').forEach(i => i.value = '');
    });
}
