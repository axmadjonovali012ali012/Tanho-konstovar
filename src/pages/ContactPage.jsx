import React, { useContext, useState } from 'react';
import { LanguageContext } from '../App';
import { Phone, Mail, MapPin, Clock, Info, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactPage = () => {
    const { language } = useContext(LanguageContext);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const [details] = useState([
        { icon: <Clock className="w-5 h-5 text-green-600" />, text: "Ish vaqti: Dam Olishsiz, 08:00 - 20:00" },
        { icon: <Info className="w-5 h-5 text-green-600" />, text: "Qisqacha tavsif: Bizning kompaniya sifat va ishonchlilikni birinchi o‘ringa qo‘yadi." },
        { icon: <MessageCircle className="w-5 h-5 text-green-600" />, text: "Savol va takliflar uchun murojaat qiling." },
        { icon: <Instagram className="w-5 h-5 text-pink-500" />, text: "@tanho.uz" },
    ]);

    const t = {
        uz: {
            title: "Biz bilan bog‘lanish",
            phone: "Telefon",
            email: "Email",
            address: "Manzil",
            formTitle: "Savol yoki taklif yuboring",
            name: "Ismingiz",
            message: "Xabaringiz",
            send: "Yuborish",
            success: "Xabaringiz muvaffaqiyatli yuborildi!",
            error: "Iltimos maydonlarni to'ldiring",
        },
        ru: {
            title: "Связаться с нами",
            phone: "Телефон",
            email: "Электронная почта",
            address: "Адрес",
            formTitle: "Отправьте вопрос или предложение",
            name: "Ваше имя",
            message: "Ваше сообщение",
            send: "Отправить",
            success: "Ваше сообщение успешно отправлено!",
            error: "Пожалуйста, заполните все поля",
        }
    }[language];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !message.trim()) {
            toast.error(t.error);
            return;
        }
        toast.success(t.success);
        setName('');
        setMessage('');
    };

    return (
        <div className=" mx-auto px-4 py-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-green-700">{t.title}</h1>

            <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6 bg-green-50 p-8 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-4">
                        <Phone className="text-green-600 w-6 h-6" />
                        <span className="text-lg font-medium">+998 90-992-49-49</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Mail className="text-green-600 w-6 h-6" />
                        <span className="text-lg font-medium">AngrenTanho@tanho.uz</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <MapPin className="text-green-600 w-6 h-6" />
                        <span className="text-lg font-medium">г. Ангрен ул. Навои 45-1</span>
                    </div>
                    <div className="mt-6 space-y-3">
                        {details.map((item, index) => (
                            <div key={index} className="flex items-center gap-3" style={{fontWeight: 600 }}>
                                {item.icon}
                                <span>{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Forma */}
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl space-y-6">
                    <h2 className="text-2xl font-semibold mb-4 text-green-700">{t.formTitle}</h2>
                    <input
                        type="text"
                        placeholder={t.name}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                    />
                    <textarea
                        rows="5"
                        placeholder={t.message}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                    ></textarea>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition"
                    >
                        {t.send}
                    </button>
                </form>
            </div>

            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default ContactPage;
