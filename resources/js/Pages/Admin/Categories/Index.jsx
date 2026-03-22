import React, { useRef, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ModalDialog from '@/Components/ModalDialog';
import Pagination from '@/Components/Pagination';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';

export default function Index({ auth, categories }) {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const confirmDeleteButtonRef = useRef(null);

    const categoriesData = categories?.data ?? [];

    const openConfirmModal = (categoryId) => {
        setCategoryToDelete(categoryId);
        setShowConfirmModal(true);
    };

    const closeConfirmModal = () => {
        if (isDeleting) {
            return;
        }

        setCategoryToDelete(null);
        setShowConfirmModal(false);
    };

    const handleDelete = () => {
        if (!categoryToDelete) {
            return;
        }

        setIsDeleting(true);

        router.delete(route('admin.categories.destroy', categoryToDelete), {
            onFinish: () => {
                setIsDeleting(false);
                setCategoryToDelete(null);
                setShowConfirmModal(false);
            },
        });
    };

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Categories</h2>}
        >
            <Head title="Categories" />

            <div className="py-6 sm:py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-800">Gestion des Categories</h1>
                        <Link
                            href={route('admin.categories.create')}
                            className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white shadow-md transition-colors hover:bg-blue-700"
                        >
                            <FaPlus className="h-4 w-4" />
                            <span className="hidden sm:inline">Ajouter</span>
                        </Link>
                    </div>

                    <div className="space-y-4 sm:hidden">
                        {categoriesData.length > 0 ? (
                            categoriesData.map((category) => (
                                <div key={category.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <p className="text-lg font-semibold text-gray-800">{category.name}</p>
                                        <div className="flex items-center space-x-2">
                                            {/* FIX: Add accessible labels to icon-only category actions. */}
                                            <Link
                                                href={route('admin.categories.edit', category.id)}
                                                aria-label={`Modifier la categorie ${category.name}`}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                <FaEdit className="h-5 w-5" />
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => openConfirmModal(category.id)}
                                                aria-label={`Supprimer la categorie ${category.name}`}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <FaTrash className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">Aucune categorie trouvee.</p>
                        )}
                    </div>

                    <div className="hidden overflow-hidden bg-white shadow-sm sm:block sm:rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Nom
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {categoriesData.length > 0 ? (
                                        categoriesData.map((category) => (
                                            <tr key={category.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">{category.name}</td>
                                                <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                                    <Link
                                                        href={route('admin.categories.edit', category.id)}
                                                        className="mr-4 text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        Modifier
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        onClick={() => openConfirmModal(category.id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Supprimer
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="2" className="px-6 py-4 text-center text-gray-500">
                                                Aucune categorie trouvee.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* FIX: Render pagination controls for category listings. */}
                    <Pagination paginator={categories} className="mt-6" />
                </div>
            </div>

            <ModalDialog
                isOpen={showConfirmModal}
                onClose={closeConfirmModal}
                title="Confirmer la suppression"
                initialFocusRef={confirmDeleteButtonRef}
            >
                {/* FIX: Use an accessible dialog for destructive category deletion. */}
                <p className="mb-6 text-sm text-gray-600">
                    Etes-vous sur de vouloir supprimer cette categorie ? Cette action est irreversible.
                </p>
                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={closeConfirmModal}
                        className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300"
                    >
                        Annuler
                    </button>
                    <button
                        ref={confirmDeleteButtonRef}
                        type="button"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isDeleting ? 'Suppression...' : 'Supprimer'}
                    </button>
                </div>
            </ModalDialog>
        </AdminLayout>
    );
}
