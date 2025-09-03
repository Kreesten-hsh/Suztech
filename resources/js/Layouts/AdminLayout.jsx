import React, { useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import { FaTachometerAlt, FaCube, FaTags, FaCommentAlt } from 'react-icons/fa';

export default function AdminLayout({ user, header, children }) {
    const { url } = usePage();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Superposition pour l'arrière-plan du menu mobile */}
            <div
                className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-20 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setSidebarOpen(false)}
            ></div>

            {/* Barre latérale (Sidebar) */}
            <aside
                className={`fixed top-0 inset-y-0 left-0 w-64 bg-gray-800 text-white flex-shrink-0 transform transition-transform duration-300 ease-in-out z-30 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:fixed md:translate-x-0`}
            >
                <div className="flex justify-between items-center p-6 text-2xl font-bold border-b border-gray-700">
                    <span>Admin</span>
                    {/* Bouton de fermeture de la sidebar (visible sur mobile) */}
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="text-white md:hidden focus:outline-none"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <nav className="p-4">
                    <ul className="space-y-2">
                        {/* Lien vers le Tableau de Bord */}
                        <li>
                            <Link href={route('admin.dashboard')}
                                className={`flex items-center space-x-2 py-2 px-4 rounded-lg transition duration-200 ease-in-out ${url.startsWith('/admin/dashboard') ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`}
                            >
                                <FaTachometerAlt className="w-5 h-5" />
                                <span>Tableau de Bord</span>
                            </Link>
                        </li>
                        {/* Lien vers la gestion des produits */}
                        <li>
                            <Link href={route('admin.products.index')}
                                className={`flex items-center space-x-2 py-2 px-4 rounded-lg transition duration-200 ease-in-out ${url.startsWith('/admin/products') ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`}
                            >
                                <FaCube className="w-5 h-5" />
                                <span>Produits</span>
                            </Link>
                        </li>
                        {/* Lien vers la gestion des catégories */}
                        <li>
                            <Link href={route('admin.categories.index')}
                                className={`flex items-center space-x-2 py-2 px-4 rounded-lg transition duration-200 ease-in-out ${url.startsWith('/admin/categories') ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`}
                            >
                                <FaTags className="w-5 h-5" />
                                <span>Catégories</span>
                            </Link>
                        </li>
                        {/* Nouveau lien vers la gestion des commentaires */}
                        <li>
                            <Link href={route('admin.comments.index')}
                                className={`flex items-center space-x-2 py-2 px-4 rounded-lg transition duration-200 ease-in-out ${url.startsWith('/admin/comments') ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`}
                            >
                                <FaCommentAlt className="w-5 h-5" />
                                <span>Commentaires</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="absolute bottom-4 left-0 w-full p-4">
                    <Link method="post" as="button" href={route('logout')} className="w-full text-left block py-2 px-4 rounded-lg transition duration-200 ease-in-out hover:bg-red-600">
                        Déconnexion
                    </Link>
                </div>
            </aside>

            {/* Contenu principal */}
            <div className="flex-1 flex flex-col md:ml-64">
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        {/* Bouton du menu hamburger (visible sur mobile) */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="md:hidden text-gray-800 focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                        <h2 className="text-xl font-semibold text-gray-800">
                            {header}
                        </h2>
                    </div>
                </header>
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}