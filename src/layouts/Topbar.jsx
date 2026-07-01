import React, { useState, useEffect } from 'react';
import { Menu, LogOut, MessageSquare } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../api/client';
import clsx from 'clsx';
import { CompanySelector } from '../components/CompanySelector';

export const Topbar = ({ title = 'Overview', onMenuClick }) => {
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const [unreadCount, setUnreadCount] = useState(0);
    const [currentLang, setCurrentLang] = React.useState(i18n.language?.split('-')[0] || 'en');

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        navigate('/login');
    };

    useEffect(() => {
        const fetchUnreadCount = async () => {
            try {
                const res = await api.get('/api/communication/unread-stats');
                setUnreadCount(res.data.count || 0);
            } catch (err) { }
        };
        fetchUnreadCount();
        const interval = setInterval(fetchUnreadCount, 30000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const syncWithGoogle = () => {
            const masterSelect = document.querySelector("#google_translate_master_container select.goog-te-combo");
            if (masterSelect && masterSelect.value && masterSelect.value !== currentLang) {
                setCurrentLang(masterSelect.value);
                i18n.changeLanguage(masterSelect.value);
            }
        };
        const interval = setInterval(syncWithGoogle, 1000);
        return () => clearInterval(interval);
    }, [currentLang, i18n]);

    const handleLanguageChange = (lang) => {
        i18n.changeLanguage(lang);
        setCurrentLang(lang);
        const masterSelect = document.querySelector("#google_translate_master_container select.goog-te-combo");
        if (masterSelect) {
            masterSelect.value = lang;
            masterSelect.dispatchEvent(new Event("change"));
        }
    };

    return (
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-100/80 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40">
            {/* LEFT */}
            <div className="flex items-center gap-4">
                <button
                    className="block lg:hidden text-slate-600 p-2 hover:bg-slate-50 rounded-xl transition"
                    onClick={onMenuClick}
                >
                    <Menu size={24} />
                </button>
                <h1 className="text-lg font-black text-slate-800 tracking-tight whitespace-nowrap">{title}</h1>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3 md:gap-4">
                {/* COMPANY SELECTOR */}
                <CompanySelector />

                {/* SMS NOTIFICATION */}
                <Link
                    to="/admin/sms/inbox"
                    className="relative p-2.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                    title="SMS Inbox"
                >
                    <MessageSquare size={20} />
                    {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 w-2 h-2 bg-danger text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                    )}
                </Link>

                {/* LANGUAGE SWITCHER */}
                <div className="flex items-center bg-slate-100/80 rounded-xl p-1 h-9 notranslate">
                    <button
                        onClick={() => handleLanguageChange('en')}
                        className={clsx(
                            "px-3 h-full text-[11px] font-black rounded-lg transition-all uppercase tracking-wider",
                            currentLang === 'en'
                                ? "bg-white text-primary shadow-sm"
                                : "text-slate-400 hover:text-slate-600"
                        )}
                    >
                        EN
                    </button>
                    <button
                        onClick={() => handleLanguageChange('fr')}
                        className={clsx(
                            "px-3 h-full text-[11px] font-black rounded-lg transition-all uppercase tracking-wider",
                            currentLang === 'fr'
                                ? "bg-white text-primary shadow-sm"
                                : "text-slate-400 hover:text-slate-600"
                        )}
                    >
                        FR
                    </button>
                </div>

                {/* LOGOUT */}
                <button
                    className="hidden sm:flex items-center gap-1.5 h-9 px-3 rounded-xl border border-slate-200 bg-white text-slate-500 text-xs font-bold cursor-pointer transition-all hover:bg-rose-50 hover:text-danger hover:border-rose-100"
                    onClick={handleLogout}
                    title="Logout"
                >
                    <LogOut size={15} />
                    <span className="hidden md:inline">Logout</span>
                </button>
            </div>
        </header>
    );
};
