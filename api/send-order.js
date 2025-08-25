export default async function handler(req, res) {
    if (req.method === "POST") {
        const { fullName, phoneNumber, address, cartItems, total } = req.body;

        // Mahsulotlarni Telegram xabariga formatlash
        const itemsList = cartItems
            .map(
                (item, index) =>
                    `${index + 1}) ${item.name} - ${item.quantity} dona - ${item.price * item.quantity} so'm`
            )
            .join("\n");

        const message = `
📦 Yangi zakaz keldi!

${itemsList}

💰 Umumiy summa: ${total} so'm

👤 F.I.SH: ${fullName}
📞 Tel: ${phoneNumber}
📍 Manzil: ${address}
    `;

        try {
            const token = "SIZNING_BOT_TOKEN";
            const chatId = "SIZNING_CHAT_ID";

            const telegramResponse = await fetch(
                `https://api.telegram.org/bot${token}/sendMessage`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: message,
                    }),
                }
            );

            const result = await telegramResponse.json();

            if (result.ok) {
                res.status(200).json({ ok: true });
            } else {
                res.status(500).json({ ok: false, error: result });
            }
        } catch (error) {
            console.error("❌ Backend xato:", error);
            res.status(500).json({ ok: false });
        }
    } else {
        res.status(405).end();
    }
}
