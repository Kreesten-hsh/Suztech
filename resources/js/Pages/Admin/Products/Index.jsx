import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

// Composant de la modale de confirmation
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm mx-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">{title}</h3>
                <p className="text-sm text-gray-600 mb-6 text-center">{message}</p>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function Index({ auth, products }) {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const openConfirmModal = (productId) => {
        setProductToDelete(productId);
        setShowConfirmModal(true);
    };

    const closeConfirmModal = () => {
        setProductToDelete(null);
        setShowConfirmModal(false);
    };

    const handleDelete = () => {
        if (productToDelete) {
            router.delete(route('admin.products.destroy', productToDelete), {
                onSuccess: () => {
                    closeConfirmModal();
                },
                onError: () => {
                    // Gérer les erreurs de suppression ici
                    closeConfirmModal();
                },
            });
        }
    };

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Produits</h2>}
        >
            <Head title="Produits" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-end mb-4">
                        <Link href={route('admin.products.create')} className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700">
                            Ajouter un produit
                        </Link>
                    </div>

                    {/* Vue pour les grands écrans (le tableau) */}
                    <div className="hidden md:block">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {products && products.data && products.data.length > 0 ? (
                                    products.data.map(product => (
                                        <tr key={product.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {product.images && product.images.length > 0 && (
                                                    <img src={`/storage/${product.images[0].path}`} alt={product.name} className="h-12 w-12 object-cover rounded-full" />
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{product.category.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{product.price} FCFA</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link href={route('admin.products.edit', product.id)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                                    Modifier
                                                </Link>
                                                <button onClick={() => openConfirmModal(product.id)} className="text-red-600 hover:text-red-900">
                                                    Supprimer
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                            Aucun produit trouvé.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Vue pour les petits écrans (les cartes) */}
                    <div className="md:hidden p-4">
                        {products && products.data && products.data.length > 0 ? (
                            products.data.map(product => (
                                <div key={product.id} className="border-b border-gray-200 last:border-b-0 py-4">
                                    <div className="flex items-start mb-2">
                                        {product.images && product.images.length > 0 && (
                                            <img src={`/storage/${product.images[0].path}`} alt={product.name} className="h-16 w-16 object-cover rounded-md mr-4" />
                                        )}
                                        <div className="flex-1">
                                            <div className="font-bold text-lg">{product.name}</div>
                                            <div className="text-sm text-gray-500 mt-1">Catégorie : {product.category.name}</div>
                                            <div className="text-sm text-gray-500 mt-1">Prix : {product.price}€</div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-end text-sm font-medium">
                                        <Link href={route('admin.products.edit', product.id)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                            Modifier
                                        </Link>
                                        <button onClick={() => openConfirmModal(product.id)} className="text-red-600 hover:text-red-900">
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500 py-4">
                                Aucun produit trouvé.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ConfirmationModal
                isOpen={showConfirmModal}
                onClose={closeConfirmModal}
                onConfirm={handleDelete}
                title="Confirmer la suppression"
                message="Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible."
            />
        </AdminLayout>
    );
}
