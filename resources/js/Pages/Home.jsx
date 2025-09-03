import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { FaLaptopCode, FaTools, FaPalette, FaFileInvoice, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Home({ latestProducts }) {
    // Array of image URLs for the banner slideshow
    const bannerImages = [
        'https://images.unsplash.com/photo-1516321497-2b73f8a0e8d3?q=80&w=2940&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2940&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1579782522770-985e5109b8d0?q=80&w=2940&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1504384308051-57425110d73a?q=80&w=2940&auto=format&fit=crop',
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Use effect to handle automatic image change
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % bannerImages.length);
        }, 5000); // Change image every 5 seconds

        // Cleanup the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [bannerImages.length]);

    // Variants for animations
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.2,
                duration: 0.6,
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <GuestLayout>
            <Head title="Accueil" />

            {/* Main banner with fluid image slideshow */}
            <section className="relative w-full h-96 lg:h-[700px] overflow-hidden">
                {bannerImages.map((image, index) => (
                    <motion.div
                        key={index}
                        className="absolute inset-0 w-full h-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    >
                        <img
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://placehold.co/1920x1080/E0F7FA/000?text=Image+indisponible";
                            }}
                        />
                    </motion.div>
                ))}
                
                {/* Overlay with text and buttons */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 pt-16 lg:pt-36">
                    <div className="text-center text-white">
                        <motion.h1 
                            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            Fiable & Rapide
                        </motion.h1>
                        <motion.p
                            className="text-lg sm:text-xl lg:text-2xl font-light mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 1 }}
                        >
                            Technologie et Innovation, votre partenaire de confiance.
                        </motion.p>
                        <motion.div
                            className="flex flex-col sm:flex-row justify-center items-center gap-4"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1, duration: 0.5 }}
                        >
                            <Link 
                                href="/services" 
                                className="bg-cyan-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-cyan-700 transition-colors duration-300"
                            >
                                Nos Services
                            </Link>
                            <Link 
                                href="/contact" 
                                className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-white hover:text-slate-900 transition-colors duration-300"
                            >
                                Contactez-nous
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>
            
            {/* Présentation de l'entreprise */}
            <motion.section
                className="py-16 px-6 lg:px-20 bg-white"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8 }}
            >
                <div className="container mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
                        Qui sommes-nous ?
                    </h2>
                    <p className="text-base sm:text-lg text-gray-700 text-center max-w-4xl mx-auto leading-relaxed">
                        Chez <span className="font-bold">SUZTECH</span>, nous transformons la technologie en solutions concrètes pour les particuliers et les entreprises. Notre mission est de vous offrir des services informatiques et administratifs <span className="font-bold">fiables et rapides</span> qui simplifient votre quotidien.
                    </p>
                </div>
            </motion.section>
        

            {/* Section "Nos Prestations" */}
            <motion.section
                className="py-16 px-6 lg:px-20 bg-gray-50"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className="container mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
                        Nos Prestations
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Carte de service 1 : Consultant en informatique */}
                        <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <div className="text-center mb-4">
                                <FaLaptopCode className="text-6xl text-cyan-600 mx-auto" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-center">Consultant en informatique</h3>
                            <p className="text-gray-600 text-center">Bénéficiez de l'expertise de nos consultants pour optimiser votre infrastructure et booster votre productivité.</p>
                        </motion.div>

                        {/* Carte de service 2 : Réparation d'appareils */}
                        <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <div className="text-center mb-4">
                                <FaTools className="text-6xl text-cyan-600 mx-auto" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-center">Réparation d'appareils</h3>
                            <p className="text-gray-600 text-center">Nous redonnons vie à vos appareils électroniques, du diagnostic à la réparation rapide et efficace.</p>
                        </motion.div>

                        {/* Carte de service 3 : Création de Logos */}
                        <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <div className="text-center mb-4">
                                <FaPalette className="text-6xl text-cyan-600 mx-auto" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-center">Création de Logos</h3>
                            <p className="text-gray-600 text-center">Votre image de marque est notre priorité. Nos designers créent des supports visuels uniques qui vous permettront de vous démarquer.</p>
                        </motion.div>

                        {/* Carte de service 4 : Paiement de factures */}
                        <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <div className="text-center mb-4">
                                <FaFileInvoice className="text-6xl text-cyan-600 mx-auto" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-center">Paiement de factures</h3>
                            <p className="text-gray-600 text-center">Simplifiez-vous la vie avec notre service de paiement de factures SONEB / SBEE.</p>
                        </motion.div>
                    </div>
                    <motion.div
                        variants={itemVariants}
                        className="text-center mt-12"
                    >
                        <Link href="/services" className="bg-cyan-600 mb-12 text-white font-bold py-3 px-8 rounded-full text-md hover:bg-cyan-700 transition-colors duration-300 flex items-center justify-center gap-2 mx-auto w-fit">
                            Découvrez tous nos services <FaArrowRight className="ml-2 mt-1"/>
                        </Link>
                    </motion.div>
                </div>
            </motion.section>


            {/* Nouvelle section pour les produits */}
            <motion.section
                className="py-16 bg-gray-50"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8 }}
            >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                            Nos derniers produits
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            Découvrez une sélection de nos produits les plus récents, conçus pour allier performance et innovation.
                        </p>
                    </div>

                    {/* Grille des produits */}
                    {latestProducts && latestProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {latestProducts.map(product => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.6 }}
                                    className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
                                >
                                    {product.images && product.images.length > 0 && (
                                        <img 
                                            src={`/storage/${product.images[0].path}`} 
                                            alt={product.name} 
                                            className="w-full h-48 object-cover" 
                                        />
                                    )}
                                    <div className="p-6 text-center">
                                        <h3 className="text-xl font-bold text-gray-900 truncate">{product.name}</h3>
                                        <p className="mt-2 text-sm text-gray-500">{product.category ? product.category.name : 'Pas de catégorie'}</p>
                                        <p className="mt-3 text-2xl font-extrabold text-gray-900">{Number(product.price).toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} FCFA</p>
                                        <div className="mt-5">
                                            <Link 
                                                href={route('shop.show', product.id)}
                                                className="inline-block w-full px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 transition-colors"
                                            >
                                                Voir détails
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 py-12 text-lg">
                            Aucun produit n'est disponible pour le moment.
                        </div>
                    )}

                    {/* Bouton pour visiter la boutique */}
                    <div className="text-center mt-12">
                        <Link 
                            href={route('shop.index')} 
                            className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 transition-colors transform hover:scale-105"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            Visiter la boutique <FaArrowRight className="ml-2"/>
                        </Link>
                    </div>
                </div>
            </motion.section>


            {/* Section Appel à l'action */}
            <motion.section
                className="bg-cyan-600 text-white card py-12 text-center mb-44"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                    Prêt à nous faire confiance ?
                </h2>
                <p className="text-lg mb-6">
                    Contactez notre équipe dès aujourd'hui pour discuter de vos besoins. Nous sommes là pour vous accompagner dans votre réussite.
                </p>
                <Link
                    href="/contact"
                    className="bg-white text-cyan-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition-colors duration-300"
                >
                    Contactez-nous
                </Link>
            </motion.section>
        </GuestLayout>
    );
}