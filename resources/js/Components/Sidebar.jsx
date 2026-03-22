import React, { memo, useCallback, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaCog, FaEnvelope, FaHome, FaIdCard, FaStore, FaWhatsapp } from 'react-icons/fa';
import { WHATSAPP_URL } from '@/constants/business';

const getFocusableElements = (container) => {
    if (!container) {
        return [];
    }

    return Array.from(
        container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
    ).filter((element) => !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true');
};

const Sidebar = memo(function Sidebar({ isOpen, onClose }) {
    const { url } = usePage();
    const drawerRef = useRef(null);
    const closeButtonRef = useRef(null);

    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);

    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        closeButtonRef.current?.focus();

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                handleClose();
                return;
            }

            if (event.key !== 'Tab') {
                return;
            }

            const focusableElements = getFocusableElements(drawerRef.current);

            if (focusableElements.length === 0) {
                event.preventDefault();
                return;
            }

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleClose, isOpen]);

    const links = [
        { href: '/', label: 'Accueil', icon: FaHome },
        { href: '/services', label: 'Services', icon: FaCog },
        { href: '/shop', label: 'Boutique', icon: FaStore },
        { href: '/about', label: 'A propos', icon: FaIdCard },
        { href: '/contact', label: 'Contact', icon: FaEnvelope },
    ];

    const sidebarVariants = {
        open: {
            x: 0,
            transition: {
                duration: 0.3,
                ease: 'easeOut',
            },
        },
        closed: {
            x: '100%',
            transition: {
                duration: 0.3,
                ease: 'easeIn',
            },
        },
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="fixed inset-0 z-40 bg-black bg-opacity-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={handleClose}
                        aria-hidden="true"
                        style={{ willChange: 'opacity' }}
                    />

                    <motion.div
                        id="mobile-navigation"
                        ref={drawerRef}
                        className="fixed inset-y-0 right-0 z-50 flex w-80 flex-col bg-gray-900 shadow-2xl"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={sidebarVariants}
                        style={{ willChange: 'transform' }}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="mobile-navigation-title"
                    >
                        <div className="flex justify-end p-4">
                            <motion.button
                                ref={closeButtonRef}
                                type="button"
                                onClick={handleClose}
                                className="text-5xl text-white"
                                whileHover={{ rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                aria-label="Fermer le menu principal"
                            >
                                &times;
                            </motion.button>
                        </div>

                        <div className="sr-only" id="mobile-navigation-title">
                            Navigation principale
                        </div>

                        <nav className="flex-1 px-6" aria-label="Navigation mobile">
                            <ul className="flex flex-col gap-3 text-2xl font-semibold text-white">
                                {links.map(({ href, label, icon: Icon }) => (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            onClick={handleClose}
                                            className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                                                url === href
                                                    ? 'bg-[#00c651] text-white shadow-lg'
                                                    : 'hover:text-white'
                                            }`}
                                        >
                                            <Icon className="text-xl" aria-hidden="true" />
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <div className="p-6">
                            <motion.a
                                href={WHATSAPP_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-6 py-3 text-lg font-bold text-green-700 shadow-lg"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                aria-label="Discuter avec SUZTECH sur WhatsApp"
                            >
                                <FaWhatsapp className="text-2xl text-green-500" aria-hidden="true" />
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
