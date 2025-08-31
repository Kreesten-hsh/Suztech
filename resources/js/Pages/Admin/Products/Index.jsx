import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ auth, products }) {

    const handleDelete = (productId) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
            router.delete(route('admin.products.destroy', productId));
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

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
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
                                                    <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900">
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
                                            <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900">
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
            </div>
        </AdminLayout>
    );
}