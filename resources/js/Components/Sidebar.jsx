import React, { memo, useCallback } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaHome, FaStore, FaEnvelope, FaCog, FaIdCard } from 'react-icons/fa';

const Sidebar = memo(function Sidebar({ isOpen, onClose }) {
    const { url } = usePage();

    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);

    const links = [
        { href: '/', label: 'Accueil', icon: <FaHome /> },
        { href: '/services', label: 'Services', icon: <FaCog /> },
        { href: '/shop', label: 'Boutique', icon: <FaStore /> },
        { href: '/about', label: 'À propos', icon: <FaIdCard /> },
        { href: '/contact', label: 'Contact', icon: <FaEnvelope /> },
    ];

    // Variants for the sidebar and its content
    const sidebarVariants = {
        open: {
            x: 0,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        },
        closed: {
            x: '100%',
            transition: {
                duration: 0.3,
                ease: "easeIn"
            }
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay derrière la sidebar */}
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={handleClose}
                        style={{ willChange: 'opacity' }}
                    ></motion.div>

                    {/* Sidebar */}
                    <motion.div
                        className="fixed inset-y-0 right-0 w-80 bg-gray-900 z-50 shadow-2xl flex flex-col"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={sidebarVariants}
                        style={{ willChange: 'transform' }}
                    >
                        {/* Bouton de fermeture */}
                        <div className="flex justify-end p-4">
                            <motion.button
                                onClick={handleClose}
                                className="text-white text-5xl"
                                whileHover={{ rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                &times;
                            </motion.button>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 px-6">
                            <ul className="flex flex-col text-2xl font-semibold text-white gap-3">
                                {links.map(({ href, label, icon }) => (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            onClick={handleClose}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                                url === href
                                                    ? 'bg-[#00c651] text-white shadow-lg'
                                                    : 'hover:text-white'
                                            }`}
                                        >
                                            <span className="text-xl">{icon}</span>
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* WhatsApp CTA */}
                        <div className="p-6">
                            <motion.a
                                href="https://wa.me/22961012941"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-3 px-6 py-3 text-lg font-bold rounded-xl shadow-lg text-green-700 bg-white"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <FaWhatsapp className="text-2xl text-green-500" />
                                WhatsApp
                            </motion.a>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
});

export default Sidebar;
