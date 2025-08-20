import React, { useState, useContext } from "react";
import { useCart } from "../contexts/CartContext";
import { Minus, Plus, Trash2, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";
import { LanguageContext } from "../App";

function CartPage({ sendOrder }) {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getCartTotal,
    clearCart, // 🔹 qo‘shildi
  } = useCart();

  const { language } = useContext(LanguageContext);

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    if (!fullName || !phoneNumber || !address) {
      toast.error(language === "uz" ? "Iltimos, barcha maydonlarni to‘ldiring!" : "Пожалуйста, заполните все поля!");
      return;
    }

    setIsLoading(true);
    try {
      await sendOrder({
        fullName,
        phoneNumber,
        address,
        cartItems,
        total: getCartTotal(),
      });

      toast.success(
        language === "uz"
          ? "✅ Buyurtmangiz qabul qilindi! 2-4 soatda aloqaga chiqamiz."
          : "✅ Ваш заказ принят! Мы свяжемся с вами в течение 2-4 часов.",
        { autoClose: 10000 }
      );

      // 🔹 Inputlarni tozalash
      setFullName("");
      setPhoneNumber("");
      setAddress("");

      // 🔹 Savatchani bo‘shatish
      clearCart();
    } catch {
      toast.error(language === "uz" ? "❌ Xatolik: buyurtma yuborilmadi" : "❌ Ошибка: заказ не был отправлен");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Savatcha */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">{language === "uz" ? "Savatcha" : "Корзина"}</h2>
        {cartItems.length === 0 ? (
          <p>{language === "uz" ? "Savatchangiz bo'sh" : "Ваша корзина пуста"}</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b py-3">
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p>{item.price} so'm</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => decreaseQuantity(item.id)}><Minus size={18} /></button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.id)}><Plus size={18} /></button>
                <button onClick={() => removeFromCart(item.id)}><Trash2 className="text-red-500" /></button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Buyurtma formasi */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold mb-6">
          {language === "uz" ? "Buyurtma ma'lumotlari" : "Данные заказа"}
        </h2>

        <div className="space-y-4 mb-6">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder={language === "uz" ? "Ism Familiya" : "Имя Фамилия"}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />

          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => {
              const cleaned = e.target.value.replace(/[^0-9+]/g, "");
              setPhoneNumber(cleaned);
            }}
            placeholder="+998901234567"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            maxLength={13}
          />

          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={language === "uz" ? "Manzil" : "Адрес"}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />

          <div className="border-t pt-4 flex justify-between font-bold">
            <span>{language === "uz" ? "Jami:" : "Итого:"}</span>
            <span className="text-green-600">{getCartTotal()} so'm</span>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          disabled={isLoading}
          className={`w-full ${isLoading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"} 
          text-white py-3 rounded-lg flex items-center justify-center gap-2`}
        >
          {isLoading ? (language === "uz" ? "Jo‘natilmoqda..." : "Отправка...") : <><CheckCircle /> {language === "uz" ? "Buyurtma berish" : "Сделать заказ"}</>}
        </button>
      </div>
    </div>
  );
}

export default CartPage;
