let cart = [];

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if(pageId === 'payment-page') renderCart();
}

function addToCart(name, price) {
    cart.push({ name, price });
    document.getElementById('cart-count').innerText = cart.length;
    alert(name + " сагсанд нэмэгдлээ!");
}

function renderCart() {
    const list = document.getElementById('cart-items-list');
    const totalDisp = document.getElementById('total-amount');
    
    const fruitPrice = parseInt(document.getElementById('fruit-select').value) || 0;
    const deliveryPrice = parseInt(document.getElementById('delivery-select').value) || 0;
    
    if(cart.length === 0) {
        list.innerHTML = "<p style='text-align:center; color:#999;'>Сагс хоосон байна.</p>";
    } else {
        list.innerHTML = cart.map(i => `
            <div style="display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #f5f5f5;">
                <span>${i.name}</span>
                <b>${i.price.toLocaleString()}₮</b>
            </div>
        `).join('');
    }
    
    const sum = cart.reduce((a, b) => a + b.price, 0) + fruitPrice + deliveryPrice;
    totalDisp.innerText = sum.toLocaleString();
}

function copyAcc() {
    navigator.clipboard.writeText("5465121770");
    alert("Дансны дугаар хуулагдлаа!");
}

async function sendOrder() {
    const phone = document.getElementById('phone').value;
    const file = document.getElementById('receipt').files[0];
    const fruitName = document.getElementById('fruit-select').options[document.getElementById('fruit-select').selectedIndex].text;
    const deliveryType = document.getElementById('delivery-select').options[document.getElementById('delivery-select').selectedIndex].text;
    
    if(!phone || !file || cart.length === 0) return alert("Мэдээлэл дутуу байна!");

    const token = "8613168219:AAGt8Dte3hqEJu1_q8dR1NOYHvOrdSqghns";
    const chatId = "7437596154";
    const text = `🎂 ШИНЭ ЗАХИАЛГА (Дундговь)\n━━━━━━━━━━━━\n📞 Утас: ${phone}\n🛒 Бялуу: ${cart.map(i=>i.name).join(', ')}\n🍓 Жимс: ${fruitName}\n🚚 Хүргэлт: ${deliveryType}\n💰 НИЙТ: ${document.getElementById('total-amount').innerText}₮`;

    const fd = new FormData();
    fd.append("chat_id", chatId);
    fd.append("photo", file);
    fd.append("caption", text);

    try {
        const res = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, { method: "POST", body: fd });
        if(res.ok) {
            alert("Захиалга амжилттай илгээгдлээ!");
            cart = [];
            location.reload();
        }
    } catch(e) {
        alert("Алдаа гарлаа!");
    }
}
