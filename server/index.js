// server/index.js
import express from "express";
import fetch from "node-fetch";  // telegram API uchun
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const TELEGRAM_BOT_TOKEN = "8437520337:AAEKtO4dcQFshAxA0d3FqomFdichJazHWug";
const CHAT_ID = "7418431538";

// Zakaz yuborish endpointi
app.post("/send-order", async (req, res) => {
  const order = req.body;

  if (!order || !order.name) {
    return res.status(400).json({ ok: false, error: "Order ma'lumotlari to‘liq emas" });
  }

  const message = `
📦 Yangi zakaz:
👤 Ism: ${order.name}
📞 Telefon: ${order.phone}
🛒 Mahsulotlar: ${JSON.stringify(order.items)}
💰 Umumiy summa: ${order.totalPrice} so‘m
  `;

  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
      }),
    });

    const data = await response.json();

    if (data.ok) {
      res.json({ ok: true });
    } else {
      res.status(500).json({ ok: false, error: "Telegram API xatosi" });
    }
  } catch (err) {
    console.error("Xato:", err);
    res.status(500).json({ ok: false, error: "Server xatosi" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server ${PORT}-portda ishlayapti`));
