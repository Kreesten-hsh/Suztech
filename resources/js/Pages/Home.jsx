import React, { useEffect, useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import SEO from '@/Components/SEO';
import { FaArrowRight, FaFileInvoice, FaLaptopCode, FaPalette, FaTools } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Home({ latestProducts }) {
    const { flash = {} } = usePage().props;

    const bannerImages = [
        'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2940&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop',
        '/images/banniere.jpg',
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFirstImageLoaded, setIsFirstImageLoaded] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
        }, 5000);

        return () => clearInterval(intervalId);
    }, [bannerImages.length]);

    const handleFirstImageLoad = () => {
        setIsFirstImageLoaded(true);
    };

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
            <SEO
                title="Accueil"
                description="SUZTECH accompagne les particuliers et les entreprises avec des services informatiques, de design et une boutique high-tech fiable et rapide."
                image="/images/logo.png"
            />
            <Head>
                <link rel="preload" href={bannerImages[0]} as="image" />
            </Head>

            {flash.success && (
                <div className="mx-auto mt-6 max-w-4xl rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                    {/* FIX: Surface the welcome flash after registration on the landing page. */}
                    {flash.success}
                </div>
            )}

            <section className="relative h-96 w-full overflow-hidden bg-gray-200 lg:h-[700px]">
                {bannerImages.map((image, index) => (
                    <motion.div
                        key={index}
                        className="absolute inset-0 h-full w-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                    >
                        {/* PERF: Defer non-initial hero slides while keeping the first banner image eager for LCP. */}
                        <img
                            src={image}
                            alt={`Slide promotionnel SUZTECH ${index + 1}`}
                            className="h-full w-full object-cover"
                            loading={index === 0 ? 'eager' : 'lazy'}
                            fetchPriority={index === 0 ? 'high' : undefined}
                            onLoad={index === 0 ? handleFirstImageLoad : undefined}
                            onError={(event) => {
                                event.target.onerror = null;
                                event.target.src = 'https://placehold.co/1920x1080/E0F7FA/000?text=Image+indisponible';
                            }}
                        />
                    </motion.div>
                ))}

                {isFirstImageLoaded && (
                    <div className="absolute inset-0 flex items-start justify-center bg-black bg-opacity-50 p-4 pt-16 lg:pt-40">
                        <div className="text-center text-white">
                            <motion.h1
                                className="mb-4 text-4xl font-extrabold sm:text-5xl lg:text-6xl"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                            >
                                Fiable & Rapide
                            </motion.h1>
                            <motion.p
                                className="mb-8 text-lg font-light sm:text-xl lg:text-2xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 1 }}
                            >
                                Technologie et Innovation, votre partenaire de confiance.
                            </motion.p>
                            <motion.div
                                className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1, duration: 0.5 }}
                            >
                                <Link
                                    href="/services"
                                    className="rounded-full bg-cyan-600 px-8 py-3 text-lg font-bold text-white transition-colors duration-300 hover:bg-cyan-700"
                                >
                                    Nos Services
                                </Link>
                                <Link
                                    href="/contact"
                                    className="rounded-full border-2 border-white bg-transparent px-8 py-3 text-lg font-bold text-white transition-colors duration-300 hover:bg-white hover:text-slate-900"
                                >
                                    Contactez-nous
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                )}
            </section>

            <motion.section
                className="bg-white px-6 py-16 lg:px-20"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8 }}
            >
                <div className="container mx-auto">
                    <h2 className="mb-12 text-center text-3xl font-bold sm:text-4xl">
                        Qui sommes-nous ?
                    </h2>
                    <p className="mx-auto max-w-4xl text-center text-base leading-relaxed text-gray-700 sm:text-lg">
                        Chez <span className="font-bold">SUZTECH</span>, nous transformons la technologie en solutions concretes pour les particuliers et les entreprises. Notre mission est de vous offrir des services informatiques et administratifs <span className="font-bold">fiables et rapides</span> qui simplifient votre quotidien.
                    </p>
                </div>
            </motion.section>

            <motion.section
                className="bg-gray-50 px-6 py-16 lg:px-20"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className="container mx-auto">
                    <h2 className="mb-12 text-center text-3xl font-bold sm:text-4xl">
                        Nos Prestations
                    </h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <motion.div variants={itemVariants} className="rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-xl">
                            <div className="mb-4 text-center">
                                <FaLaptopCode className="mx-auto text-6xl text-cyan-600" aria-hidden="true" />
                            </div>
                            <h3 className="mb-2 text-center text-xl font-semibold">Consultant en informatique</h3>
                            <p className="text-center text-gray-600">Beneficiez de l'expertise de nos consultants pour optimiser votre infrastructure et booster votre productivite.</p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-xl">
                            <div className="mb-4 text-center">
                                <FaTools className="mx-auto text-6xl text-cyan-600" aria-hidden="true" />
                            </div>
                            <h3 className="mb-2 text-center text-xl font-semibold">Reparation d'appareils</h3>
                            <p className="text-center text-gray-600">Nous redonnons vie a vos appareils electroniques, du diagnostic a la reparation rapide et efficace.</p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-xl">
                            <div className="mb-4 text-center">
                                <FaPalette className="mx-auto text-6xl text-cyan-600" aria-hidden="true" />
                            </div>
                            <h3 className="mb-2 text-center text-xl font-semibold">Creation de Logos</h3>
                            <p className="text-center text-gray-600">Votre image de marque est notre priorite. Nos designers creent des supports visuels uniques qui vous permettront de vous demarquer.</p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-xl">
                            <div className="mb-4 text-center">
                                <FaFileInvoice className="mx-auto text-6xl text-cyan-600" aria-hidden="true" />
                            </div>
                            <h3 className="mb-2 text-center text-xl font-semibold">Paiement de factures</h3>
                            <p className="text-center text-gray-600">Simplifiez-vous la vie avec notre service de paiement de factures SONEB / SBEE.</p>
                        </motion.div>
                    </div>
                    <motion.div variants={itemVariants} className="mt-12 text-center">
                        <Link href="/services" className="mx-auto mb-12 flex w-fit items-center justify-center gap-2 rounded-full bg-cyan-600 px-8 py-3 text-md font-bold text-white transition-colors duration-300 hover:bg-cyan-700">
                            Decouvrez tous nos services <FaArrowRight className="ml-2 mt-1" aria-hidden="true" />
                        </Link>
                    </motion.div>
                </div>
            </motion.section>

            <motion.section
                className="bg-gray-50 py-16"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8 }}
            >
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Nos derniers produits
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                            Decouvrez une selection de nos produits les plus recents, concus pour allier performance et innovation.
                        </p>
                    </div>

                    {latestProducts && latestProducts.length > 0 ? (
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {latestProducts.map((product) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.6 }}
                                    className="overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-300 hover:scale-105"
                                >
                                    {product.images && product.images.length > 0 && (
                                        <>
                                            {/* PERF: Lazy-load product cards below the fold to reduce initial mobile payload. */}
                                            <img
                                                src={product.images[0].url}
                                                alt={`Photo principale du produit ${product.name}`}
                                                className="h-48 w-full object-cover"
                                                loading="lazy"
                                            />
                                        </>
                                    )}
                                    <div className="p-6 text-center">
                                        <h3 className="truncate text-xl font-bold text-gray-900">{product.name}</h3>
                                        <p className="mt-2 text-sm text-gray-500">{product.category ? product.category.name : 'Pas de categorie'}</p>
                                        <p className="mt-3 text-2xl font-extrabold text-gray-900">
                                            {Number(product.price).toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} FCFA
                                        </p>
                                        <div className="mt-5">
                                            <Link
                                                href={route('shop.show', product.id)}
                                                className="inline-block w-full rounded-full border border-transparent bg-cyan-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-cyan-700"
                                            >
                                                Voir details
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center text-lg text-gray-500">
                            Aucun produit n&apos;est disponible pour le moment.
                        </div>
                    )}

                    <div className="mt-12 text-center">
                        <Link
                            href={route('shop.index')}
                            className="inline-flex items-center rounded-full border border-transparent bg-cyan-600 px-8 py-4 text-base font-medium text-white shadow-sm transition-colors hover:bg-cyan-700"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            Visiter la boutique <FaArrowRight className="ml-2" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </motion.section>

            <motion.section
                className="card mb-28 bg-cyan-600 py-12 text-center text-white"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
                    Pret a nous faire confiance ?
                </h2>
                <p className="mb-6 text-lg">
                    Contactez notre equipe des aujourd&apos;hui pour discuter de vos besoins. Nous sommes la pour vous accompagner dans votre reussite.
                </p>
                <Link
                    href="/contact"
                    className="rounded-full bg-white px-8 py-3 text-lg font-bold text-cyan-600 transition-colors duration-300 hover:bg-gray-200"
                >
                    Contactez-nous
                </Link>
            </motion.section>
        </GuestLayout>
    );
}
