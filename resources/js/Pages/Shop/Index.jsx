import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import GuestLayout from '@/Layouts/GuestLayout';
import Pagination from '@/Components/Pagination';
import SEO from '@/Components/SEO';
import { FaWhatsapp } from 'react-icons/fa';
import { WHATSAPP_URL } from '@/constants/business';

export default function Index({ products, categories }) {
    const { url } = usePage();
    const currentCategory = new URLSearchParams(url.split('?')[1] ?? '').get('category');

    const getCategoryLink = (categoryId) => route('shop.index', { category: categoryId });
    const formatPrice = (price) => Number(price).toLocaleString('fr-FR');

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
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    };

    return (
        <GuestLayout>
            {/* FIX: Add reusable SEO metadata for the shop landing page. */}
            <SEO
                title="Boutique"
                description="Decouvrez les ordinateurs, smartphones et accessoires disponibles chez SUZTECH avec un accompagnement rapide sur WhatsApp."
                type="website"
            />

            <motion.section
                className="bg-gradient-to-r from-blue-800 to-indigo-900 py-28 text-center text-white shadow-xl sm:py-36"
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
            >
                <div className="container mx-auto px-4">
                    <motion.h1
                        className="mb-6 text-4xl font-extrabold tracking-tight sm:text-6xl"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                    >
                        Vente de PC & Appareils Electroniques
                    </motion.h1>
                    <motion.p
                        className="mx-auto max-w-3xl text-lg font-light opacity-90 sm:text-xl lg:text-2xl"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: 0.7 } }}
                    >
                        Decouvrez notre selection d ordinateurs, smartphones et accessoires de qualite.
                    </motion.p>
                </div>
            </motion.section>

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <motion.div
                    className="mb-12 flex flex-wrap justify-center gap-3"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={containerVariants}
                >
                    <motion.div variants={itemVariants}>
                        <Link
                            href={route('shop.index')}
                            aria-current={!currentCategory ? 'page' : undefined}
                            className={`flex items-center rounded-full px-5 py-2 text-md font-medium shadow-sm transition-all ${
                                !currentCategory
                                    ? 'bg-green-600 text-white shadow-md'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            Toutes les categories
                        </Link>
                    </motion.div>
                    {categories?.map((category) => (
                        <motion.div key={category.id} variants={itemVariants}>
                            <Link
                                href={getCategoryLink(category.id)}
                                aria-current={String(currentCategory) === String(category.id) ? 'page' : undefined}
                                className={`flex items-center rounded-full px-5 py-2 text-md font-medium shadow-sm transition-all ${
                                    String(currentCategory) === String(category.id)
                                        ? 'bg-green-600 text-white shadow-md'
                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                {category.name}
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {products?.data?.length > 0 ? (
                    <>
                        <motion.div
                            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={containerVariants}
                        >
                            {products.data.map((product) => (
                                <motion.div
                                    key={product.id}
                                    className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-200 hover:shadow-xl"
                                    variants={itemVariants}
                                    whileHover={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                >
                                    <div className="relative overflow-hidden">
                                        {/* PERF: Lazy-load catalog thumbnails because they sit below the hero section on entry. */}
                                        <img
                                            src={product.images?.[0]?.url ?? 'https://via.placeholder.com/400x300.png?text=Image+non+disponible'}
                                            alt={product.images?.[0]?.url ? `Photo du produit ${product.name}` : `Illustration indisponible pour ${product.name}`}
                                            className="h-48 w-full object-cover duration-100"
                                            loading="lazy"
                                        />
                                    </div>

                                    <div className="p-4 text-center">
                                        <h2 className="truncate text-base font-bold text-gray-900 sm:text-lg">
                                            {product.name}
                                        </h2>
                                        <p className="mt-2 text-xl font-extrabold text-green-600">
                                            {formatPrice(product.price)} FCFA
                                        </p>

                                        <div className="mt-4 flex flex-col gap-2">
                                            <Link
                                                href={route('shop.show', product.id)}
                                                className="block w-full rounded-full bg-green-600 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-green-700"
                                            >
                                                Voir details
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* FIX: Render the paginator shared by the backend for shop listings. */}
                        <Pagination paginator={products} className="mt-10" />
                    </>
                ) : (
                    <div className="py-12 text-center text-lg text-gray-500">
                        Aucun produit disponible pour le moment.
                    </div>
                )}

                <motion.div
                    className="mt-20 rounded-3xl bg-gradient-to-r from-green-500 to-green-600 px-6 py-12 text-center shadow-xl"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="mb-4 text-2xl font-extrabold text-white sm:text-3xl">
                        Une question ou un produit vous interesse ?
                    </h2>
                    <p className="mx-auto mb-6 max-w-2xl text-lg text-white">
                        Discutez avec notre equipe directement sur WhatsApp pour plus d informations ou pour passer une commande rapidement.
                    </p>
                    <motion.a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-lg font-semibold text-green-600 shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                        <FaWhatsapp className="text-2xl text-green-500" />
                        Discuter sur WhatsApp
                    </motion.a>
                </motion.div>
            </div>
        </GuestLayout>
    );
}
