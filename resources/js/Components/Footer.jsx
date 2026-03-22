import React from 'react';
import { Link } from '@inertiajs/react';
import { BsTwitterX } from 'react-icons/bs';
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, WHATSAPP_URL } from '@/constants/business';

export default function Footer() {
    return (
        <footer className="bg-gray-900 px-4 py-8 text-gray-400 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col items-center justify-between text-center md:flex-row md:text-left">
                    <div className="mb-6 md:mb-0">
                        <Link href="/">
                            <h2 className="text-3xl font-bold text-white">SUZTECH</h2>
                        </Link>
                    </div>

                    <nav className="mb-6 flex flex-wrap justify-center space-x-6 md:mb-0 md:justify-start lg:space-x-8" aria-label="Liens du pied de page">
                        <Link href={route('home')} className="text-sm transition-colors hover:text-white md:text-base">Accueil</Link>
                        <Link href={route('about')} className="text-sm transition-colors hover:text-white md:text-base">A propos</Link>
                        <Link href={route('shop.index')} className="text-sm transition-colors hover:text-white md:text-base">Boutique</Link>
                        <Link href={route('contact')} className="text-sm transition-colors hover:text-white md:text-base">Contact</Link>
                    </nav>

                    <div className="flex space-x-4">
                        <a href="https://www.facebook.com/profile.php?id=100086739134224" target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-colors hover:text-white" aria-label="Visiter la page Facebook de SUZTECH">
                            <FaFacebook className="text-3xl" aria-hidden="true" />
                        </a>
                        <a href="https://x.com/SUZTECH2?t=hh-GpztTL6dZBrQmsJbIWw&s=08" target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-colors hover:text-white" aria-label="Visiter le compte X de SUZTECH">
                            <BsTwitterX className="text-3xl" aria-hidden="true" />
                        </a>
                        <a href="https://www.instagram.com/suztech2?igsh=MTVvOXMwb3RlaHp2dw==" target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-colors hover:text-white" aria-label="Visiter le compte Instagram de SUZTECH">
                            <FaInstagram className="text-3xl" aria-hidden="true" />
                        </a>
                        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-colors hover:text-white" aria-label="Contacter SUZTECH sur WhatsApp">
                            <FaWhatsapp className="text-3xl" aria-hidden="true" />
                        </a>
                        <a href="https://youtube.com/@suztech?si=fg27sf30vr66OXrX" target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-colors hover:text-white" aria-label="Visiter la chaine YouTube de SUZTECH">
                            <FaYoutube className="text-3xl" aria-hidden="true" />
                        </a>
                    </div>
                </div>

                <hr className="my-6 border-gray-700" />

                <div className="flex flex-col items-center justify-between text-center text-sm text-gray-500 md:flex-row md:text-left">
                    <p className="mb-2 md:mb-0">© {new Date().getFullYear()} SUZTECH. Tous droits reserves.</p>
                    <div className="space-x-4">
                        {/* FIX: Use the centralized business constants to keep footer contact details consistent. */}
                        <span className="inline-block">Tel: {CONTACT_PHONE_DISPLAY}</span>
                        <span className="inline-block">Email: {CONTACT_EMAIL}</span>
                        <span className="inline-block">Adresse: Tokpota, Poto-Novo, Benin</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
