import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import SEO from '@/Components/SEO';
import { FaClock, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import {
    CONTACT_EMAIL,
    CONTACT_PHONE_DISPLAY,
    CONTACT_PHONE_URL,
    FORMSPREE_URL,
} from '@/constants/business';

export default function Contact() {
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    const listItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    return (
        <GuestLayout>
            {/* FIX: Add reusable SEO metadata for the contact page. */}
            <SEO
                title="Contact"
                description="Contactez SUZTECH a Porto-Novo pour vos besoins en informatique, design et prestations administratives."
                type="website"
            />

            <motion.section
                className="bg-[#00c651] py-20 text-center text-white sm:py-40"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold sm:text-5xl">Contactez-nous</h1>
                    <p className="mt-4 text-lg text-white">
                        Une question ? Un projet ? Notre equipe est la pour vous accompagner.
                    </p>
                </div>
            </motion.section>

            <section className="bg-white px-6 py-16 sm:py-24 lg:px-20">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                        <motion.div
                            className="rounded-lg border border-gray-200 bg-white p-8 shadow"
                            initial="hidden"
                            animate="visible"
                            variants={sectionVariants}
                        >
                            <h2 className="mb-6 text-2xl font-semibold text-black">Envoyez-nous un message</h2>
                            <form action={FORMSPREE_URL} method="POST" className="space-y-4">
                                <input type="hidden" name="_language" value="fr" />

                                {/* FIX: Keep the Formspree endpoint centralized and labels fully associated. */}
                                <div>
                                    <label htmlFor="contact-name" className="mb-1 block text-sm font-medium text-gray-700">
                                        Nom et Prenom
                                    </label>
                                    <input
                                        type="text"
                                        id="contact-name"
                                        name="Nom"
                                        required
                                        className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-[#00c651]"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contact-email" className="mb-1 block text-sm font-medium text-gray-700">
                                        Adresse Email
                                    </label>
                                    <input
                                        type="email"
                                        id="contact-email"
                                        name="Email"
                                        required
                                        className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-[#00c651]"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contact-subject" className="mb-1 block text-sm font-medium text-gray-700">
                                        Objet
                                    </label>
                                    <input
                                        type="text"
                                        id="contact-subject"
                                        name="Objet"
                                        required
                                        className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-[#00c651]"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contact-message" className="mb-1 block text-sm font-medium text-gray-700">
                                        Message
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        name="Message"
                                        rows="5"
                                        required
                                        className="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-[#00c651]"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full rounded-md bg-[#00c651] py-3 font-medium text-white transition-colors duration-300 hover:bg-[#009a3d]"
                                >
                                    Envoyer le message
                                </button>
                            </form>
                        </motion.div>

                        <div>
                            <motion.div
                                className="rounded-lg border border-gray-200 bg-white p-8 shadow"
                                initial="hidden"
                                animate="visible"
                                variants={sectionVariants}
                            >
                                <h2 className="mb-6 text-2xl font-semibold text-black">Nos Coordonnees</h2>
                                <motion.ul
                                    className="space-y-6 text-base text-gray-700"
                                    initial="hidden"
                                    animate="visible"
                                    variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
                                >
                                    <motion.li variants={listItemVariants} className="flex items-start space-x-3">
                                        <FaMapMarkerAlt className="mt-1 text-lg text-[#00c651]" />
                                        <div>
                                            <h4 className="font-semibold text-black">Adresse</h4>
                                            <p>Tokpota, Porto-Novo, Benin</p>
                                        </div>
                                    </motion.li>
                                    <motion.li variants={listItemVariants} className="flex items-start space-x-3">
                                        <FaPhoneAlt className="mt-1 text-lg text-[#00c651]" />
                                        <div>
                                            <h4 className="font-semibold text-black">Telephone</h4>
                                            <a href={CONTACT_PHONE_URL} className="hover:text-[#00c651]">
                                                {CONTACT_PHONE_DISPLAY}
                                            </a>
                                        </div>
                                    </motion.li>
                                    <motion.li variants={listItemVariants} className="flex items-start space-x-3">
                                        <FaEnvelope className="mt-1 text-lg text-[#00c651]" />
                                        <div>
                                            <h4 className="font-semibold text-black">Email</h4>
                                            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-[#00c651]">
                                                {CONTACT_EMAIL}
                                            </a>
                                        </div>
                                    </motion.li>
                                    <motion.li variants={listItemVariants} className="flex items-start space-x-3">
                                        <FaClock className="mt-1 text-lg text-[#00c651]" />
                                        <div>
                                            <h4 className="font-semibold text-black">Horaire</h4>
                                            <p>Lundi - Vendredi : 8h00 - 18h00</p>
                                            <p>Samedi : 9h00 - 16h00</p>
                                        </div>
                                    </motion.li>
                                </motion.ul>
                            </motion.div>

                            <motion.div
                                className="mt-8 overflow-hidden rounded-lg border border-gray-200 shadow"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    hidden: { opacity: 0, scale: 0.9 },
                                    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.2 } },
                                }}
                            >
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d7928.488389751037!2d2.6034676789742135!3d6.49073261968272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwMjknNDIuNSJOIDLCsDM2JzMwLjciRQ!5e0!3m2!1sfr!2sbj!4v1756760709418!5m2!1sfr!2sbj"
                                    width="100%"
                                    height="300"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="Localisation du bureau SUZTECH"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
