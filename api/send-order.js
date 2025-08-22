// api/send-order.js
import fetch from "node-fetch";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ ok: false, message: "Method not allowed" });
    }

    try {
        const { name, phone, cart } = req.body;

        if (!name || !phone || !cart || cart.length === 0) {
            return res.status(400).json({ ok: false, message: "Ma'lumot to'liq emas" });
        }

        const BOT_TOKEN = process.env.BOT_TOKEN;
        const CHAT_ID = process.env.CHAT_ID;

        let message = `🛒 Yangi zakaz!\n\n👤 Ism: ${name}\n📞 Telefon: ${phone}\n\n📦 Buyurtma:\n`;
        cart.forEach((item, idx) => {
            message += `${idx + 1}. ${item.name} - ${item.price} x ${item.quantity}\n`;
        });

        // Telegramga yuborish
        const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        const response = await fetch(telegramUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: "HTML",
            }),
        });

        const data = await response.json();

        if (!data.ok) {
            throw new Error("Telegramga yuborishda xatolik");
        }

        return res.status(200).json({ ok: true, message: "Zakaz yuborildi!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, message: "Server xatosi" });
    }
}
