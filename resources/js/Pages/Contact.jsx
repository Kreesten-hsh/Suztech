import React from 'react';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';

export default function Contact() {
    return (
        <GuestLayout>
            <Head title="Contact" />

            {/* Bannière de la page Contact */}
            <section className="bg-gray-900 text-white py-24 sm:py-32 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl sm:text-5xl font-extrabold">Contactez-nous</h1>
                    <p className="mt-6 text-lg sm:text-xl">
                        Une question ? Un projet ? Notre équipe est là pour vous accompagner. N'hésitez pas à nous contacter.
                    </p>
                </div>
            </section>

            {/* Section principale avec formulaire et informations */}
            <section className="py-16 sm:py-24 px-6 lg:px-20 bg-white">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Bloc de gauche : Formulaire de contact */}
                        <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
                            <h2 className="text-3xl font-bold mb-6 text-gray-800">Envoyez-nous un message</h2>
                            <form action="#">
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Nom et Prénom</label>
                                    <input type="text" id="name" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Adresse Email</label>
                                    <input type="email" id="email" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">Objet</label>
                                    <input type="text" id="subject" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message</label>
                                    <textarea id="message" rows="5" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                                </div>
                                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition-colors duration-300">
                                    Envoyer le message
                                </button>
                            </form>
                        </div>

                        {/* Bloc de droite : Informations de contact et carte */}
                        <div>
                            <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
                                <h2 className="text-3xl font-bold mb-6 text-gray-800">Nos Coordonnées</h2>
                                <ul className="space-y-6 text-gray-700 text-lg">
                                    <li className="flex items-start space-x-4">
                                        <FaMapMarkerAlt className="text-2xl text-blue-600 mt-1" />
                                        <div>
                                            <h4 className="font-bold">Adresse</h4>
                                            <p>Carré 1234, Cotonou, Bénin</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start space-x-4">
                                        <FaPhoneAlt className="text-2xl text-blue-600 mt-1" />
                                        <div>
                                            <h4 className="font-bold">Téléphone</h4>
                                            <a href="tel:+2290161012941" className="hover:underline">
                                                01 61 01 29 41
                                            </a>
                                        </div>
                                    </li>
                                    <li className="flex items-start space-x-4">
                                        <FaEnvelope className="text-2xl text-blue-600 mt-1" />
                                        <div>
                                            <h4 className="font-bold">Email</h4>
                                            <a href="mailto:contact@suztech.com" className="hover:underline">
                                                contact@suztech.com
                                            </a>
                                        </div>
                                    </li>
                                    <li className="flex items-start space-x-4">
                                        <FaClock className="text-2xl text-blue-600 mt-1" />
                                        <div>
                                            <h4 className="font-bold">Horaire</h4>
                                            <p>Lundi - Vendredi : 8h00 - 18h00</p>
                                            <p>Samedi : 9h00 - 16h00</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            
                            {/* Carte Google Maps */}
                            <div className="mt-8 rounded-lg overflow-hidden shadow-lg">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.733571166318!2d2.4172352147702845!3d6.426210295350702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b417f7b28f8f9%3A0x6b1399f5e3e2c3e1!2sSuztech!5e0!3m2!1sen!2sbj!4v1628796854123!5m2!1sen!2sbj"
                                    width="100%"
                                    height="300"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="Google Maps Location"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}