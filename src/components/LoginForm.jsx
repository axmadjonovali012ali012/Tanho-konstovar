import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { User, MapPin, ArrowRight, User2 } from 'lucide-react';
import { LanguageContext } from '../App';

const LoginForm = ({ onLogin }) => {
  const { language } = useContext(LanguageContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: ''
  });

  const translations = {
    uz: {
      title: "Tizimga kirish",
      firstName: "Ismingiz",
      lastName: "Familyangiz",
      address: "Manzilingiz",
      loginBtn: "Kirish",
      demoBtn: "Demo rejimida kirish",
      welcome: "Tanho konstovar do'koniga xush kelibsiz!",
      fillAll: "Iltimos, barcha maydonlarni to'ldiring!"
    },
    ru: {
      title: "Вход в систему",
      firstName: "Ваше имя",
      lastName: "Ваша фамилия",
      address: "Ваш адрес",
      loginBtn: "Войти",
      demoBtn: "Демо-режим",
      welcome: "Добро пожаловать в магазин Tanho konstovar!",
      fillAll: "Пожалуйста, заполните все поля!"
    }
  };

  const t = translations[language];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.address) {
      toast.error(t.fillAll);
      return;
    }

    toast.success(t.welcome, {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "colored",
      style: { background: '#4CAF50', color: 'white' }
    });

    setTimeout(() => {
      onLogin(formData);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-100 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          {t.title}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <User className="w-4 h-4 text-green-600" /> {t.firstName}
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <User className="w-4 h-4 text-green-600" /> {t.lastName}
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-600" /> {t.address}
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl flex items-center justify-center gap-2"
          >
            {t.loginBtn}
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
