import React from 'react';
import { Link } from '@inertiajs/react';
import { BsTwitterX } from 'react-icons/bs';
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube} from 'react-icons/fa'; // Import de FaXTwitter

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Section supérieure : Logo, liens de navigation, et réseaux sociaux */}
                <div className="flex flex-col items-center justify-between text-center md:flex-row md:text-left">
                    <div className="mb-6 md:mb-0">
                        <Link href="/">
                            <h2 className="text-3xl font-bold text-white">SUZTECH</h2>
                        </Link>
                    </div>

                    <nav className="flex flex-wrap justify-center md:justify-start space-x-6 lg:space-x-8 mb-6 md:mb-0">
                        <Link href={route('home')} className="hover:text-white transition-colors text-sm md:text-base">Accueil</Link>
                        <Link href={route('about')} className="hover:text-white transition-colors text-sm md:text-base">À propos</Link>
                        <Link href={route('shop.index')} className="hover:text-white transition-colors text-sm md:text-base">Boutique</Link>
                        <Link href={route('contact')} className="hover:text-white transition-colors text-sm md:text-base">Contact</Link>
                    </nav>

                    <div className="flex space-x-4">
                        <a href="https://www.facebook.com/profile.php?id=100086739134224" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <FaFacebook className="text-3xl" />
                        </a>
                        <a href="https://x.com/SUZTECH2?t=hh-GpztTL6dZBrQmsJbIWw&s=08" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <BsTwitterX className="text-3xl" />
                        </a>
                        <a href="https://www.instagram.com/suztech2?igsh=MTVvOXMwb3RlaHp2dw==" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <FaInstagram className="text-3xl" />
                        </a>
                        <a href="https://wa.me/2290161012941" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <FaWhatsapp className="text-3xl" />
                        </a>
                        <a href="https://youtube.com/@suztech?si=fg27sf30vr66OXrX" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <FaYoutube className="text-3xl" />
                        </a>
                    </div>
                </div>

                {/* Séparateur */}
                <hr className="my-6 border-gray-700" />

                {/* Section inférieure : Droits d'auteur et informations de contact */}
                <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left text-sm text-gray-500">
                    <p className="mb-2 md:mb-0">© {new Date().getFullYear()} SUZTECH. Tous droits réservés.</p>
                    <div className="space-x-4">
                        <span className="inline-block">Tél: 01 61 01 29 41</span>
                        <span className="inline-block">Email: Suztech7@gmail.com</span>
                        <span className="inline-block">Adresse: Tokpota, Poto-Novo, Bénin</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}