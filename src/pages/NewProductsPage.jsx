import React, { useContext } from "react";
import { getNewProducts } from "../data/products";
import ProductCard from "../components/ProductCard";
import { LanguageContext } from "../App";

const NewProductsPage = () => {
    const { language } = useContext(LanguageContext);
    const list = getNewProducts();

    return (
        <div className=" mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-8">
                {language === "uz" ? "Yangi tovarlar" : "Новые товары"}
            </h1>
            {list.length ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {list.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
            ) : (
                <p className="text-gray-500">{language === "uz" ? "Hozircha yo‘q" : "Пока нет"}</p>
            )}
        </div>
    );
};

export default NewProductsPage;
