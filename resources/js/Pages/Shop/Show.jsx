import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { motion, AnimatePresence } from 'framer-motion';

export default function Show({ product, similarProducts }) {
    const defaultImage = "https://via.placeholder.com/600x400.png?text=Image+non+disponible";
    const [mainImage, setMainImage] = useState(product.images?.length > 0 ? `/storage/${product.images[0].path}` : defaultImage);

    const handleThumbnailClick = (imagePath) => {
        setMainImage(`/storage/${imagePath}`);
    };

    const getWhatsAppMessage = () => {
        const message = `Bonjour 👋, je suis intéressé par le produit "${product.name}" (Référence: #${product.id}). Pouvez-vous m’en dire plus ?`;
        return `https://wa.me/229987654321?text=${encodeURIComponent(message)}`;
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                staggerChildren: 0.1,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
            }
        },
    };

    return (
        <GuestLayout>
            <Head title={product.name} />

            <div className="bg-gray-50 py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Breadcrumb */}
                    <nav className="flex items-center space-x-2 text-md text-gray-500 mb-6" aria-label="Breadcrumb">
                        <Link href={route('home')} className="hover:text-gray-700">Accueil</Link>
                        <span>/</span>
                        <Link href={route('shop.index')} className="hover:text-gray-700">Boutique</Link>
                        <span>/</span>
                        <span className="font-medium text-gray-700">{product.name}</span>
                    </nav>

                    <motion.div 
                        className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        
                        {/* Galerie */}
                        <div>
                            <div className="relative w-full h-[450px] bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={mainImage} // Le secret pour la transition
                                        src={mainImage}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        alt={product.name}
                                        className="object-contain w-full h-full"
                                    />
                                </AnimatePresence>
                            </div>
                            {product.images?.length > 1 && (
                                <motion.div 
                                    className="flex space-x-3 mt-4 overflow-x-auto pb-2"
                                    initial="hidden"
                                    animate="visible"
                                    variants={sectionVariants}
                                >
                                    {product.images.map((img, index) => (
                                        <motion.img
                                            key={index}
                                            src={`/storage/${img.path}`}
                                            alt={product.name}
                                            className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${mainImage === `/storage/${img.path}` ? 'border-blue-600' : 'border-transparent'} transition`}
                                            onClick={() => handleThumbnailClick(img.path)}
                                            variants={cardVariants}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        />
                                    ))}
                                </motion.div>
                            )}
                        </div>

                        {/* Infos produit */}
                        <div className="flex flex-col justify-between">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{product.name}</h1>

                                <p className="text-4xl font-extrabold text-blue-700 mt-6 mb-4">
                                    {Number(product.price).toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} FCFA
                                </p>


                                <div className="text-gray-700 text-base leading-relaxed border-t border-b py-6">
                                    <h2 className="font-bold text-xl mb-2 text-gray-800">Description</h2>
                                    <p>{product.description}</p>
                                </div>
                            </div>

                            {/* Bouton CTA */}
                            <div className="mt-6">
                                <motion.a
                                    href={getWhatsAppMessage()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center w-full md:w-auto px-8 py-3 rounded-full text-lg font-bold text-white bg-green-500 hover:bg-green-600 shadow-lg"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    Commander sur WhatsApp
                                </motion.a>
                                <div className="mt-4 text-sm text-gray-500 flex items-center space-x-4">
                                    <span>🚚 Livraison rapide</span>
                                    <span>🔒 Paiement sécurisé</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Produits similaires */}
                    {similarProducts?.length > 0 && (
                        <motion.div 
                            className="mt-16"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={sectionVariants}
                        >
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">Vous aimerez aussi</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {similarProducts.map(similar => (
                                    <motion.div
                                        key={similar.id}
                                        variants={cardVariants}
                                        whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        <Link
                                            href={route('shop.show', similar.id)}
                                            className="group block bg-white rounded-xl shadow-md overflow-hidden"
                                        >
                                            <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                                                <img
                                                    src={similar.images?.[0] ? `/storage/${similar.images[0].path}` : defaultImage}
                                                    alt={similar.name}
                                                    className="object-cover w-full h-full group-hover:scale-110 transition-transform"
                                                />
                                            </div>
                                            <div className="p-4 text-center">
                                                <h3 className="text-lg font-semibold text-gray-900 truncate">{similar.name}</h3>
                                                <p className="text-sm text-gray-500">{similar.category?.name || 'Sans catégorie'}</p>
                                                <p className="text-xl font-bold text-blue-600 mt-2">{similar.price} FCFA</p>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}