import React, { useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, CheckCircle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "../contexts/CartContext";

const CartPage = ({ onNavigate }) => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    getCartTotal,
    clearCart,
  } = useCart();

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState({ city: "", street: "", house: "" });
  const [isLoading, setIsLoading] = useState(false);

  const formatPrice = (price) => price.toLocaleString("uz-UZ") + " so'm";

  const handleCheckout = async () => {
    if (!fullName) {
      toast.error("Iltimos, ism-familyangizni kiriting!");
      return;
    }
    if (!phoneNumber) {
      toast.error("Iltimos, telefon raqamingizni kiriting!");
      return;
    }
    if (!address.city || !address.street || !address.house) {
      toast.error("Iltimos, manzilingizni to‘liq kiriting!");
      return;
    }

    setIsLoading(true);

    try {
      const total = getCartTotal();
      const fullAddress = `${address.city}, ${address.street}, ${address.house}`;

      const response = await fetch("http://localhost:5000/send-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phoneNumber,
          address: fullAddress,
          cartItems,
          total,
        }),
      });

      if (!response.ok) throw new Error("Serverdan javob kelmadi");

      const data = await response.json();

      if (data.ok) {
        toast.success("✅ Zakaz muvaffaqiyatli qabul qilindi! 2-3 soatda aloqaga chiqamiz.", {
          position: "top-center",
          autoClose: 5000,
          onClose: () => {
            clearCart();
            onNavigate("home");
          },
        });
      } else {
        throw new Error(data.error || "Xatolik yuz berdi");
      }
    } catch (error) {
      toast.error(`Xatolik: ${error.message}`, { position: "top-center" });
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };


  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex flex-col items-center justify-center">
        <ShoppingBag size={64} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Savat bo'sh</h2>
        <p className="text-gray-500 mb-6">Sizning savatingizda hali mahsulot yo'q</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-6">
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center text-green-600 hover:text-green-700 font-medium"
          >
            <ArrowLeft size={20} className="mr-2" />
            Ortga qaytish
          </button>
          <h1 className="text-2xl font-bold text-gray-900 ml-4">Savat</h1>
        </div>


        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-x-12">
          {/* Mahsulotlar ro'yxati */}
          <div className="lg:col-span-7 mb-8 lg:mb-0">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Savatdagi mahsulotlar</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="cart-item px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-4"
                  >
                    {/* Mahsulot rasmi */}
                    <div className="flex-shrink-0 w-full sm:w-24 h-32 sm:h-24 overflow-hidden rounded-lg shadow-sm">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Mahsulot nomi va narxi */}
                    <div className="flex-1">
                      <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{formatPrice(item.price)}</p>
                    </div>

                    {/* Miqdor boshqaruvi */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="p-1 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-2 py-1 border rounded text-gray-700 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="p-1 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Jami narx */}
                    <div className="text-right font-semibold text-gray-900 sm:ml-4">
                      {formatPrice(item.price * item.quantity)}
                    </div>

                    {/* O'chirish tugmasi */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto sm:ml-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Buyurtma ma'lumotlari */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Buyurtma ma'lumotlari</h2>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ism-familya</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ism va familyangiz"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefon raqam</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+998901234567"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Shahar</label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      placeholder="Shahar"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ko‘cha</label>
                    <input
                      type="text"
                      value={address.street}
                      onChange={(e) => setAddress({ ...address, street: e.target.value })}
                      placeholder="Ko‘cha"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Uy raqami</label>
                    <input
                      type="text"
                      value={address.house}
                      onChange={(e) => setAddress({ ...address, house: e.target.value })}
                      placeholder="Uy raqami"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Jami:</span>
                    <span className="text-green-600">{formatPrice(getCartTotal())}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className={`w-full ${isLoading
                  ? "bg-gray-400"
                  : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  } text-white py-3 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl flex items-center justify-center gap-2`}
              >
                {isLoading ? (
                  <>
                    <div className="btn-spinner"></div> Jo'natilmoqda...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5" /> Zakaz qilish
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CartPage;
