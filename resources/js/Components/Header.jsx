import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Sidebar from '@/Components/Sidebar';
import { FaWhatsapp } from 'react-icons/fa';

export default function Header() {
    const { url } = usePage();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const headerVariants = {
        hidden: { y: -100, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 14, delay: 0.2 } },
    };

    const linkVariants = {
        hover: { scale: 1.05, color: '#1f2937' },
        tap: { scale: 0.95 },
    };

    return (
        <motion.header
            className="fixed top-0 w-full z-50 bg-white/90 lg:backdrop-blur-md shadow-md"
            variants={headerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="container mx-auto flex justify-between items-center p-4">
                {/* Élément de remplissage pour le logo avec une hauteur augmentée pour correspondre au logo */}
                <div className="w-40"></div> 

                {/* Le logo en position absolue (flottant) ajusté pour être plus haut */}
                <motion.div
                    className="absolute left-4 -translate-y-1 z-10"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <a href="/">
                        <img
                            src="/images/logo.png"
                            alt="SUZTECH Logo"
                            className="h-32 w-auto lg:h-40"
                        />
                    </a>
                </motion.div>

                {/* Navigation pour les grands écrans (lg) */}
                <nav className="hidden lg:block">
                    <ul className="flex gap-8 font-semibold text-gray-600">
                        <li>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link href="/" className={`${url === '/' ? 'text-[#00c651]' : 'hover:text-gray-800 transition-colors'}`}>
                                    Accueil
                                </Link>
                            </motion.div>
                        </li>
                        <li>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link href="/services" className={`${url.startsWith('/services') ? 'text-[#00c651]' : 'hover:text-gray-800 transition-colors'}`}>
                                    Services
                                </Link>
                            </motion.div>
                        </li>
                        <li>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link href="/shop" className={`${url.startsWith('/shop') ? 'text-[#00c651]' : 'hover:text-gray-800 transition-colors'}`}>
                                    Boutique
                                </Link>
                            </motion.div>
                        </li>
                        <li>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link href="/about" className={`${url.startsWith('/about') ? 'text-[#00c651]' : 'hover:text-gray-800 transition-colors'}`}>
                                    À propos
                                </Link>
                            </motion.div>
                        </li>
                        <li>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link href="/contact" className={`${url.startsWith('/contact') ? 'text-[#00c651]' : 'hover:text-gray-800 transition-colors'}`}>
                                    Contact
                                </Link>
                            </motion.div>
                        </li>
                    </ul>
                </nav>

                <div className="hidden sm:block">
                    <motion.a 
                        href={`https://wa.me/22961012941`}
                        target="_blank"
                        className="text-gray-800 font-bold p-3 rounded-lg border border-gray-400 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaWhatsapp className="text-xl text-green-500" />
                        <span>WhatsApp</span>
                    </motion.a>
                </div>

                {/* Bouton du menu hamburger pour les petits écrans */}
                <div className="lg:hidden">
                    <motion.button
                        onClick={toggleSidebar}
                        className="text-gray-800 focus:outline-none"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </motion.button>
                </div>
            </div>

            {/* Barre latérale */}
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        </motion.header>
    );
}
