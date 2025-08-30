import React from 'react';
import { Link } from '@inertiajs/react';
import { FaWhatsapp } from 'react-icons/fa';
import { usePage } from '@inertiajs/react';

export default function Sidebar({ isOpen, onClose }) {
    const { url } = usePage();
    return (
        <div
            className={`fixed inset-y-0 right-0 w-full bg-gray-900 z-50 transform ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            } transition-transform duration-300 ease-in-out shadow-xl`}
        >
            <div className="flex justify-end p-4">
                <button onClick={onClose} className="text-white text-6xl">
                    &times;
                </button>
            </div>
            <nav className="p-4">
                <ul className="flex flex-col text-2xl gap-2 font-semibold text-white">
                    <li>
                        <Link href="/" onClick={onClose} className={`block p-4 rounded-lg transition-colors duration-200 ${url === '/' ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 hover:text-white'}`}>
                            Accueil
                        </Link>
                    </li>
                    <li>
                        <Link href="/services" onClick={onClose} className={`block p-4 rounded-lg transition-colors duration-200 ${url.startsWith('/services') ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 hover:text-white'}`}>
                            Services
                        </Link>
                    </li>
                    <li>
                        <Link href="/boutique" onClick={onClose} className={`block p-4 rounded-lg transition-colors duration-200 ${url.startsWith('/boutique') ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 hover:text-white'}`}>
                            Boutique
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" onClick={onClose} className={`block p-4 rounded-lg transition-colors duration-200 ${url.startsWith('/about') ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 hover:text-white'}`}>
                            À propos
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact" onClick={onClose} className={`block p-4 rounded-lg transition-colors duration-200 ${url.startsWith('/contact') ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 hover:text-white'}`}>
                            Contact
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="px-6">
                <a href={`https://wa.me/22961012941`} target="_blank" className="text-white font-bold p-4 rounded-lg border border-gray-300 flex items-center gap-2">
                    <FaWhatsapp className="text-4xl text-green-500" />
                    <span className='text-xl'>WhatsApp</span>
                </a>
            </div>
        </div>
    );
}