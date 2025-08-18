import React, { useContext, useState } from 'react';
import { ShoppingCart, BookOpen, LogOut, Menu, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { LanguageContext } from '../App';

const Header = ({ currentPage, onNavigate, onLogout }) => {
  const { cartItems } = useCart(); 
  const { language, setLanguage } = useContext(LanguageContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const translations = {
    uz: { home: "Bosh sahifa", books: "Kitoblar", supplies: "O'quv qurollari", contact: "Aloqa", logout: "Chiqish"  },
    ru: { home: "Главная", books: "Книги", supplies: "Учебные принадлежности", contact: "Контакты", logout: "Выйти" }
  };
  const t = translations[language];

  const menuItems = [
    { key: "home", label: t.home },
    { key: "books", label: t.books },
    { key: "supplies", label: t.supplies },
    { key: "contact", label: t.contact },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
          <div className="bg-green-500 text-white p-2 rounded-lg">
            <BookOpen className="w-6 h-6" />
          </div>
          <span className="font-bold text-lg text-gray-800">Tanho-Konstovar</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`font-medium relative ${currentPage === item.key
                  ? "text-green-600"
                  : "text-gray-700 hover:text-green-600"
                }`}
            >
              {item.label}
              {currentPage === item.key && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-500"></span>
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="hidden sm:flex space-x-2">
            <button
              onClick={() => setLanguage('uz')}
              className={`px-3 py-1 rounded-md ${language === 'uz' ? 'bg-green-500 text-white' : 'bg-gray-200'
                }`}
            >
              UZ
            </button>
            <button
              onClick={() => setLanguage('ru')}
              className={`px-3 py-1 rounded-md ${language === 'ru' ? 'bg-green-500 text-white' : 'bg-gray-200'
                }`}
            >
              RU
            </button>
          </div>

          <button onClick={() => onNavigate('cart')} className="relative p-2 rounded-full transition" title="Savatcha">
            <ShoppingCart className="w-6 h-6 text-black" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                {cartItemsCount}
              </span>
            )}
          </button>

          <button onClick={onLogout} className="hidden sm:flex items-center gap-1 text-gray-600 hover:text-red-600">
            <LogOut className="w-5 h-5" />
            <span className="hidden md:inline">{t.logout}</span>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => { onNavigate(item.key); setMobileMenuOpen(false); }}
              className={`block w-full text-left font-medium ${currentPage === item.key ? "text-green-600" : "text-gray-700 hover:text-green-600"
                }`}
            >
              {item.label}
            </button>
          ))}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="flex space-x-2">
              <button
                onClick={() => setLanguage('uz')}
                className={`px-3 py-1 rounded-md ${language === 'uz' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
              >
                UZ
              </button>
              <button
                onClick={() => setLanguage('ru')}
                className={`px-3 py-1 rounded-md ${language === 'ru' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
              >
                RU
              </button>
            </div>
            <button onClick={onLogout} className="flex items-center gap-1 text-gray-600 hover:text-red-600">
              <LogOut className="w-5 h-5" />
              <span>{t.logout}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
