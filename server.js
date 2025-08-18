import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const TOKEN = "8437520337:AAEKtO4dcQFshAxA0d3FqomFdichJazHWug"
const CHAT_ID = "7418431538"

// Zakaz yuborish
app.post("/send-order", async (req, res) => {
    const { name, phone, study, group } = req.body;

    const text = `📩 Yangi zakaz!\n
👤 F.I.SH: ${name}
📞 Tel: ${phone}
📚 Uqish: ${study}
📂 Guruh: ${group}`;

    const keyboard = {
        inline_keyboard: [
            [{ text: "✅ To‘lov qilindi", callback_data: "paid" }],
        ],
    };

    try {
        const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text,
                reply_markup: keyboard,
            }),
        });
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ ok: false, error: err.message });
    }
});

// Telegram callback webhook (bot tugma bosilganda keladigan)
app.post("/callback", (req, res) => {
    const { callback_query } = req.body;

    if (callback_query?.data === "paid") {
        console.log("Zakaz to‘landi:", callback_query.message.text);
        // Shu yerda DB update qilishingiz yoki React frontend bilan ulashishingiz mumkin
    }

    res.sendStatus(200);
});

app.listen(5000, () => console.log("Server 5000 da ishlayapti"));
