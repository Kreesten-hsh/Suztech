import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

export default function Index({ auth, categories }) {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    const openConfirmModal = (categoryId) => {
        setCategoryToDelete(categoryId);
        setShowConfirmModal(true);
    };

    const closeConfirmModal = () => {
        setCategoryToDelete(null);
        setShowConfirmModal(false);
    };

    const handleDelete = () => {
        router.delete(route('admin.categories.destroy', categoryToDelete), {
            onSuccess: () => {
                closeConfirmModal();
            },
            onError: () => {
                // Gérer les erreurs de suppression ici
                closeConfirmModal();
            },
        });
    };

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Catégories</h2>}
        >
            <Head title="Catégories" />

            <div className="py-6 sm:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Gestion des Catégories</h1>
                        <Link href={route('admin.categories.create')} className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors">
                            <FaPlus className="w-4 h-4" />
                            <span className="hidden sm:inline">Ajouter</span>
                        </Link>
                    </div>

                    {/* Vue Mobile : cartes empilées */}
                    <div className="sm:hidden space-y-4">
                        {categories.data.length > 0 ? (
                            categories.data.map(category => (
                                <div key={category.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <p className="font-semibold text-gray-800 text-lg">{category.name}</p>
                                        <div className="flex items-center space-x-2">
                                            <Link href={route('admin.categories.edit', category.id)} className="text-blue-600 hover:text-blue-800">
                                                <FaEdit className="w-5 h-5" />
                                            </Link>
                                            <button onClick={() => openConfirmModal(category.id)} className="text-red-600 hover:text-red-800">
                                                <FaTrash className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">Aucune catégorie trouvée.</p>
                        )}
                    </div>

                    {/* Vue Bureau : tableau */}
                    <div className="hidden sm:block bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {categories.data.map(category => (
                                        <tr key={category.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{category.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link href={route('admin.categories.edit', category.id)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                                    Modifier
                                                </Link>
                                                <button onClick={() => openConfirmModal(category.id)} className="text-red-600 hover:text-red-900">
                                                    Supprimer
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modale de confirmation de suppression */}
            {showConfirmModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm mx-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Confirmer la suppression</h3>
                        <p className="text-sm text-gray-600 mb-6">
                            Êtes-vous sûr de vouloir supprimer cette catégorie ? Cette action est irréversible.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={closeConfirmModal}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
