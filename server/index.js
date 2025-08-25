
const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const TELEGRAM_BOT_TOKEN = "8437520337:AAEKtO4dcQFshAxA0d3FqomFdichJazHWug";
const TELEGRAM_CHAT_ID = "7418431538";

const bot = new TelegramBot(TOKEN, { polling: true });

// Frontenddan buyurtma kelganda
app.post("/send-order", async (req, res) => {
    try {
        const { fullName, phoneNumber, address, cartItems, total } = req.body;

        // Savatchani xabar formatida chiqaramiz
        let message = "📦 Yangi zakaz keldi!\n\n";

        cartItems.forEach((item, index) => {
            message += `${index + 1}) ${item.name} - ${item.quantity} dona - ${item.price * item.quantity} so'm\n`;
        });

        message += `\n💰 Umumiy summa: ${total} so'm\n\n`;
        message += `👤 F.I.SH: ${fullName}\n📞 Tel: ${phoneNumber}\n📍 Manzil: ${address}`;

        // Bot orqali yuborish
        await bot.sendMessage(CHAT_ID, message, { parse_mode: "Markdown" });

        res.json({ ok: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, error: "Xabar yuborilmadi" });
    }
});

app.listen(5000, () => {
    console.log("✅ Server 5000 portda ishlayapti...");
});
