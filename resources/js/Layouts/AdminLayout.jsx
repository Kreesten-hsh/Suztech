import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import FlashMessage from '@/Components/FlashMessage';
import { FaCommentAlt, FaCube, FaTachometerAlt, FaTags } from 'react-icons/fa';

export default function AdminLayout({ user, header, children }) {
    const { url } = usePage();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const renderHeader = () => {
        if (typeof header === 'string') {
            return <h1 className="text-xl font-semibold text-gray-800">{header}</h1>;
        }

        return header;
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div
                className={`fixed inset-0 z-20 bg-gray-900 bg-opacity-50 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                onClick={() => setSidebarOpen(false)}
                aria-hidden="true"
            />

            <aside
                className={`fixed inset-y-0 left-0 top-0 z-30 w-64 flex-shrink-0 bg-gray-800 text-white transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:fixed md:translate-x-0`}
            >
                <div className="flex items-center justify-between border-b border-gray-700 p-6 text-2xl font-bold">
                    <span>Admin</span>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="text-white md:hidden"
                        aria-label="Fermer le menu d'administration"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <nav className="p-4" aria-label="Navigation d'administration">
                    <ul className="space-y-2">
                        <li>
                            <Link
                                href={route('admin.dashboard')}
                                className={`flex items-center space-x-2 rounded-lg px-4 py-2 transition duration-200 ease-in-out ${url.startsWith('/admin/dashboard') ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`}
                            >
                                <FaTachometerAlt className="h-5 w-5" aria-hidden="true" />
                                <span>Tableau de Bord</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route('admin.products.index')}
                                className={`flex items-center space-x-2 rounded-lg px-4 py-2 transition duration-200 ease-in-out ${url.startsWith('/admin/products') ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`}
                            >
                                <FaCube className="h-5 w-5" aria-hidden="true" />
                                <span>Produits</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route('admin.categories.index')}
                                className={`flex items-center space-x-2 rounded-lg px-4 py-2 transition duration-200 ease-in-out ${url.startsWith('/admin/categories') ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`}
                            >
                                <FaTags className="h-5 w-5" aria-hidden="true" />
                                <span>Categories</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route('admin.comments.index')}
                                className={`flex items-center space-x-2 rounded-lg px-4 py-2 transition duration-200 ease-in-out ${url.startsWith('/admin/comments') ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`}
                            >
                                <FaCommentAlt className="h-5 w-5" aria-hidden="true" />
                                <span>Commentaires</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="absolute bottom-4 left-0 w-full p-4">
                    <Link
                        method="post"
                        as="button"
                        href={route('logout')}
                        className="block w-full rounded-lg px-4 py-2 text-left transition duration-200 ease-in-out hover:bg-red-600"
                    >
                        Deconnexion
                    </Link>
                </div>
            </aside>

            <div className="flex flex-1 flex-col md:ml-64">
                <header className="bg-white shadow">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="text-gray-800 md:hidden"
                            aria-label="Ouvrir le menu d'administration"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                        {renderHeader()}
                    </div>
                </header>

                {/* FIX: Render backend flash messages in the admin shell. */}
                <FlashMessage />

                <main id="main-content" className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
