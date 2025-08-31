import React from 'react';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { motion } from 'framer-motion';
import { 
    FaHeart, FaBolt, FaShieldAlt, FaHeadset, FaStar, 
    FaLaptopCode, FaPencilRuler, FaUserTie 
} from 'react-icons/fa';

export default function About() {
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
        hover: { scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }
    };

    const iconVariants = {
        visible: { rotate: 360, transition: { duration: 1, ease: "easeOut" } }
    };

    return (
        <GuestLayout>
            <Head title="À propos" />

            {/* Section Bannière */}
            <motion.section
                className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-28 sm:py-36 text-center shadow-xl"
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
            >
                <div className="container mx-auto px-4">
                    <motion.h1 
                        className="text-4xl sm:text-6xl font-extrabold mb-6 tracking-tight"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                    >
                        À propos de <span className="text-yellow-400">Suztech</span>
                    </motion.h1>
                    <motion.p 
                        className="text-lg sm:text-xl lg:text-2xl font-light max-w-3xl mx-auto opacity-90"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: 0.7 } }}
                    >
                        Votre partenaire de confiance en technologie et innovation depuis plusieurs années.
                    </motion.p>
                </div>
            </motion.section>

            {/* Section Notre Histoire */}
            <motion.section 
                className="py-20 px-6 lg:px-20 bg-white"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
            >
                <div className="container mx-auto max-w-7xl md:flex md:items-center md:space-x-12">
                    <div className="md:w-1/2">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-8">Notre Histoire</h2>
                        <p className="text-gray-700 lg:text-lg leading-relaxed">
                            Fondée avec la passion de la technologie et l'innovation, Suztech s'est rapidement imposée 
                            comme un acteur incontournable dans le domaine des solutions informatiques au Bénin. <br /><br />
                            Notre entreprise a débuté avec une vision simple : rendre la technologie accessible à tous. 
                            Nous combinons expertise technique et service client exceptionnel. <br /><br />
                            Aujourd'hui, nous sommes fiers d'accompagner nos clients dans leur transformation digitale 
                            avec des solutions sur mesure et un support de qualité.
                        </p>
                    </div>
                    <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1, transition: { type: "spring", stiffness: 100 } }}
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            <FaHeart className="text-9xl text-blue-500 drop-shadow-lg" />
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Section Notre Approche */}
            <motion.section 
                className="py-20 px-6 lg:px-20 bg-gray-50"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
            >
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-14">Notre Approche</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <motion.div 
                            className="flex flex-col items-center p-8 bg-white rounded-xl shadow-md"
                            whileHover="hover"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={cardVariants}
                        >
                            <FaBolt className="text-6xl text-blue-600" />
                            <h3 className="text-2xl font-semibold mt-4 mb-2">Fiable & Rapide</h3>
                            <p className="text-gray-600">Des solutions efficaces dans les délais impartis.</p>
                        </motion.div>
                        <motion.div 
                            className="flex flex-col items-center p-8 bg-white rounded-xl shadow-md"
                            whileHover="hover"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={cardVariants}
                        >
                            <FaShieldAlt className="text-6xl text-green-600" />
                            <h3 className="text-2xl font-semibold mt-4 mb-2">Sécurité</h3>
                            <p className="text-gray-600">Protection et confidentialité de vos données garanties.</p>
                        </motion.div>
                        <motion.div 
                            className="flex flex-col items-center p-8 bg-white rounded-xl shadow-md"
                            whileHover="hover"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={cardVariants}
                        >
                            <FaHeadset className="text-6xl text-purple-600" />
                            <h3 className="text-2xl font-semibold mt-4 mb-2">Service Client</h3>
                            <p className="text-gray-600">Support réactif et accompagnement personnalisé.</p>
                        </motion.div>
                        <motion.div 
                            className="flex flex-col items-center p-8 bg-white rounded-xl shadow-md"
                            whileHover="hover"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={cardVariants}
                        >
                            <FaStar className="text-6xl text-yellow-500" />
                            <h3 className="text-2xl font-semibold mt-4 mb-2">Qualité</h3>
                            <p className="text-gray-600">Standards élevés pour tous nos produits et services.</p>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Section Notre Équipe */}
            <motion.section 
                className="py-20 px-6 lg:px-20 bg-white"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
            >
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-14">Notre Équipe</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
                        <motion.div 
                            className="p-8 bg-gray-50 rounded-xl shadow-md"
                            whileHover="hover"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={cardVariants}
                        >
                            <FaLaptopCode className="text-6xl text-blue-600 mx-auto" />
                            <h4 className="text-2xl font-bold mt-4">Expert IT</h4>
                            <p className="text-lg font-semibold text-gray-700">Responsable Technique</p>
                            <p className="text-gray-600 mt-3">Spécialiste en infrastructure et sécurité informatique.</p>
                        </motion.div>
                        <motion.div 
                            className="p-8 bg-gray-50 rounded-xl shadow-md"
                            whileHover="hover"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={cardVariants}
                        >
                            <FaPencilRuler className="text-6xl text-purple-600 mx-auto" />
                            <h4 className="text-2xl font-bold mt-4">Designer</h4>
                            <p className="text-lg font-semibold text-gray-700">Responsable Créatif</p>
                            <p className="text-gray-600 mt-3">Expert en design graphique et identité visuelle.</p>
                        </motion.div>
                        <motion.div 
                            className="p-8 bg-gray-50 rounded-xl shadow-md"
                            whileHover="hover"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={cardVariants}
                        >
                            <FaUserTie className="text-6xl text-teal-600 mx-auto" />
                            <h4 className="text-2xl font-bold mt-4">Consultant</h4>
                            <p className="text-lg font-semibold text-gray-700">Responsable Commercial</p>
                            <p className="text-gray-600 mt-3">Spécialiste des services administratifs et conseil.</p>
                        </motion.div>
                    </div>
                </div>
            </motion.section>
        </GuestLayout>
    );
}
