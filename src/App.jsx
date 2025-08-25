import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './contexts/CartContext';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import HomePage from './components/HomePage';
import BooksPage from './pages/BooksPage';
import SuppliesPage from './pages/SuppliesPage';
import NewProductsPage from './pages/NewProductsPage';
import DiscountsPage from './pages/DiscountsPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import NewsPage from './pages/NewsPage';
import SalesPage from './pages/SalesPage';
import AccessoriesPage from './pages/AccessoriesPage';

export const LanguageContext = React.createContext();

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentPage, setCurrentPage] = useState('home');
    const [language, setLanguage] = useState('uz');

    const handleLogin = (userData) => {
        setIsLoggedIn(true);
        toast.success(
            language === 'uz'
                ? `Tanho-Konstovar do'koniga xush kelibsiz, ${userData.firstName}!`
                : `Добро пожаловать в магазин Tanho-Konstovar, ${userData.firstName}!`
        );
    };

    // Zakaz yuborish funksiyasi
    const sendOrder = async ({ fullName, phoneNumber, address, cartItems, total }) => {
        try {
            console.log("📤 Yuborilayotgan zakaz:", { fullName, phoneNumber, address, cartItems, total });

            const response = await fetch("/api/send-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, phoneNumber, address, cartItems, total }),
            });

            const data = await response.json();
            console.log("📥 Backend javobi:", data);

            if (data.ok) {
                toast.success("✅ Zakaz qabul qilindi! 2-3 soatda aloqaga chiqamiz 😊");
            } else {
                toast.error("❌ Xatolik: zakaz yuborilmadi!");
            }
        } catch (err) {
            console.error("❌ Frontend xato:", err);
            toast.error("Xabar yuborilmadi, keyinroq urinib ko‘ring.");
        }
    };

    if (!isLoggedIn) {
        return (
            <LanguageContext.Provider value={{ language, setLanguage }}>
                <LoginForm onLogin={handleLogin} />
                <ToastContainer />
            </LanguageContext.Provider>
        );
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            <CartProvider>
                <div className="min-h-screen bg-gray-50">
                    <Header
                        currentPage={currentPage}
                        onNavigate={setCurrentPage}
                        onLogout={() => setIsLoggedIn(false)}
                    />

                    {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
                    {currentPage === 'books' && <BooksPage />}
                    {currentPage === 'supplies' && <SuppliesPage />}
                    {currentPage === 'new' && <NewProductsPage />}
                    {currentPage === 'discounts' && <DiscountsPage />}
                    {currentPage === 'contact' && <ContactPage />}
                    {currentPage === 'cart' && <CartPage sendOrder={sendOrder} />}
                    {currentPage === "news" && <NewsPage />}
                    {currentPage === "sales" && <SalesPage />}
                    {currentPage === "accessories" && <AccessoriesPage />}

                    <ToastContainer position="top-center" autoClose={3000} />
                </div>
            </CartProvider>
        </LanguageContext.Provider>
    );
}

export default App;
