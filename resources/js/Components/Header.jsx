import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import Sidebar from '@/Components/Sidebar';
import { WHATSAPP_URL } from '@/constants/business';

export default function Header() {
    const { url } = usePage();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen((previousState) => !previousState);
    };

    const headerVariants = {
        hidden: { y: -100, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120, damping: 14, delay: 0.2 } },
    };

    return (
        <motion.header
            className="fixed top-0 z-50 w-full bg-white/90 shadow-md lg:backdrop-blur-md"
            variants={headerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="container mx-auto flex items-center justify-between p-4">
                <div className="w-40"></div>

                <motion.div
                    className="absolute left-4 z-10 -translate-y-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link href={route('home')} aria-label="Aller a la page d'accueil de SUZTECH">
                        <img
                            src="/images/logo.png"
                            alt="Logo SUZTECH"
                            className="h-32 w-auto lg:h-40"
                        />
                    </Link>
                </motion.div>

                <nav className="hidden lg:block" aria-label="Navigation principale">
                    <ul className="flex gap-8 font-semibold text-gray-600">
                        <li>
                            <Link href="/" className={`${url === '/' ? 'text-[#00c651]' : 'transition-colors hover:text-gray-800'}`}>
                                Accueil
                            </Link>
                        </li>
                        <li>
                            <Link href="/services" className={`${url.startsWith('/services') ? 'text-[#00c651]' : 'transition-colors hover:text-gray-800'}`}>
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link href="/shop" className={`${url.startsWith('/shop') ? 'text-[#00c651]' : 'transition-colors hover:text-gray-800'}`}>
                                Boutique
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className={`${url.startsWith('/about') ? 'text-[#00c651]' : 'transition-colors hover:text-gray-800'}`}>
                                A propos
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className={`${url.startsWith('/contact') ? 'text-[#00c651]' : 'transition-colors hover:text-gray-800'}`}>
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="hidden sm:block">
                    {/* FIX: Use the centralized business constant and preserve opener protection on the external CTA. */}
                    <motion.a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-lg border border-gray-400 p-3 font-bold text-gray-800"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaWhatsapp className="text-xl text-green-500" aria-hidden="true" />
                        <span>WhatsApp</span>
                    </motion.a>
                </div>

                <div className="lg:hidden">
                    <motion.button
                        type="button"
                        onClick={toggleSidebar}
                        className="text-gray-800"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={isSidebarOpen ? 'Fermer le menu principal' : 'Ouvrir le menu principal'}
                        aria-expanded={isSidebarOpen}
                        aria-controls="mobile-navigation"
                    >
                        <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </motion.button>
                </div>
            </div>

            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </motion.header>
    );
}
