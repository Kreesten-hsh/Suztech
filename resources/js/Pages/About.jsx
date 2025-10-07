import React from 'react';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { motion } from 'framer-motion';
import { 
    FaBolt, FaShieldAlt, FaHeadset, FaStar, FaMoneyBillAlt // <-- Ajout de FaMoneyBillAlt
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

    return (
        <GuestLayout>
            <Head title="À propos" />

            {/* Section Bannière (inchangée) */}
            <motion.section
                className="relative text-white py-28 sm:py-36 text-center shadow-xl overflow-hidden"
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                style={{
                    backgroundImage: 'url("/images/imagescircuit2.webp")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className="absolute inset-0 bg-gray-900 bg-opacity-70"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <motion.h1 
                        className="text-4xl sm:text-6xl font-extrabold mb-6 tracking-tight"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                    >
                        À propos de <span className="text-[#f8e71c]">SUZTECH</span>
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

            {/* Section Notre Histoire (inchangée) */}
            <motion.section 
                className="py-20 px-6 lg:px-20 bg-white"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
            >
                <div className="container mx-auto max-w-7xl md:flex md:items-center md:space-x-12">
                    <div className="md:w-1/2">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900">Notre Histoire</h2>
                        <p className="text-gray-700 lg:text-lg leading-relaxed">
                            Fondée avec la passion de la technologie et l'innovation, <span className="font-bold">SUZTECH</span> s'est rapidement imposée 
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
                            className="w-full h-64 md:h-96 relative rounded-lg overflow-hidden shadow-lg"
                        >
                            <img 
                                src="/images/logo2.jpg"
                                alt="Représentation de l'innovation et de l'histoire de SUZTECH" 
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Section Notre Approche (inchangée) */}
            <motion.section 
                className="py-20 px-6 lg:px-20 bg-gray-50"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
            >
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-14 text-gray-900">Notre Approche</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <motion.div 
                            className="flex flex-col items-center p-8 bg-white rounded-xl shadow-md"
                            whileHover="hover"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={cardVariants}
                        >
                            <FaBolt className="text-6xl text-cyan-600" />
                            <h3 className="text-2xl font-semibold mt-4 mb-2 text-gray-800">Fiable & Rapide</h3>
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
                            <FaShieldAlt className="text-6xl text-indigo-600" />
                            <h3 className="text-2xl font-semibold mt-4 mb-2 text-gray-800">Sécurité</h3>
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
                            <FaHeadset className="text-6xl text-teal-600" />
                            <h3 className="text-2xl font-semibold mt-4 mb-2 text-gray-800">Service Client</h3>
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
                            <h3 className="text-2xl font-semibold mt-4 mb-2 text-gray-800">Qualité</h3>
                            <p className="text-gray-600">Standards élevés pour tous nos produits et services.</p>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Section Notre Équipe (MISE À JOUR) */}
            <motion.section 
                className="py-20 px-6 lg:px-20 bg-white"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
            >
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-14 text-gray-900">Notre Équipe</h2>
                    {/* Utilisation de grid pour mieux gérer l'affichage de trois éléments et au-delà */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-10 max-w-6xl mx-auto">
                        
                        {/* 1. Profil du CEO */}
                        <motion.div 
                            className="p-8 bg-gray-50 rounded-xl shadow-lg w-full max-w-sm"
                            whileHover="hover"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={cardVariants}
                        >
                            <img 
                                src="/images/CEO.jpg" 
                                alt="HOUNGBO Tobias" 
                                className="w-40 h-40 rounded-full mx-auto mb-4 object-cover border-4 border-gray-200"
                            />
                            <h4 className="text-2xl font-bold mt-4 text-gray-800">HOUNGBO Tobias</h4>
                            <p className="text-lg font-semibold text-gray-700">CEO de SUZTECH</p>
                            <p className="text-gray-600 mt-3">Tobias, notre CEO, est le moteur stratégique de SUZTECH. Fort de son expérience en leadership et en informatique, il supervise chaque aspect de l'entreprise. Sa vision est de transformer les défis technologiques en opportunités de croissance, en cultivant une culture d'innovation et de confiance.</p>
                        </motion.div>

                        {/* 2. Profil du Développeur Web */}
                        <motion.div 
                            className="p-8 bg-gray-50 rounded-xl shadow-lg w-full max-w-sm"
                            whileHover="hover"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={cardVariants}
                        >
                            <img 
                                src="/images/Dev.jpg"
                                alt="AGBOTON Kreesten" 
                                className="w-40 h-40 rounded-full mx-auto mb-4 object-cover border-4 border-gray-200"
                            />
                            <h4 className="text-2xl font-bold mt-4 text-gray-800">AGBOTON Kreesten</h4>
                            <p className="text-lg font-semibold text-gray-700">Développeur Web</p>
                            <p className="text-gray-600 mt-3">Kreesten est notre développeur web principal, un architecte du numérique passionné par la création de solutions sur mesure. Il excelle dans la conception de sites web modernes et performants. Son engagement pour la qualité et son attention aux détails sont essentiels pour offrir des produits numériques qui dépassent les attentes de nos clients.</p>
                        </motion.div>
                        
                        {/* 3. NOUVEAU PROFIL : Le Comptable */}
                        <motion.div 
                            className="p-8 bg-gray-50 rounded-xl shadow-lg w-full max-w-sm"
                            whileHover="hover"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={cardVariants}
                        >
                            <img 
                                src="/images/comptable.jpg"
                                alt="Evrard SOKENOU" 
                                className="w-40 h-40 rounded-full mx-auto mb-4 object-cover border-4 border-gray-200"
                            />
                            <h4 className="text-2xl font-bold mt-4 text-gray-800">Evrard SOKENOU</h4>
                            <p className="text-lg font-semibold text-gray-700">Comptable (Gestion Financière)</p>
                            <p className="text-gray-600 mt-3">Responsable de la <span className="font-bold">gestion financière, comptable, fiscale et sociale</span> de SUZTECH. Ce rôle est essentiel pour assurer la conformité légale et optimiser les ressources de l'entreprise.</p>
                        </motion.div>

                    </div>
                </div>
            </motion.section>
        </GuestLayout>
    );
}