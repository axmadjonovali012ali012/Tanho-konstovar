import React, { useContext } from "react";
import { LanguageContext } from "../App";
import { getBooks } from "../data/products"; // faqat sinov uchun kitoblarni olyapmiz

const SalesPage = () => {
    const { language } = useContext(LanguageContext);
    const all = getBooks().slice(0, 12); // 12 ta mahsulotni olayapmiz

    return (
        <div className="mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-8">
                {language === "uz" ? "Chegirmalar" : "Скидки"}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {all.map((p) => {
                    const discountPercent = 10; 
                    const discountAmount = Math.round((p.price * discountPercent) / 100);
                    const newPrice = p.price - discountAmount;

                    return (
                        <div
                            key={p.id}
                            className="border rounded-lg shadow bg-white p-4 relative"
                        >
                            {/* -10% badge */}
                            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                -{discountPercent}%
                            </span>

                            {/* Rasm */}
                            <img
                                src={p.image}
                                alt={p.name}
                                className="w-full h-40 object-cover rounded mb-3"
                            />

                            {/* Nomi */}
                            <h2 className="font-semibold text-base mb-2">{p.name}</h2>

                            {/* Narxlar */}
                            <div className="mb-1">
                                <span className="text-gray-500 line-through text-sm mr-2">
                                    {p.price.toLocaleString()} so‘m
                                </span>
                                <span className="text-red-600 font-bold text-lg">
                                    {newPrice.toLocaleString()} so‘m
                                </span>
                            </div>

                            {/* Tejash yozuvi */}
                            <p className="text-sm text-green-600">
                                {language === "uz"
                                    ? `Siz ${discountAmount.toLocaleString()} so‘m tejaysiz`
                                    : `Вы экономите ${discountAmount.toLocaleString()} сум`}
                            </p>

                            <button className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
                                {language === "uz"
                                    ? "Savatchaga qo‘shish"
                                    : "Добавить в корзину"}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SalesPage;
