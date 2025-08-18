import React, { useContext } from "react";
import ProductCard from "../components/ProductCard";
import { LanguageContext } from "../App";
import { getAccessories } from "../data/products"; // alohida funksiya ochib aksessuarlarni chiqarish kerak

const AccessoriesPage = () => {
    const { language } = useContext(LanguageContext);
    const all = getAccessories();

    return (
        <div className="mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-8">
                {language === "uz" ? "Aksessuarlar" : "Аксессуары"}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {all.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </div>
    );
};

export default AccessoriesPage;
