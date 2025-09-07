import React from 'react';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Contact() {
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const listItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    return (
        <GuestLayout>
            <Head title="Contact" />

            {/* Bannière */}
            <motion.section
                className="bg-[#00c651] text-white py-20 sm:py-40 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl sm:text-5xl font-bold">Contactez-nous</h1>
                    <p className="mt-4 text-lg text-white">
                        Une question ? Un projet ? Notre équipe est là pour vous accompagner.
                    </p>
                </div>
            </motion.section>

            {/* Formulaire + infos */}
            <section className="py-16 sm:py-24 px-6 lg:px-20 bg-white">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Formulaire */}
                        <motion.div
                            className="bg-white p-8 rounded-lg shadow border border-gray-200"
                            initial="hidden"
                            animate="visible"
                            variants={sectionVariants}
                        >
                            <h2 className="text-2xl font-semibold mb-6 text-black">Envoyez-nous un message</h2>
                            <form 
                                action="https://formspree.io/f/xeolvzbr" 
                                method="POST"
                                className="space-y-4"
                            >
                                <input type="hidden" name="_language" value="fr" />
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom et Prénom</label>
                                    <input type="text" id="name" name="Nom" required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00c651]" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Adresse Email</label>
                                    <input type="email" id="email" name="Email" required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00c651]" />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Objet</label>
                                    <input type="text" id="subject" name="Objet" required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00c651]" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea id="message" name="Message" rows="5" required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00c651]"></textarea>
                                </div>
                                <button type="submit" className="w-full bg-[#00c651] text-white font-medium py-3 rounded-md hover:bg-[#009a3d] transition-colors duration-300">
                                    Envoyer le message
                                </button>
                            </form>
                        </motion.div>

                        {/* Coordonnées */}
                        <div>
                            <motion.div
                                className="bg-white p-8 rounded-lg shadow border border-gray-200"
                                initial="hidden"
                                animate="visible"
                                variants={sectionVariants}
                            >
                                <h2 className="text-2xl font-semibold mb-6 text-black">Nos Coordonnées</h2>
                                <motion.ul
                                    className="space-y-6 text-gray-700 text-base"
                                    initial="hidden"
                                    animate="visible"
                                    variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
                                >
                                    <motion.li variants={listItemVariants} className="flex items-start space-x-3">
                                        <FaMapMarkerAlt className="text-lg text-[#00c651] mt-1" />
                                        <div>
                                            <h4 className="font-semibold text-black">Adresse</h4>
                                            <p>Tokpota, Poto-Novo, Bénin</p>
                                        </div>
                                    </motion.li>
                                    <motion.li variants={listItemVariants} className="flex items-start space-x-3">
                                        <FaPhoneAlt className="text-lg text-[#00c651] mt-1" />
                                        <div>
                                            <h4 className="font-semibold text-black">Téléphone</h4>
                                            <a href="tel:+2290161012941" className="hover:text-[#00c651]">
                                                01 61 01 29 41
                                            </a>
                                        </div>
                                    </motion.li>
                                    <motion.li variants={listItemVariants} className="flex items-start space-x-3">
                                        <FaEnvelope className="text-lg text-[#00c651] mt-1" />
                                        <div>
                                            <h4 className="font-semibold text-black">Email</h4>
                                            <a href="mailto:contact@suztech.com" className="hover:text-[#00c651]">
                                                Suztech7@gmail.com
                                            </a>
                                        </div>
                                    </motion.li>
                                    <motion.li variants={listItemVariants} className="flex items-start space-x-3">
                                        <FaClock className="text-lg text-[#00c651] mt-1" />
                                        <div>
                                            <h4 className="font-semibold text-black">Horaire</h4>
                                            <p>Lundi - Vendredi : 8h00 - 18h00</p>
                                            <p>Samedi : 9h00 - 16h00</p>
                                        </div>
                                    </motion.li>
                                </motion.ul>
                            </motion.div>

                            {/* Carte */}
                            <motion.div
                                className="mt-8 rounded-lg overflow-hidden shadow border border-gray-200"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    hidden: { opacity: 0, scale: 0.9 },
                                    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.2 } }
                                }}
                            >
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d7928.488389751037!2d2.6034676789742135!3d6.49073261968272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwMjknNDIuNSJOIDLCsDM2JzMwLjciRQ!5e0!3m2!1sfr!2sbj!4v1756760709418!5m2!1sfr!2sbj"
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