let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
}

function addFruitCake() {
    const select = document.getElementById('fruit-type');
    const [name, price] = select.value.split('-');
    addToCart(`Жимстэй (${name})`, parseInt(price));
}

function addDIY() {
    const extra = parseInt(document.getElementById('extra-color').value) || 0;
    const price = 23000 + (extra * 1000);
    addToCart(`DIY (${3 + extra} өнгө)`, price);
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
}

function goToPayment() {
    if (cart.length === 0) return alert("Сагс хоосон байна!");
    document.getElementById('main-page').classList.add('hidden');
    document.getElementById('payment-page').classList.remove('hidden');
    renderCartList();
}

function goToMain() {
    document.getElementById('payment-page').classList.add('hidden');
    document.getElementById('main-page').classList.remove('hidden');
}

function renderCartList() {
    const list = document.getElementById('cart-list');
    total = cart.reduce((sum, item) => sum + item.price, 0);
    list.innerHTML = cart.map(i => `<p style="display:flex; justify-content:space-between"><span>${i.name}</span> <b>${i.price.toLocaleString()}₮</b></p>`).join('');
    document.getElementById('total-price').innerText = total.toLocaleString();
}

function copyAccount() {
    const acc = document.getElementById('acc-num').innerText;
    navigator.clipboard.writeText(acc);
    const msg = document.getElementById('copy-msg');
    msg.innerText = "✅ Амжилттай хуулагдлаа!";
    setTimeout(() => msg.innerText = "", 2000);
}

async function sendOrder() {
    const token = "8613168219:AAGt8Dte3hqEJu1_q8dR1NOYHvOrdSqghns";
    const chatId = "7437596154";
    const phone = document.getElementById('user-phone').value;
    const fileInput = document.getElementById('receipt');

    if (!phone || fileInput.files.length === 0) {
        return alert("Утасны дугаар болон баримтын зургаа оруулна уу!");
    }

    const orderText = `🎂 ШИНЭ ЗАХИАЛГА!\n\n📞 Утас: ${phone}\n🛒 Бараанууд:\n${cart.map(i => `- ${i.name} (${i.price}₮)`).join('\n')}\n\n💰 Нийт: ${total}₮`;

    // Телеграм руу зураг илгээх
    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('photo', fileInput.files[0]);
    formData.append('caption', orderText);

    try {
        const response = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert("Захиалга амжилттай илгээгдлээ!");
            cart = [];
            updateCartUI();
            goToMain();
        } else {
            alert("Алдаа гарлаа. Дахин оролдоно уу.");
        }
    } catch (err) {
        alert("Сүлжээний алдаа гарлаа.");
    }
}

