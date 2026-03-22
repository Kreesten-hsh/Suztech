import React, { useRef, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ModalDialog from '@/Components/ModalDialog';
import Pagination from '@/Components/Pagination';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';

export default function Index({ auth, products }) {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const confirmDeleteButtonRef = useRef(null);

    const openConfirmModal = (productId) => {
        setProductToDelete(productId);
        setShowConfirmModal(true);
    };

    const closeConfirmModal = () => {
        if (isDeleting) {
            return;
        }

        setProductToDelete(null);
        setShowConfirmModal(false);
    };

    const handleDelete = () => {
        if (!productToDelete) {
            return;
        }

        setIsDeleting(true);

        router.delete(route('admin.products.destroy', productToDelete), {
            onFinish: () => {
                setIsDeleting(false);
                setProductToDelete(null);
                setShowConfirmModal(false);
            },
        });
    };

    const productsData = products?.data ?? [];

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Produits</h2>}
        >
            <Head title="Produits" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-4 flex justify-end">
                        <Link
                            href={route('admin.products.create')}
                            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white shadow-sm hover:bg-blue-700"
                        >
                            <FaPlus className="inline-block" />
                            Ajouter un produit
                        </Link>
                    </div>

                    <div className="hidden overflow-x-auto rounded-lg shadow-md md:block">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="w-40 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Images
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Nom
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Categorie
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Prix
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {productsData.length > 0 ? (
                                    productsData.map((product) => (
                                        <tr key={product.id}>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-2">
                                                    {product.images?.length > 0 ? (
                                                        product.images.map((image, index) => (
                                                            <img
                                                                key={image.id ?? index}
                                                                src={image.url}
                                                                alt={`Image ${index + 1} du produit ${product.name}`}
                                                                className="h-12 w-12 rounded-md object-cover"
                                                                loading="lazy"
                                                            />
                                                        ))
                                                    ) : (
                                                        <span className="text-sm text-gray-400">Aucune image</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="max-w-xs overflow-hidden px-6 py-4 text-ellipsis whitespace-nowrap">
                                                {product.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{product.category?.name ?? 'Sans categorie'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{product.price} FCFA</td>
                                            <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                                {/* FIX: Add explicit accessible labels to icon-only action controls. */}
                                                <Link
                                                    href={route('admin.products.edit', product.id)}
                                                    aria-label={`Modifier le produit ${product.name}`}
                                                    className="mr-4 text-indigo-600 hover:text-indigo-900"
                                                >
                                                    <FaEdit className="inline-block" />
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => openConfirmModal(product.id)}
                                                    aria-label={`Supprimer le produit ${product.name}`}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    <FaTrash className="inline-block" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                            Aucun produit trouve.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 md:hidden">
                        {productsData.length > 0 ? (
                            productsData.map((product) => (
                                <div key={product.id} className="border-b border-gray-200 py-4 last:border-b-0">
                                    <div className="mb-2 flex flex-col">
                                        <div className="mb-2 flex flex-wrap gap-2">
                                            {product.images?.length > 0 ? (
                                                product.images.map((image, index) => (
                                                    <img
                                                        key={image.id ?? index}
                                                        src={image.url}
                                                        alt={`Image ${index + 1} du produit ${product.name}`}
                                                        className="h-16 w-16 rounded-md object-cover shadow-sm"
                                                        loading="lazy"
                                                    />
                                                ))
                                            ) : (
                                                <span className="text-sm text-gray-400">Aucune image</span>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-lg font-bold">{product.name}</div>
                                            <div className="mt-1 text-sm text-gray-500">
                                                Categorie : {product.category?.name ?? 'Sans categorie'}
                                            </div>
                                            <div className="mt-1 text-sm text-gray-500">Prix : {product.price} FCFA</div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-end space-x-4 text-sm font-medium">
                                        <Link
                                            href={route('admin.products.edit', product.id)}
                                            className="flex items-center text-indigo-600 hover:text-indigo-900"
                                        >
                                            <FaEdit className="mr-1" /> Modifier
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() => openConfirmModal(product.id)}
                                            className="flex items-center text-red-600 hover:text-red-900"
                                        >
                                            <FaTrash className="mr-1" /> Supprimer
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-4 text-center text-gray-500">Aucun produit trouve.</div>
                        )}
                    </div>

                    {/* FIX: Render pagination controls for the backend paginator. */}
                    <Pagination paginator={products} className="mt-6" />
                </div>
            </div>

            <ModalDialog
                isOpen={showConfirmModal}
                onClose={closeConfirmModal}
                title="Confirmer la suppression"
                initialFocusRef={confirmDeleteButtonRef}
            >
                {/* FIX: Use an accessible confirmation dialog for destructive product deletion. */}
                <p className="mb-6 text-sm text-gray-600">
                    Etes-vous sur de vouloir supprimer ce produit ? Cette action est irreversible.
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
