import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import GuestLayout from '@/Layouts/GuestLayout';
import { FaWhatsapp } from 'react-icons/fa';

export default function Index({ products, categories }) {
    const { url } = usePage();
    const currentCategory = new URLSearchParams(url.split('?')[1])?.get('category');

    const getCategoryLink = (categoryId) => route('shop.index', { category: categoryId });
    const formatPrice = (price) => parseInt(price).toLocaleString("fr-FR");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <GuestLayout>
            <Head title="Boutique" />

            {/* Bannière */}
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
                        Vente de PC & Appareils Électroniques
                    </motion.h1>
                    <motion.p 
                        className="text-lg sm:text-xl lg:text-2xl font-light max-w-3xl mx-auto opacity-90"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: 0.7 } }}
                    >
                        Découvrez notre sélection d’ordinateurs, smartphones et accessoires de qualité.
                    </motion.p>
                </div>
            </motion.section>

            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* Filtres catégories */}
                <motion.div
                    className="flex flex-wrap justify-center gap-3 mb-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={containerVariants}
                >
                    <motion.div variants={itemVariants}>
                        <Link
                            href={route('shop.index')}
                            className={`px-5 py-2 text-md font-medium rounded-full transition-all flex items-center shadow-sm ${
                                !currentCategory
                                    ? 'bg-green-600 text-white shadow-md'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            Toutes les catégories
                        </Link>
                    </motion.div>
                    {categories?.map((category) => (
                        <motion.div key={category.id} variants={itemVariants}>
                            <Link
                                href={getCategoryLink(category.id)}
                                className={`px-5 py-2 text-md font-medium rounded-full transition-all flex items-center shadow-sm ${
                                    currentCategory == category.id
                                        ? 'bg-green-600 text-white shadow-md'
                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                {category.name}
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Grille des produits */}
                {products?.data?.length > 0 ? (
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={containerVariants}
                    >
                        {products.data.map((product) => (
                            <motion.div
                                key={product.id}
                                className="bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-200"
                                variants={itemVariants}
                                whileHover={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                {/* Image produit */}
                                <div className="relative overflow-hidden">
                                    {product.images?.length > 0 ? (
                                        <img
                                            src={product.images[0].url}
                                            alt={product.name}
                                            className="w-full h-48 object-cover duration-100"
                                        />
                                    ) : (
                                        <img
                                            src="https://via.placeholder.com/400x300.png?text=Image+non+disponible"
                                            alt="Image non disponible"
                                            className="w-full h-48 object-cover"
                                        />
                                    )}
                                </div>

                                {/* Infos produit */}
                                <div className="p-4 text-center">
                                    <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">
                                        {product.name}
                                    </h3>
                                    <p className="text-xl font-extrabold text-green-600 mt-2">
                                        {formatPrice(product.price)} FCFA
                                    </p>

                                    <div className="mt-4 flex flex-col gap-2">
                                        <Link
                                            href={route('shop.show', product.id)}
                                            className="block w-full bg-green-600 text-white py-2 px-4 rounded-full text-sm font-medium shadow hover:bg-green-700 transition"
                                        >
                                            Voir détails
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center text-gray-500 py-12 text-lg">
                        Aucun produit disponible pour le moment.
                    </div>
                )}

                {/* Section WhatsApp CTA */}
                <motion.div
                    className="text-center py-12 px-6 mt-20 bg-gradient-to-r from-green-500 to-green-600 rounded-3xl shadow-xl"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                        Une question ou un produit vous intéresse ?
                    </h2>
                    <p className="text-lg text-white mb-6 max-w-2xl mx-auto">
                        Discutez avec notre équipe directement sur WhatsApp pour plus d’informations ou pour passer une commande rapidement.
                    </p>
                    <motion.a
                        href="https://wa.me/22961012941"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-3 text-lg font-semibold rounded-full shadow-lg text-green-600 bg-white"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        <FaWhatsapp className="text-2xl text-green-500" />
                        Discuter sur WhatsApp
                    </motion.a>
                </motion.div>
            </div>
        </GuestLayout>
    );
}
