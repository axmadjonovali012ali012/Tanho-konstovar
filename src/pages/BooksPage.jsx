import React, { useState, useContext } from "react";
import { getSupplies } from "../data/products";
import ProductCard from "../components/ProductCard";
import { LanguageContext } from "../App";

const SuppliesPage = () => {
  const { language } = useContext(LanguageContext);
  const [search, setSearch] = useState("");
  const all = getSupplies();

  const list = all.filter(s =>
    (s.name + " " + (s.nameRu || "")).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className=" mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold">
          {language === "uz" ? "Kitoblar" : "Все учебные принадлежности"}
        </h1>
        <input
          type="text"
          placeholder={language === "uz" ? "O‘quv qurollarini qidirish..." : "Поиск принадлежности..."}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-72 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>

      {list.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {list.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <p className="text-gray-500">{language === "uz" ? "Hech narsa topilmadi" : "Ничего не найдено"}</p>
      )}
    </div>
  );
};

export default SuppliesPage;
