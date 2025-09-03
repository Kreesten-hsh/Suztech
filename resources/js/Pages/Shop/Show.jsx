import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

// Composant de la modale d'images (lightbox)
const ImageModal = ({ isOpen, onClose, images, initialIndex = 0 }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    if (!isOpen || !images || images.length === 0) return null;

    const currentImage = `/storage/${images[currentIndex].path}`;

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
            onClick={onClose}
        >
            <div className="relative w-full max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-white text-3xl z-10 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition"
                >
                    <FaTimes />
                </button>

                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentImage}
                        src={currentImage}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full object-contain rounded-lg"
                        alt={`Image ${currentIndex + 1}`}
                    />
                </AnimatePresence>

                {images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
                        >
                            <FaChevronLeft />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
                        >
                            <FaChevronRight />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default function Show({ product, similarProducts, comments }) {
    const defaultImage = "https://via.placeholder.com/600x400.png?text=Image+non+disponible";
    const [mainImage, setMainImage] = useState(product.images?.length > 0 ? `/storage/${product.images[0].path}` : defaultImage);
    const [showForm, setShowForm] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        comment: '',
        product_id: product.id,
    });

    const handleThumbnailClick = (imagePath) => {
        setMainImage(`/storage/${imagePath}`);
    };

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('comments.store'), {
            onSuccess: () => {
                reset('name', 'comment');
                setShowForm(false);
            }
        });
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
                    {/* Breadcrumb et section produit */}
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
                            <div 
                                className="relative w-full h-[450px] bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden cursor-pointer"
                                onClick={() => handleImageClick(product.images.findIndex(img => `/storage/${img.path}` === mainImage))}
                            >
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={mainImage}
                                        src={mainImage}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        alt={product.name}
                                        className="object-contain w-full h-full"
                                    />
                                </AnimatePresence>
                                {product.images?.length > 0 && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25 opacity-0 hover:opacity-100 transition-opacity duration-300 text-white font-bold text-center">
                                        <p>Voir toutes les photos</p>
                                    </div>
                                )}
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
                                    href="https://wa.me/22961012941"
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
                    {/* Sections supplémentaires... */}
                    <div className="mt-16 bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Avis Clients</h2>
                        {!showForm && (
                            <motion.button
                                onClick={() => setShowForm(true)}
                                className="w-50 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Ajouter un commentaire
                            </motion.button>
                        )}
                        <AnimatePresence>
                            {showForm && (
                                <motion.form
                                    onSubmit={handleSubmit}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-4 mb-8 overflow-hidden"
                                >
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        placeholder="Votre nom"
                                        required
                                    />
                                    {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                                    <textarea
                                        value={data.comment}
                                        onChange={e => setData('comment', e.target.value)}
                                        rows="3"
                                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        placeholder="Laissez un commentaire sur ce produit..."
                                        required
                                    ></textarea>
                                    {errors.comment && <div className="text-red-500 text-sm">{errors.comment}</div>}
                                    <div className="flex justify-end space-x-4">
                                        <button
                                            type="button"
                                            onClick={() => setShowForm(false)}
                                            className="px-6 py-3 text-base font-medium rounded-lg text-gray-600 hover:text-gray-900"
                                        >
                                            Annuler
                                        </button>
                                        <motion.button
                                            type="submit"
                                            disabled={processing}
                                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {processing ? 'Envoi en cours...' : 'Envoyer'}
                                        </motion.button>
                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {comments.length > 0 ? comments.map((comment) => (
                                <motion.div
                                    key={comment.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-gray-100 p-6 rounded-xl shadow-sm border border-gray-200"
                                >
                                    <div className="flex items-center space-x-4 mb-3">
                                        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
                                            {comment.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="text-lg font-bold text-gray-900">{comment.name}</div>
                                            <div className="text-xs text-gray-500">
                                                {new Date(comment.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed italic">{comment.comment}</p>
                                </motion.div>
                            )) : (
                                <p className="col-span-full text-center text-gray-500 italic">Soyez le premier à laisser un commentaire !</p>
                            )}
                        </div>
                    </div>
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
            <ImageModal 
                isOpen={showModal} 
                onClose={() => setShowModal(false)} 
                images={product.images} 
                initialIndex={selectedImageIndex} 
            />
        </GuestLayout>
    );
}