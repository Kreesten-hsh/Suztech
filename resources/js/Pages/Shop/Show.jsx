import React, { useEffect, useRef, useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import SEO from '@/Components/SEO';
import { AnimatePresence, motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { WHATSAPP_URL } from '@/constants/business';

const getFocusableElements = (container) => {
    if (!container) {
        return [];
    }

    return Array.from(
        container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
    ).filter((element) => !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true');
};

const ImageModal = ({ isOpen, onClose, images, initialIndex = 0, productName }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const dialogRef = useRef(null);
    const closeButtonRef = useRef(null);

    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        setCurrentIndex(initialIndex);
    }, [initialIndex, isOpen]);

    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        closeButtonRef.current?.focus();

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
                return;
            }

            if (event.key === 'ArrowRight' && images.length > 1) {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
                return;
            }

            if (event.key === 'ArrowLeft' && images.length > 1) {
                setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
                return;
            }

            if (event.key !== 'Tab') {
                return;
            }

            const focusableElements = getFocusableElements(dialogRef.current);

            if (focusableElements.length === 0) {
                event.preventDefault();
                return;
            }

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [images.length, isOpen, onClose]);

    if (!isOpen || !images || images.length === 0) {
        return null;
    }

    const currentImage = images[currentIndex]?.url;

    const nextImage = (event) => {
        event.stopPropagation();
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = (event) => {
        event.stopPropagation();
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    aria-hidden="true"
                >
                    <div className="absolute inset-0" onClick={onClose} />
                    <div
                        ref={dialogRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="product-gallery-title"
                        className="relative z-10 w-full max-w-4xl max-h-full"
                    >
                        {/* FIX: Provide an accessible lightbox with focus trapping and keyboard support. */}
                        <h2 id="product-gallery-title" className="sr-only">
                            Galerie du produit {productName}
                        </h2>
                        <button
                            ref={closeButtonRef}
                            type="button"
                            onClick={onClose}
                            aria-label="Fermer la galerie"
                            className="absolute right-4 top-4 z-10 rounded-full bg-gray-800 p-2 text-3xl text-white transition hover:bg-gray-700"
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
                                className="w-full rounded-lg object-contain"
                                alt={`Image ${currentIndex + 1} du produit ${productName}`}
                            />
                        </AnimatePresence>

                        {images.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={prevImage}
                                    aria-label="Voir l'image precedente"
                                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-gray-800 p-2 text-4xl text-white transition hover:bg-gray-700"
                                >
                                    <FaChevronLeft />
                                </button>
                                <button
                                    type="button"
                                    onClick={nextImage}
                                    aria-label="Voir l'image suivante"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-gray-800 p-2 text-4xl text-white transition hover:bg-gray-700"
                                >
                                    <FaChevronRight />
                                </button>
                            </>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default function Show({ product, similarProducts, comments }) {
    const defaultImage = 'https://via.placeholder.com/600x400.png?text=Image+non+disponible';
    const [mainImage, setMainImage] = useState(product.images?.[0]?.url ?? defaultImage);
    const [showForm, setShowForm] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        comment: '',
        website: '',
        product_id: product.id,
    });

    const handleThumbnailClick = (imageUrl) => {
        setMainImage(imageUrl);
    };

    const handleImageClick = (index) => {
        if (!product.images || product.images.length === 0) {
            return;
        }

        setSelectedImageIndex(index >= 0 ? index : 0);
        setShowModal(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        post(route('comments.store'), {
            onSuccess: () => {
                reset('name', 'comment', 'website');
                setShowForm(false);
            },
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
                type: 'spring',
                stiffness: 100,
            },
        },
    };

    return (
        <GuestLayout>
            {/* FIX: Add full SEO metadata for the product detail page. */}
            <SEO
                title={product.name}
                description={product.description ? product.description.slice(0, 160) : `Decouvrez ${product.name} chez SUZTECH.`}
                image={product.images?.[0]?.url}
                type="product"
            />

            <div className="bg-gray-50 py-12 sm:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <nav className="mb-6 flex items-center space-x-2 text-md text-gray-500" aria-label="Fil d'Ariane">
                        <Link href={route('home')} className="hover:text-gray-700">
                            Accueil
                        </Link>
                        <span>/</span>
                        <Link href={route('shop.index')} className="hover:text-gray-700">
                            Boutique
                        </Link>
                        <span>/</span>
                        <span className="font-medium text-gray-700">{product.name}</span>
                    </nav>

                    <motion.div
                        className="grid grid-cols-1 gap-10 rounded-2xl bg-white p-6 shadow-lg sm:p-8 lg:grid-cols-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div>
                            <button
                                type="button"
                                className="relative flex h-[450px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-gray-100"
                                onClick={() => handleImageClick(product.images.findIndex((img) => img.url === mainImage))}
                                aria-label={`Ouvrir la galerie photo du produit ${product.name}`}
                            >
                                <AnimatePresence mode="wait">
                                    {/* PERF: Keep the main product image eager because it contributes directly to the detail page LCP. */}
                                    <motion.img
                                        key={mainImage}
                                        src={mainImage}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        alt={`Photo principale du produit ${product.name}`}
                                        className="h-full w-full object-contain"
                                        loading="eager"
                                        fetchPriority="high"
                                    />
                                </AnimatePresence>
                                {product.images?.length > 0 && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25 text-center font-bold text-white opacity-0 transition-opacity duration-300 hover:opacity-100">
                                        <p>Voir toutes les photos</p>
                                    </div>
                                )}
                            </button>

                            {product.images?.length > 1 && (
                                <motion.div
                                    className="mt-4 flex space-x-3 overflow-x-auto pb-2"
                                    initial="hidden"
                                    animate="visible"
                                    variants={sectionVariants}
                                >
                                    {product.images.map((image, index) => (
                                        <motion.button
                                            key={image.id ?? index}
                                            type="button"
                                            className={`rounded-lg border-2 transition ${
                                                mainImage === image.url ? 'border-blue-600' : 'border-transparent'
                                            }`}
                                            onClick={() => handleThumbnailClick(image.url)}
                                            aria-label={`Afficher la miniature ${index + 1} du produit ${product.name}`}
                                            variants={cardVariants}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <img
                                                src={image.url}
                                                alt={`Miniature ${index + 1} du produit ${product.name}`}
                                                className="h-20 w-20 rounded-lg object-cover"
                                                loading="lazy"
                                            />
                                        </motion.button>
                                    ))}
                                </motion.div>
                            )}
                        </div>

                        <div className="flex flex-col justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{product.name}</h1>
                                <p className="mb-4 mt-6 text-4xl font-extrabold text-blue-700">
                                    {Number(product.price).toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} FCFA
                                </p>
                                <div className="border-y py-6 text-base leading-relaxed text-gray-700">
                                    <h2 className="mb-2 text-xl font-bold text-gray-800">Description</h2>
                                    <p>{product.description}</p>
                                </div>
                            </div>

                            <div className="mt-6">
                                <motion.a
                                    href={WHATSAPP_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex w-full items-center justify-center rounded-full bg-green-500 px-8 py-3 text-lg font-bold text-white shadow-lg hover:bg-green-600 md:w-auto"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                >
                                    Commander sur WhatsApp
                                </motion.a>
                                <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                                    <span>Livraison rapide</span>
                                    <span>Paiement securise</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="mt-16 rounded-2xl bg-white p-6 shadow-lg sm:p-8">
                        <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">Avis Clients</h2>
                        {!showForm && (
                            <motion.button
                                type="button"
                                onClick={() => setShowForm(true)}
                                className="inline-flex w-50 items-center justify-center rounded-lg border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
                                    className="mb-8 space-y-4 overflow-hidden"
                                >
                                    {/* FIX: Keep the honeypot hidden for humans while remaining visible to basic bots. */}
                                    <input
                                        type="text"
                                        value={data.website}
                                        onChange={(event) => setData('website', event.target.value)}
                                        className="absolute -left-[9999px] top-auto h-px w-px opacity-0"
                                        tabIndex="-1"
                                        autoComplete="off"
                                        aria-hidden="true"
                                    />

                                    {/* FIX: Associate labels, inputs and error messages for the public review form. */}
                                    <div>
                                        <label htmlFor="comment-name" className="mb-1 block text-sm font-medium text-gray-700">
                                            Votre nom
                                        </label>
                                        <input
                                            id="comment-name"
                                            type="text"
                                            value={data.name}
                                            onChange={(event) => setData('name', event.target.value)}
                                            className="w-full rounded-lg border border-gray-300 p-4 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            placeholder="Votre nom"
                                            required
                                            aria-required="true"
                                            aria-invalid={Boolean(errors.name)}
                                            aria-describedby={errors.name ? 'comment-name-error' : undefined}
                                        />
                                        {errors.name && (
                                            <p id="comment-name-error" className="mt-1 text-sm text-red-500" role="alert">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    {/* FIX: Associate labels, textarea and validation errors for comment content. */}
                                    <div>
                                        <label htmlFor="comment-body" className="mb-1 block text-sm font-medium text-gray-700">
                                            Votre commentaire
                                        </label>
                                        <textarea
                                            id="comment-body"
                                            value={data.comment}
                                            onChange={(event) => setData('comment', event.target.value)}
                                            rows="3"
                                            className="w-full rounded-lg border border-gray-300 p-4 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            placeholder="Laissez un commentaire sur ce produit..."
                                            required
                                            aria-required="true"
                                            aria-invalid={Boolean(errors.comment)}
                                            aria-describedby={errors.comment ? 'comment-body-error' : undefined}
                                        />
                                        {errors.comment && (
                                            <p id="comment-body-error" className="mt-1 text-sm text-red-500" role="alert">
                                                {errors.comment}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex justify-end space-x-4">
                                        <button
                                            type="button"
                                            onClick={() => setShowForm(false)}
                                            className="rounded-lg px-6 py-3 text-base font-medium text-gray-600 hover:text-gray-900"
                                        >
                                            Annuler
                                        </button>
                                        <motion.button
                                            type="submit"
                                            disabled={processing}
                                            className="inline-flex items-center justify-center rounded-lg border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {processing ? 'Envoi en cours...' : 'Envoyer'}
                                        </motion.button>
                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>

                        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {comments.length > 0 ? (
                                comments.map((comment) => (
                                    <motion.div
                                        key={comment.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="rounded-xl border border-gray-200 bg-gray-100 p-6 shadow-sm"
                                    >
                                        <div className="mb-3 flex items-center space-x-4">
                                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-xl font-bold text-white">
                                                {comment.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-lg font-bold text-gray-900">{comment.name}</div>
                                                <div className="text-xs text-gray-500">
                                                    {new Date(comment.created_at).toLocaleDateString('fr-FR', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric',
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="leading-relaxed text-gray-700 italic">{comment.comment}</p>
                                    </motion.div>
                                ))
                            ) : (
                                <p className="col-span-full text-center italic text-gray-500">
                                    Soyez le premier a laisser un commentaire !
                                </p>
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
                            <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
                                Vous aimerez aussi
                            </h2>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {similarProducts.map((similar) => (
                                    <motion.div
                                        key={similar.id}
                                        variants={cardVariants}
                                        whileHover={{
                                            scale: 1.05,
                                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                                        }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                    >
                                        <Link
                                            href={route('shop.show', similar.id)}
                                            className="group block overflow-hidden rounded-xl bg-white shadow-md"
                                        >
                                            <div className="flex h-48 w-full items-center justify-center overflow-hidden bg-gray-100">
                                                <img
                                                    src={similar.images?.[0]?.url ?? defaultImage}
                                                    alt={`Photo du produit ${similar.name}`}
                                                    className="h-full w-full object-cover transition-transform group-hover:scale-110"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className="p-4 text-center">
                                                <h3 className="truncate text-lg font-semibold text-gray-900">{similar.name}</h3>
                                                <p className="mt-2 text-xl font-bold text-blue-600">{similar.price} FCFA</p>
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
                productName={product.name}
            />
        </GuestLayout>
    );
}
