import React from 'react';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Contact() {
    // Variantes pour les éléments de la page
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    // Variantes pour les éléments de la liste de contact
    const listItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    return (
        <GuestLayout>
            <Head title="Contact" />

            {/* Bannière de la page Contact */}
            <motion.section
                className="bg-gray-900 text-white py-24 sm:py-32 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl sm:text-5xl font-extrabold">Contactez-nous</h1>
                    <p className="mt-6 text-lg sm:text-xl">
                        Une question ? Un projet ? Notre équipe est là pour vous accompagner. N'hésitez pas à nous contacter.
                    </p>
                </div>
            </motion.section>

            {/* Section principale avec formulaire et informations */}
            <section className="py-16 sm:py-24 px-6 lg:px-20 bg-white">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Bloc de gauche : Formulaire de contact */}
                        <motion.div
                            className="bg-gray-100 p-8 rounded-lg shadow-lg"
                            initial="hidden"
                            animate="visible"
                            variants={sectionVariants}
                        >
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
                        </motion.div>

                        {/* Bloc de droite : Informations de contact et carte */}
                        <div>
                            <motion.div
                                className="bg-gray-100 p-8 rounded-lg shadow-lg"
                                initial="hidden"
                                animate="visible"
                                variants={sectionVariants}
                            >
                                <h2 className="text-3xl font-bold mb-6 text-gray-800">Nos Coordonnées</h2>
                                <motion.ul
                                    className="space-y-6 text-gray-700 text-lg"
                                    initial="hidden"
                                    animate="visible"
                                    variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
                                >
                                    <motion.li variants={listItemVariants} className="flex items-start space-x-4">
                                        <FaMapMarkerAlt className="text-2xl text-blue-600 mt-1" />
                                        <div>
                                            <h4 className="font-bold">Adresse</h4>
                                            <p>Carré 1234, Porto-Novo, Bénin</p>
                                        </div>
                                    </motion.li>
                                    <motion.li variants={listItemVariants} className="flex items-start space-x-4">
                                        <FaPhoneAlt className="text-2xl text-blue-600 mt-1" />
                                        <div>
                                            <h4 className="font-bold">Téléphone</h4>
                                            <a href="tel:+2290161012941" className="hover:underline">
                                                01 61 01 29 41
                                            </a>
                                        </div>
                                    </motion.li>
                                    <motion.li variants={listItemVariants} className="flex items-start space-x-4">
                                        <FaEnvelope className="text-2xl text-blue-600 mt-1" />
                                        <div>
                                            <h4 className="font-bold">Email</h4>
                                            <a href="mailto:contact@suztech.com" className="hover:underline">
                                                contact@suztech.com
                                            </a>
                                        </div>
                                    </motion.li>
                                    <motion.li variants={listItemVariants} className="flex items-start space-x-4">
                                        <FaClock className="text-2xl text-blue-600 mt-1" />
                                        <div>
                                            <h4 className="font-bold">Horaire</h4>
                                            <p>Lundi - Vendredi : 8h00 - 18h00</p>
                                            <p>Samedi : 9h00 - 16h00</p>
                                        </div>
                                    </motion.li>
                                </motion.ul>
                            </motion.div>
                            
                            {/* Carte Google Maps */}
                            <motion.div
                                className="mt-8 rounded-lg overflow-hidden shadow-lg"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    hidden: { opacity: 0, scale: 0.8 },
                                    visible: { 
                                        opacity: 1, 
                                        scale: 1, 
                                        transition: { duration: 0.6, delay: 0.2 }
                                    }
                                }}
                            >
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15783.47957969854!2d2.6288647499999996!3d6.49502755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x102355523456789a%3A0x123456789abcdef0!2sPorto-Novo%2C%20Ou%C3%A9m%C3%A9%20Department%2C%20Benin!5e0!3m2!1sen!2s!4v1678901234567!5m2!1sen!2s"
                                    width="100%"
                                    height="300"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="Localisation de notre bureau"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
