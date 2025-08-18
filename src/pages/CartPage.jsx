import React from "react";
import { useCart } from "../contexts/CartContext";
import { Trash2, Plus, Minus } from "lucide-react";
import { toast } from "react-toastify";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="p-10 text-center text-gray-600 text-lg">
        Savatcha bo'sh 😔
      </div>
    );
  }

  const handleOrder = async () => {
    const token = "437520337:AAEKtO4dcQFshAxA0d3FqomFdichJazHWug";
    const chatId = "7418431538";

    const itemsText = cartItems
      .map(
        (item) =>
          `🛍 ${item.name} x ${item.quantity} = ${item.price * item.quantity} so’m`
      )
      .join("\n");

    const text = `📩 Yangi zakaz!\n\n${itemsText}\n\nUmumiy: ${totalPrice} so’m\n📅 Sana: ${new Date().toLocaleString()}`;

    try {
      const res = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
          text
        )}`,
        { method: "GET" }
      );
      const data = await res.json();

      if (data.ok) {
        toast.success("Zakazingiz qabul qilindi!", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        });
        clearCart(); // Savatchani tozalash
      } else {
        toast.error("Xabar yuborilmadi, keyinroq urinib ko‘ring.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Xatolik yuz berdi!");
    }
  };

  return (
    <div className="mx-auto p-6 w-full">
      <h1 className="text-2xl font-bold mb-6">🛒 Savatcha</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border rounded-lg p-4 bg-white shadow-md w-full"
          >
            <img
              src={item.image || "https://via.placeholder.com/80"}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-md"
            />

            <div className="flex-1 px-4">
              <h2 className="font-semibold text-lg">{item.name}</h2>
              <p className="text-gray-600">{item.price} so’m</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                disabled={item.quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-3 py-1 border rounded-md">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="ml-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center border-t pt-4 w-full">
        <h2 className="text-xl font-bold">Umumiy: {totalPrice} so’m</h2>
        <button
          onClick={handleOrder}
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
        >
          Zakaz qilish
        </button>
      </div>
    </div>
  );
};

export default CartPage;
