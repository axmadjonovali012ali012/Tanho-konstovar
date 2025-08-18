import React, { useContext, useState } from "react";
import ProductCard from "../components/ProductCard";
import { LanguageContext } from "../App";
import { getBooks } from "../data/products"; // vaqtincha kitoblardan foydalanamiz

const NewsPage = () => {
    const { language } = useContext(LanguageContext);
    const [search, setSearch] = useState("");
    const all = getBooks().slice(0, 200); // 200 ta mahsulot

    const list = all.filter((p) =>
        (p.name + " " + (p.nameRu || "")).toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="mx-auto px-4 py-10">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <h1 className="text-3xl font-bold">
                    {language === "uz" ? "Yangiliklar" : "Новости"}
                </h1>
                <input
                    type="text"
                    placeholder={language === "uz" ? "Yangiliklarni qidirish..." : "Поиск новостей..."}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-72 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                />
            </div>

            {list.length ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {list.map((p) => (
                        <div key={p.id} className="relative">
                            <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                                {language === "uz" ? "Bu yangi tovar" : "Новый товар"}
                            </span>
                            <ProductCard product={p} />
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">{language === "uz" ? "Hech narsa topilmadi" : "Ничего не найдено"}</p>
            )}
        </div>
    );
};

export default NewsPage;
