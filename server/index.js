import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
const PORT = 5000;

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

        let message = "📦 <b>Yangi zakaz keldi!</b>\n\n";
        cartItems.forEach((item, index) => {
            message += `${index + 1}) ${item.name} - ${item.quantity} dona - ${item.price * item.quantity} so'm\n`;
        });

        message += `\n💰 <b>Umumiy summa:</b> ${total} so'm\n\n`;
        message += `👤 <b>F.I.SH:</b> ${fullName}\n📞 <b>Tel:</b> ${phoneNumber}\n📍 <b>Manzil:</b> ${address}`;

        // ✅ Telegram’ga yuborish
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: "HTML",
            }),
        });

        const data = await response.json();
        console.log("Telegram javobi:", data);

        if (!data.ok) {
            return res.status(500).json({ ok: false, error: data.description });
        }

        res.json({ ok: true, message: "Zakaz yuborildi ✅" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, error: "Xatolik yuz berdi" });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server ${PORT} portda ishlayapti...`);
});



