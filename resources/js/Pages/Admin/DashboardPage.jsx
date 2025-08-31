import React from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Assurez-vous d'importer votre composant AdminLayout ici.
// Ce composant doit contenir votre barre de navigation et la structure de base de l'espace admin.
import AdminLayout from '@/Layouts/AdminLayout'; 

// Données fictives pour le tableau de bord
const mockStats = [
    { label: 'Visiteurs Totaux', value: '12 560', icon: '👤' },
    { label: 'Produits en Stock', value: '450', icon: '📦' },
    { label: 'Commandes en Attente', value: '35', icon: '🛒' },
    { label: 'Avis Clients', value: '1 234', icon: '⭐' },
];

const mockVisitorData = [
    { name: 'Jan', Visiteurs: 400 },
    { name: 'Fév', Visiteurs: 300 },
    { name: 'Mar', Visiteurs: 600 },
    { name: 'Avr', Visiteurs: 800 },
    { name: 'Mai', Visiteurs: 750 },
    { name: 'Juin', Visiteurs: 900 },
    { name: 'Juil', Visiteurs: 1200 },
    { name: 'Août', Visiteurs: 1100 },
    { name: 'Sep', Visiteurs: 1000 },
    { name: 'Oct', Visiteurs: 1500 },
    { name: 'Nov', Visiteurs: 1450 },
    { name: 'Déc', Visiteurs: 1700 },
];

// Variantes d'animation pour les cartes et les graphiques
const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const chartVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.2 } }
};

export default function Dashboard({ stats, admins, recentProducts }) {
    const realStats = [
        { label: 'Utilisateurs Totaux', value: stats.totalUsers, icon: '👤' },
        { label: 'Produits en Stock', value: stats.totalProducts, icon: '📦' },
        { label: 'Catégories', value: stats.totalCategories, icon: '🏷️' },
        { label: 'Admins', value: stats.totalAdmins, icon: '👑' },
    ];

    return (
        <AdminLayout>
            <Head title="Tableau de Bord" />
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Tableau de Bord</h1>
                <p className="text-lg text-gray-600 mb-8">Statistiques et aperçu de votre site.</p>

                {/* Section des cartes de statistiques */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {realStats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4"
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="text-4xl text-blue-600">{stat.icon}</div>
                            <div>
                                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{stat.label}</h2>
                                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Section des graphiques */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Graphique des visiteurs mensuels */}
                    <motion.div
                        className="bg-white rounded-xl shadow-lg p-6"
                        variants={chartVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Visiteurs par Mois</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={mockVisitorData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="Visiteurs" fill="#3b82f6" radius={[10, 10, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </motion.div>

                    {/* Ajoutez d'autres widgets ou graphiques ici */}
                    <motion.div
                        className="bg-white rounded-xl shadow-lg p-6"
                        variants={chartVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.4 }}
                    >
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Activité Récente</h2>
                        <ul className="space-y-4 text-gray-700">
                            <li><span className="font-semibold">Nouvelle commande :</span> Produit A (#1234) - Il y a 5 min</li>
                            <li><span className="font-semibold">Nouvel avis :</span> "Excellent produit !" - Il y a 10 min</li>
                            <li><span className="font-semibold">Nouveau client :</span> Jane Doe s'est inscrite - Il y a 30 min</li>
                            <li><span className="font-semibold">Stock faible :</span> Produit B (reste 2 unités) - Il y a 1h</li>
                        </ul>
                    </motion.div>
                </div>
            </motion.div>
        </AdminLayout>
    );
}
