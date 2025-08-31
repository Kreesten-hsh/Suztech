import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ auth, categories }) {

    const handleDelete = (categoryId) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
            router.delete(route('admin.categories.destroy', categoryId));
        }
    };

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Catégories</h2>}
        >
            <Head title="Catégories" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-end mb-4">
                        <Link href={route('admin.categories.create')} className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700">
                            Ajouter une catégorie
                        </Link>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
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
                                            <button onClick={() => handleDelete(category.id)} className="text-red-600 hover:text-red-900">
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
        </AdminLayout>
    );
}