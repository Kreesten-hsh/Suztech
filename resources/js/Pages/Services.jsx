import React from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { 
    FaLaptopCode, FaTools, FaPencilRuler, FaIdCard, FaFileInvoice, 
    FaNetworkWired, FaCog, FaPaintBrush, FaCreditCard, 
    FaUserTie, FaPassport, FaTv, FaFileSignature 
} from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Services(props) {
    // Variants pour les sections
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, staggerChildren: 0.1 },
        },
    };

    // Variants pour les cartes de service
    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: { 
            opacity: 1, 
            scale: 1, 
            y: 0,
            transition: { type: "spring", stiffness: 100 }
        },
    };

    return (
        <GuestLayout>
            <Head title="Services" />

            {/* Bannière de la page Services */}
            <motion.section 
                className="bg-gray-950 text-white py-24 sm:py-32 text-center"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl sm:text-5xl font-extrabold">Nos services et prestations</h1>
                    <p className="mt-10 text-lg sm:text-xl lg:text-2xl font-light">
                        <span className="font-bold">SUZTECH</span> vous accompagne avec des solutions complètes en informatique, design et services administratifs pour particuliers et entreprises.
                    </p>
                </div>
            </motion.section>

            {/* Section des solutions IT */}
            <motion.section 
                className="py-16 px-6 lg:px-20 bg-white" 
                id="solutions-it"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
            >
                <div className="container mx-auto">
                    <motion.h2 variants={cardVariants} className="text-3xl sm:text-4xl font-bold text-center mb-12 text-black">
                        Solutions IT pour professionnels et particuliers
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <motion.div variants={cardVariants} className="flex flex-col md:flex-row items-center p-6 bg-gray-50 rounded-lg shadow-md">
                            <FaNetworkWired className="text-5xl text-[#00c651]" />
                            <div className="md:ml-6">
                                <h3 className="text-xl font-bold text-black">Consultant en informatique</h3>
                                <p className="text-gray-700 mt-2 leading-relaxed">
                                    Transformez votre entreprise. Nous vous guidons avec expertise dans la planification et l'exécution de vos projets IT, de la conception à l'achèvement.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div variants={cardVariants} className="flex flex-col md:flex-row items-center p-6 bg-gray-50 rounded-lg shadow-md">
                            <FaLaptopCode className="text-5xl text-[#00c651]" />
                            <div className="md:ml-6">
                                <h3 className="text-xl font-bold text-black">Solution en IT</h3>
                                <p className="text-gray-700 mt-2 leading-relaxed">
                                    Nous concevons et déployons des solutions sur mesure : du développement d'applications métiers au déploiement de réseaux informatiques robustes et sécurisés.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div variants={cardVariants} className="flex flex-col md:flex-row items-center p-6 bg-gray-50 rounded-lg shadow-md">
                            <FaCog className="text-5xl text-[#00c651]" />
                            <div className="md:ml-6">
                                <h3 className="text-xl font-bold text-black">Suivi et entretien</h3>
                                <p className="text-gray-700 mt-2 leading-relaxed">
                                    Protégez vos investissements. Nos contrats de maintenance proactive garantissent la performance optimale et la sécurité de vos équipements informatiques.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div variants={cardVariants} className="flex flex-col md:flex-row items-center p-6 bg-gray-50 rounded-lg shadow-md">
                            <FaTools className="text-5xl text-[#00c651]" />
                            <div className="md:ml-6">
                                <h3 className="text-xl font-bold text-black">Réparation</h3>
                                <p className="text-gray-700 mt-2 leading-relaxed">
                                    Diagnostic et résolution de pannes. Nos techniciens certifiés interviennent sur toutes vos problématiques : lenteurs, écrans endommagés ou infections virales.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Section Services de Design */}
            <motion.section 
                className="py-16 px-6 lg:px-20 bg-gray-50"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
            >
                <div className="container mx-auto">
                    <motion.h2 variants={cardVariants} className="text-3xl sm:text-4xl font-bold text-center mb-12 text-black">
                        Services de Design
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        <motion.div variants={cardVariants} className="text-center p-6 bg-white rounded-lg shadow-md">
                            <FaPencilRuler className="text-5xl text-[#f8e71c] mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-black">Création de Logos</h3>
                            <p className="text-gray-700 mt-2 leading-relaxed">Conception d'une identité visuelle unique et mémorable qui reflète les valeurs de votre marque et se démarque de la concurrence.</p>
                        </motion.div>
                        <motion.div variants={cardVariants} className="text-center p-6 bg-white rounded-lg shadow-md">
                            <FaPaintBrush className="text-5xl text-[#f8e71c] mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-black">Flyers & supports</h3>
                            <p className="text-gray-700 mt-2 leading-relaxed">Création de supports de communication percutants pour votre marque : flyers, brochures, catalogues et affiches. Un design moderne qui capte l'attention.</p>
                        </motion.div>
                        <motion.div variants={cardVariants} className="text-center p-6 bg-white rounded-lg shadow-md">
                            <FaCreditCard className="text-5xl text-[#f8e71c] mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-black">Cartes de visites</h3>
                            <p className="text-gray-700 mt-2 leading-relaxed">Démarquez-vous dès le premier contact avec des cartes de visite professionnelles et élégantes, conçues pour laisser une impression durable.</p>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Section Prestations administratives */}
            <motion.section 
                className="py-16 px-6 lg:px-20 bg-white" 
                id="prestations-administratives"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
            >
                <div className="container mx-auto">
                    <motion.h2 variants={cardVariants} className="text-3xl sm:text-4xl font-bold text-center mb-12 text-black">
                        Prestations administratives
                    </motion.h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                        <motion.div variants={cardVariants} className="text-center p-6 bg-gray-50 rounded-lg shadow-md">
                            <FaIdCard className="text-5xl text-[#e70035] mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-black">IFU</h3>
                            <p className="text-gray-700 mt-2 leading-relaxed">Nous simplifions l'obtention de votre Numéro d'Identifiant Fiscal (IFU), une étape clé pour toutes vos démarches administratives et commerciales.</p>
                        </motion.div>
                        <motion.div variants={cardVariants} className="text-center p-6 bg-gray-50 rounded-lg shadow-md">
                            <FaFileSignature className="text-5xl text-[#e70035] mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-black">RCCM</h3>
                            <p className="text-gray-700 mt-2 leading-relaxed">Facilitez votre immatriculation au Registre du Commerce et du Crédit Mobilier (RCCM) pour lancer votre activité en toute légalité.</p>
                        </motion.div>
                        <motion.div variants={cardVariants} className="text-center p-6 bg-gray-50 rounded-lg shadow-md">
                            <FaUserTie className="text-5xl text-[#e70035] mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-black">C'EST MOI</h3>
                            <p className="text-gray-700 mt-2 leading-relaxed">Accompagnement dans les formalités d'obtention de votre identité numérique 'C'EST MOI', nécessaire pour les services gouvernementaux.</p>
                        </motion.div>
                        <motion.div variants={cardVariants} className="text-center p-6 bg-gray-50 rounded-lg shadow-md">
                            <FaPassport className="text-5xl text-[#e70035] mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-black">CIP</h3>
                            <p className="text-gray-700 mt-2 leading-relaxed">Assistance complète pour les démarches et l'obtention de votre Carte d'Identité Professionnelle (CIP).</p>
                        </motion.div>
                        <motion.div variants={cardVariants} className="text-center p-6 bg-gray-50 rounded-lg shadow-md">
                            <FaFileInvoice className="text-5xl text-[#e70035] mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-black">Acte sécurisé</h3>
                            <p className="text-gray-700 mt-2 leading-relaxed">Délivrance d'actes sécurisés pour l'authentification et la protection de vos documents administratifs et juridiques.</p>
                        </motion.div>
                        <motion.div variants={cardVariants} className="text-center p-6 bg-gray-50 rounded-lg shadow-md">
                            <FaTv className="text-5xl text-[#e70035] mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-black">Réabonnement Canal+</h3>
                            <p className="text-gray-700 mt-2 leading-relaxed">Simplifiez la gestion de vos abonnements. Nous nous occupons de vos réabonnements Canal+ rapidement et sans tracas.</p>
                        </motion.div>
                        <motion.div variants={cardVariants} className="text-center p-6 bg-gray-50 rounded-lg shadow-md">
                            <FaPassport className="text-5xl text-[#e70035] mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-black">Passeport</h3>
                            <p className="text-gray-700 mt-2 leading-relaxed">Accompagnement personnalisé pour le dépôt de dossier et le suivi des formalités d'obtention de votre passeport.</p>
                        </motion.div>
                        <motion.div variants={cardVariants} className="text-center p-6 bg-gray-50 rounded-lg shadow-md">
                            <FaFileInvoice className="text-5xl text-[#e70035] mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-black">Facture normalisée</h3>
                            <p className="text-gray-700 mt-2 leading-relaxed">Établissement de factures normalisées conformes aux réglementations en vigueur pour toutes vos transactions commerciales.</p>
                        </motion.div>
                        <motion.div variants={cardVariants} className="text-center p-6 bg-gray-50 rounded-lg shadow-md">
                            <FaFileInvoice className="text-5xl text-[#e70035] mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-black">Paiement factures</h3>
                            <p className="text-gray-700 mt-2 leading-relaxed">Service pratique de paiement de vos factures d'eau (SONEB) et d'électricité (SBEE) pour vous faire gagner du temps.</p>
                        </motion.div>
                    </div>
                </div>
            </motion.section>
        </GuestLayout>
    );
}