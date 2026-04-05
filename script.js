let cart = [];

// Хуудас хооронд шилжих
function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    const target = document.getElementById(id);
    if (target) target.style.display = 'block';
    window.scrollTo({top: 0, behavior: 'smooth'});
    if(id === 'payment-page') renderCart();
}

function updateFruitPrice(selectElement) {
    const price = parseInt(selectElement.value);
    document.getElementById('fruit-display-price').innerText = price.toLocaleString() + " ₮";
}

// Энгийн бараа нэмэх
function addToCart(name, price) {
    cart.push({ name: name, price: Number(price) });
    updateUI();
}

// Жимстэй бялуу нэмэх
function addFruitCake() {
    const s = document.getElementById('special-fruit');
    const price = Number(s.value);
    const fruit = s.options[s.selectedIndex].text.split(' (')[0];
    cart.push({ name: `Жимстэй бялуу (${fruit})`, price: price });
    updateUI();
}

function updateUI() {
    document.getElementById('cart-count').innerText = cart.length;
    alert("Сагсанд амжилттай нэмэгдлээ!");
}

function renderCart() {
    const list = document.getElementById('cart-items-list');
    const totalDisplay = document.getElementById('total-amount');

    if (cart.length === 0) {
        list.innerHTML = "<p style='text-align:center;'>Сагс хоосон байна.</p>";
        totalDisplay.innerText = "0";
        return;
    }

    list.innerHTML = cart.map(i => `
        <div style="display:flex; justify-content:space-between; margin:10px 0; border-bottom:1px solid #eee;">
            <span>${i.name}</span>
            <b>${i.price.toLocaleString()}₮</b>
        </div>`).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalDisplay.innerText = total.toLocaleString();
}

function copyAcc() {
    navigator.clipboard.writeText("5465121770").then(() => {
        alert("Амжилттай хууллаа");
    });
}

async function sendToTelegram() {
    const phone = document.getElementById('user-phone').value;
    const design = document.getElementById('cake-design').value;
    const photo = document.getElementById('receipt-img').files[0];
    
    if(!phone || !photo || cart.length === 0) return alert("Мэдээллээ бүрэн оруулна уу!");

    const token = "8613168219:AAGt8Dte3hqEJu1_q8dR1NOYHvOrdSqghns";
    const chatId = "7437596154";
    const total = document.getElementById('total-amount').innerText;
    
    let text = `🎂 ШИНЭ ЗАХИАЛГА\n\n`;
    text += `📞 Утас: ${phone}\n`;
    text += `🍰 Бялуу: ${cart.map(i => i.name).join(', ')}\n`;
    text += `✍️ Загвар: ${design || "Бичээгүй"}\n`;
    text += `💰 Нийт: ${total}₮`;

    const formData = new FormData();
    formData.append("chat_id", chatId);
    formData.append("photo", photo);
    formData.append("caption", text);

    try {
        const res = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, { method: "POST", body: formData });
        if(res.ok) {
            alert("Захиалга амжилттай илгээгдлээ!");
            cart = [];
            location.reload();
        }
    } catch(e) { alert("Алдаа гарлаа!"); }
}

