import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import { FaWhatsapp } from 'react-icons/fa';
import { usePage } from '@inertiajs/react';

export default function Header() {
    const { url } = usePage();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <header className="fixed top-0 w-full z-50 bg-white/90 lg:backdrop-blur-md shadow-md">
            <div className="container mx-auto flex justify-between items-center p-4">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-gray-800">
                    Suztech
                </Link>

                {/* Navigation pour les grands écrans (lg) */}
                <nav className="hidden lg:block">
                    <ul className="flex gap-8 text-lg font-semibold text-gray-600">
                        <nav className="hidden lg:block">
                            <ul className="flex gap-8 font-semibold text-gray-600">
                                <li>
                                    <Link href="/" className={`${url === '/' ? 'text-blue-600' : 'hover:text-gray-800 transition-colors'}`}>
                                        Accueil
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/services" className={`${url.startsWith('/services') ? 'text-blue-600' : 'hover:text-gray-800 transition-colors'}`}>
                                        Services
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/boutique" className={`${url.startsWith('/boutique') ? 'text-blue-600' : 'hover:text-gray-800 transition-colors'}`}>
                                        Boutique
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about" className={`${url.startsWith('/about') ? 'text-blue-600' : 'hover:text-gray-800 transition-colors'}`}>
                                        À propos
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className={`${url.startsWith('/contact') ? 'text-blue-600' : 'hover:text-gray-800 transition-colors'}`}>
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </ul>
                </nav>

                <div className="hidden sm:block">
                    <a href={`https://wa.me/22961012941`} target="_blank" className="text-gray-800 font-bold p-3 rounded-lg border border-gray-400 flex items-center gap-2">
                        <FaWhatsapp className="text-xl text-green-500" />
                        <span>WhatsApp</span>
                    </a>
                </div>

                {/* Bouton du menu hamburger pour les petits écrans */}
                <div className="lg:hidden">
                    <button onClick={toggleSidebar} className="text-gray-800 focus:outline-none">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Barre latérale */}
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        </header>
    );
}