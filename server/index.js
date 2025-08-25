

const TELEGRAM_BOT_TOKEN = "8437520337:AAEKtO4dcQFshAxA0d3FqomFdichJazHWug";
const TELEGRAM_CHAT_ID = "7418431538";

app.use(cors());
app.use(bodyParser.json());

app.post("/send-order", async (req, res) => {
    try {
        const { fullName, phoneNumber, address, cartItems, total } = req.body;

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ ok: false, error: "Savatcha bo'sh" });
        }

        let message = "📦 Yangi zakaz keldi!\n\n";
        cartItems.forEach((item, index) => {
            message += `${index + 1}) ${item.name} - ${item.quantity} dona - ${item.price * item.quantity} so'm\n`;
        });

        message += `\n💰 Umumiy summa: ${total} so'm\n\n`;
        message += `👤 F.I.SH: ${fullName}\n📞 Tel: ${phoneNumber}\n📍 Manzil: ${address}`;

        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
            }),
        });

        res.json({ ok: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, error: "Xatolik yuz berdi" });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server ${PORT} portda ishlayapti...`);
});



