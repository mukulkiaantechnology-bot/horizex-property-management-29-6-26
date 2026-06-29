import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    LayoutDashboard,
    Building2,
    CircleDollarSign,
    BarChart3,
    LogOut,
    ShieldCheck,
    MessageSquare,
    X
} from 'lucide-react';
import clsx from 'clsx';

export const OwnerSidebar = ({ isOpen, setIsOpen }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isOwnerLoggedIn');
        localStorage.removeItem('ownerId');
        navigate('/owner/login');
    };

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/owner/dashboard' },
        { icon: Building2, label: 'Properties', path: '/owner/properties' },
        { icon: CircleDollarSign, label: 'Financials', path: '/owner/financials' },
        { icon: BarChart3, label: 'Reports', path: '/owner/reports' },
        { icon: BarChart3, label: 'Rent Roll', path: '/owner/rent-roll' },
        { icon: MessageSquare, label: 'Messages', path: '/owner/communication' },
    ];

    return (
        <>
            {/* Backdrop for mobile */}
            <div
                className={clsx(
                    "fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 transition-opacity duration-300 lg:hidden",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsOpen(false)}
            />

            <aside className={clsx(
                "fixed inset-y-0 left-0 lg:sticky lg:top-0 z-[60] w-72 bg-[#111827] border-r border-slate-800 flex flex-col h-screen shrink-0 transition-transform duration-300 ease-in-out lg:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                {/* Logo Section */}
                <div className="h-20 flex items-center px-6 justify-between border-b border-slate-800 shrink-0">
                    <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/owner/dashboard')}>
                        <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-100 flex items-center justify-center overflow-hidden">
                            <img src="/assets/logo.png" alt="Masteko Logo" className="h-8 w-auto object-contain" />
                        </div>
                    </div>
                    {/* Close button for mobile */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="lg:hidden p-2 rounded-xl text-slate-400 hover:bg-slate-800 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
                    <div className="px-4 mb-2 mt-2">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Main Menu</p>
                    </div>
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) => clsx(
                                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 group",
                                isActive
                                    ? "bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white shadow-lg shadow-blue-500/20"
                                    : "text-slate-400 hover:bg-[#1F2937] hover:text-white"
                            )}
                        >
                            <item.icon size={20} className="transition-transform duration-300 group-hover:scale-110" />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Bottom Section */}
                <div className="p-6 border-t border-slate-800 space-y-4 shrink-0">
                    <div className="bg-slate-800/40 rounded-2xl p-4 border border-slate-800/80">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center border-2 border-slate-700 shadow-sm">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Access Mode</p>
                                <p className="text-xs font-bold text-slate-300">Read-Only</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl text-sm font-bold text-slate-400 hover:bg-rose-600/20 hover:text-rose-400 transition-all duration-300 group"
                    >
                        <LogOut size={20} className="transition-transform group-hover:-translate-x-1" />
                        Secure Logout
                    </button>
                </div>
            </aside>
        </>
    );
};
