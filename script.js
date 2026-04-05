let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    renderCart();
}

function addFruitCake() {
    const select = document.getElementById('fruit-type');
    const value = select.value.split('-');
    const name = "Cheesecake (" + value[0] + ")";
    const price = parseInt(value[1]);
    addToCart(name, price);
}

function renderCart() {
    const list = document.getElementById('cart-list');
    const totalDisp = document.getElementById('total-price');
    
    if (cart.length === 0) {
        list.innerHTML = "Хоосон байна";
        totalDisp.innerText = 0;
        return;
    }
    
    list.innerHTML = cart.map((item, index) => 
        `<div style="display:flex; justify-content:space-between; margin-bottom:5px;">
            <span>${item.name}</span>
            <b>${item.price.toLocaleString()}₮</b>
        </div>`
    ).join('');
    
    total = cart.reduce((sum, i) => sum + i.price, 0);
    totalDisp.innerText = total.toLocaleString();
}

function sendToTelegram() {
    const token = "8613168219:AAGt8Dte3hqEJu1_q8dR1NOYHvOrdSqghns";
    const chatId = "7437596154";
    
    const uName = document.getElementById('name').value;
    const uPhone = document.getElementById('phone').value;
    const uMsg = document.getElementById('msg').value;

    if (!uName || !uPhone || cart.length === 0) {
        alert("Нэр, утас болон сагсаа шалгана уу!");
        return;
    }

    let itemsText = cart.map(i => `• ${i.name} (${i.price}₮)`).join('\n');
    
    const text = `
🆕 ШИНЭ ЗАХИАЛГА!
━━━━━━━━━━━━━━
👤 Нэр: ${uName}
📞 Утас: ${uPhone}

🎂 Бялуунууд:
${itemsText}

💰 Нийт: ${total.toLocaleString()}₮
📝 Тайлабар: ${uMsg}
━━━━━━━━━━━━━━
💳 Хаан Банк руу шилжүүлсэн.
    `;

    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`;

    fetch(url).then(res => {
        if(res.ok) {
            alert("Амжилттай илгээгдлээ! Төлбөрөө шилжүүлж дуусгаснаар захиалга баталгаажна.");
            cart = [];
            renderCart();
            document.querySelectorAll('input, textarea').forEach(i => i.value = "");
        }
    });
}

