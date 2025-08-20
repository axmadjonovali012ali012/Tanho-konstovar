import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

// CORS sozlamalari
const corsOptions = {
    origin: ['http://localhost:5173'], // Frontend manzillari
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
};
app.use(cors(corsOptions));
app.use(express.json());

const TOKEN = "8437520337:AAEKtO4dcQFshAxA0d3FqomFdichJazHWug";
const CHAT_ID = "7418431538";

// Zakaz qabul qilish
app.post("/send-order", async (req, res) => {
    try {
        const { name, phone, message } = req.body;

        const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
        const tgResponse = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message || `Yangi zakaz!\nIsm: ${name}\nTel: ${phone}`
            }),
        });

        const data = await tgResponse.json();

        if (data.ok) {
            res.json({ ok: true, message: "Zakaz muvaffaqiyatli yuborildi" });
        } else {
            res.status(500).json({ ok: false, error: "Telegram API xatosi" });
        }
    } catch (err) {
        console.error("Server error:", err);
        res.status(500).json({ ok: false, error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server ${PORT} portda ishga tushdi`);
    console.log(`Test qilish uchun: http://localhost:${PORT}/send-order`);
});