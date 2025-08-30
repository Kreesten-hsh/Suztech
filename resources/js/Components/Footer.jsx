import React from 'react';
import { Link } from '@inertiajs/react';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-gray-300 py-16 px-6 lg:px-20">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
                    {/* Colonne 1 : Logo et Description */}
                    <div>
                        <Link href="/" className="flex items-center justify-center md:justify-start space-x-2">
                            <h2 className="text-3xl font-bold text-white">Suztech</h2>
                        </Link>
                        <p className="mt-4 text-sm text-gray-400">
                            Votre partenaire de confiance pour des solutions technologiques et administratives fiables et rapides.
                        </p>
                        <div className="flex justify-center md:justify-start space-x-4 mt-6">
                            <a href="https://facebook.com" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                                <FaFacebook className="text-4xl" />
                            </a>
                            <a href="https://twitter.com" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                                <FaTwitter className="text-4xl" />
                            </a>
                            <a href="https://instagram.com" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                                <FaInstagram className="text-4xl" />
                            </a>
                            <a href="https://wa.me/2290161012941" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                                <FaWhatsapp className="text-4xl" />
                            </a>
                        </div>
                    </div>

                    {/* Colonne 2 : Navigation */}
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Navigation</h3>
                        <ul className="space-y-3">
                            <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
                            <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                            <li><Link href="/boutique" className="hover:text-white transition-colors">Boutique</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">À propos</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Colonne 3 : Services */}
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Nos Services</h3>
                        <ul className="space-y-3">
                            <li><Link href="/services#consulting" className="hover:text-white transition-colors">Consultant IT</Link></li>
                            <li><Link href="/services#reparation" className="hover:text-white transition-colors">Réparation</Link></li>
                            <li><Link href="/services#logos" className="hover:text-white transition-colors">Création de Logos</Link></li>
                            <li><Link href="/services#formalites" className="hover:text-white transition-colors">Formalités administratives</Link></li>
                            <li><Link href="/services#paiement" className="hover:text-white transition-colors">Paiement de factures</Link></li>
                        </ul>
                    </div>
                    
                    {/* Colonne 4 : Informations de contact */}
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="tel:+2290161012941" className="hover:text-white transition-colors">Tél: 01 61 01 29 41</a>
                            </li>
                            <li>
                                <a href="mailto:contact@suztech.com" className="hover:text-white transition-colors">Email: contact@suztech.com</a>
                            </li>
                            <li>
                                <span>Adresse: (Ajoutez votre adresse)</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500 text-md">
                    <p>&copy; {new Date().getFullYear()} Suztech. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
}