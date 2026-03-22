import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    FaBoxOpen,
    FaChartLine,
    FaComments,
    FaTags,
    FaUserShield,
    FaUsers,
} from 'react-icons/fa';
import AdminLayout from '@/Layouts/AdminLayout';

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const panelVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.2 } },
};

export default function DashboardPage({ stats, recentProducts, recentComments }) {
    const realStats = [
        {
            label: 'Utilisateurs Totaux',
            value: stats.totalUsers,
            icon: <FaUsers className="text-4xl text-blue-600" aria-hidden="true" />,
        },
        {
            label: 'Produits en Stock',
            value: stats.totalProducts,
            icon: <FaBoxOpen className="text-4xl text-blue-600" aria-hidden="true" />,
        },
        {
            label: 'Categories',
            value: stats.totalCategories,
            icon: <FaTags className="text-4xl text-blue-600" aria-hidden="true" />,
        },
        {
            label: 'Admins',
            value: stats.totalAdmins,
            icon: <FaUserShield className="text-4xl text-blue-600" aria-hidden="true" />,
        },
        {
            label: 'Total Commentaires',
            value: stats.totalComments,
            icon: <FaComments className="text-4xl text-blue-600" aria-hidden="true" />,
        },
    ];

    return (
        <AdminLayout header="Tableau de Bord">
            <Head title="Tableau de Bord" />

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="mb-2 text-4xl font-extrabold text-gray-900">Tableau de Bord</h1>
                <p className="mb-8 text-lg text-gray-600">Statistiques et apercu de votre site.</p>

                <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
                    {realStats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            className="flex items-center space-x-4 rounded-xl bg-white p-6 shadow-lg"
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: index * 0.1 }}
                        >
                            <div>{stat.icon}</div>
                            <div>
                                <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                                    {stat.label}
                                </h2>
                                <p className="mt-1 text-3xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
                    <motion.div
                        className="rounded-xl bg-white p-6 shadow-lg"
                        variants={panelVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h2 className="mb-4 text-xl font-bold text-gray-800">Visites du site</h2>
                        {/* PERF: Remove the heavy chart dependency until real visit metrics are available. */}
                        <div className="flex h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 text-center">
                            <div className="mb-4 rounded-full bg-blue-100 p-4 text-blue-600">
                                <FaChartLine className="text-3xl" aria-hidden="true" />
                            </div>
                            <p className="text-lg font-semibold text-gray-900">
                                Statistiques de visites disponibles prochainement
                            </p>
                            <p className="mt-2 max-w-sm text-sm text-gray-500">
                                Les vraies donnees analytics seront affichees ici des qu&apos;une source de mesure sera branchee.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="rounded-xl bg-white p-6 shadow-lg"
                        variants={panelVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.4 }}
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-800">Derniers produits</h2>
                            <Link href={route('admin.products.index')} className="text-sm text-blue-600 hover:underline">
                                Voir tout &rarr;
                            </Link>
                        </div>
                        <ul className="space-y-4 text-gray-700">
                            {recentProducts.length > 0 ? (
                                recentProducts.map((product) => (
                                    <li
                                        key={product.id}
                                        className="border-b border-gray-200 pb-2 last:border-b-0 last:pb-0"
                                    >
                                        <div className="font-semibold text-gray-900">{product.name}</div>
                                        <div className="truncate text-sm text-gray-500">
                                            {product.category?.name ?? 'Sans categorie'}
                                        </div>
                                        <div className="mt-1 text-xs text-gray-400">
                                            {Number(product.price).toLocaleString('fr-FR')} FCFA
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <p className="text-sm italic text-gray-500">Aucun produit recent.</p>
                            )}
                        </ul>
                    </motion.div>

                    <motion.div
                        className="rounded-xl bg-white p-6 shadow-lg"
                        variants={panelVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.6 }}
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-800">Derniers commentaires</h2>
                            <Link href={route('admin.comments.index')} className="text-sm text-blue-600 hover:underline">
                                Voir tout &rarr;
                            </Link>
                        </div>
                        <ul className="space-y-4 text-gray-700">
                            {recentComments.length > 0 ? (
                                recentComments.map((comment) => (
                                    <li
                                        key={comment.id}
                                        className="border-b border-gray-200 pb-2 last:border-b-0 last:pb-0"
                                    >
                                        <div className="font-semibold text-gray-900">{comment.name}</div>
                                        <div className="truncate text-sm text-gray-500">{comment.comment}</div>
                                        <div className="mt-1 text-xs text-gray-400">
                                            sur {comment.product?.name ?? 'Produit supprime'}
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <p className="text-sm italic text-gray-500">Aucun commentaire recent.</p>
                            )}
                        </ul>
                    </motion.div>
                </div>
            </motion.div>
        </AdminLayout>
    );
}
