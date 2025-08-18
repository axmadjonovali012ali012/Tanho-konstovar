import React, { useContext, useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { ALL_PRODUCTS } from '../data/products';
import { LanguageContext } from '../App';

const HomePage = ({ onNavigate }) => {
  const { language } = useContext(LanguageContext);
  const [search, setSearch] = useState("");

  const translations = {
    uz: {
      title: "Tanho-Konstovar",
      subtitle: "O'quv qurollari va 3000+ kitoblar",
      description: "Eng yangi darsliklar, qo'llanmalar va o'quv qurollari bilan bilimingizni oshiring",
      books: "Kitoblar",
      supplies: "O'quv qurollari",
      newProducts: "Yangi tovarlar",
      discounts: "Chegirmalar",
      searchPh: "Sayt bo‘yicha qidirish..."
    },
    ru: {
      title: "Tanho-Konstovar",
      subtitle: "Учебные принадлежности и более 3000 книг",
      description: "Повышайте знания с учебниками, руководствами и принадлежностями",
      books: "Книги",
      supplies: "Учебные принадлежности",
      newProducts: "Новые товары",
      discounts: "Скидки",
      searchPh: "Поиск по сайту..."
    }
  }[language];

  const featured = useMemo(() => ALL_PRODUCTS.slice(0, 8), []);
  const filteredFeatured = useMemo(() => {
    if (!search.trim()) return featured;
    const s = search.toLowerCase();
    return ALL_PRODUCTS.filter(p =>
      (p.name + " " + (p.nameRu || "")).toLowerCase().includes(s)
    ).slice(0, 12);
  }, [search, featured]);

  return (
    <div className=" bg-gray-50">
      <section className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{translations.title}</h1>
          <p className="text-xl md:text-2xl mb-4 opacity-90">{translations.subtitle}</p>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">{translations.description}</p>

          <div className="mt-6 max-w-xl mx-auto">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={translations.searchPh}
              className="w-full px-4 py-3 rounded-xl text-gray-800"
            />
          </div>
        </div>
      </section>


      <section className="pb-14 mt-10">
        <div className=" mx-auto px-4">
          <h1 className="text-2xl font-semibold mb-6">
            {search ? (language === 'uz' ? "Qidiruv natijalari" : "Результаты поиска") :
              (language === 'uz' ? "Tanlangan mahsulotlar" : "Рекомендуемое")}
          </h1>
          {filteredFeatured.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredFeatured.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <p className="text-gray-500">{language === 'uz' ? "Hech narsa topilmadi" : "Ничего не найдено"}</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
