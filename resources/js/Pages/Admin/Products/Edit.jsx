import React, { useEffect, useRef, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ModalDialog from '@/Components/ModalDialog';
import { FaTrash } from 'react-icons/fa';

export default function Edit({ auth, product, categories }) {
    const { data, setData, post, processing, errors } = useForm({
        name: product.name,
        category_id: product.category_id,
        description: product.description ?? '',
        price: product.price,
        images: null,
        images_to_delete: [],
        _method: 'put',
    });

    const [existingImages, setExistingImages] = useState(product.images ?? []);
    const [newImagePreviews, setNewImagePreviews] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [imageToDelete, setImageToDelete] = useState(null);
    const confirmDeleteButtonRef = useRef(null);
    const previewUrlsRef = useRef([]);

    useEffect(() => {
        return () => {
            previewUrlsRef.current.forEach((preview) => URL.revokeObjectURL(preview));
        };
    }, []);

    const submit = (event) => {
        event.preventDefault();
        post(route('admin.products.update', product.id), {
            forceFormData: true,
        });
    };

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files ?? []);

        previewUrlsRef.current.forEach((preview) => URL.revokeObjectURL(preview));

        const previews = files.map((file) => URL.createObjectURL(file));
        previewUrlsRef.current = previews;

        setData('images', files);
        setNewImagePreviews(previews);
    };

    const openConfirmModal = (imageId) => {
        setImageToDelete(imageId);
        setShowConfirmModal(true);
    };

    const closeConfirmModal = () => {
        setImageToDelete(null);
        setShowConfirmModal(false);
    };

    const handleDeleteImage = () => {
        if (!imageToDelete) {
            return;
        }

        setData('images_to_delete', [...data.images_to_delete, imageToDelete]);
        setExistingImages(existingImages.filter((image) => image.id !== imageToDelete));
        closeConfirmModal();
    };

    return (
        <AdminLayout user={auth.user} header="Modifier un produit">
            <Head title="Modifier un produit" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="border-b border-gray-200 bg-white p-6">
                            <form onSubmit={submit} className="space-y-6">
                                {/* FIX: Associate label, field and error state for the product name input. */}
                                <div>
                                    <label htmlFor="edit-product-name" className="block text-sm font-medium text-gray-700">
                                        Nom du produit
                                    </label>
                                    <input
                                        type="text"
                                        id="edit-product-name"
                                        name="name"
                                        value={data.name}
                                        onChange={(event) => setData('name', event.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        aria-required="true"
                                        aria-invalid={Boolean(errors.name)}
                                        aria-describedby={errors.name ? 'edit-product-name-error' : undefined}
                                    />
                                    {errors.name && (
                                        <p id="edit-product-name-error" className="mt-1 text-sm text-red-500" role="alert">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* FIX: Associate label, field and error state for the category selector. */}
                                <div>
                                    <label htmlFor="edit-product-category" className="block text-sm font-medium text-gray-700">
                                        Categorie
                                    </label>
                                    <select
                                        id="edit-product-category"
                                        name="category_id"
                                        value={data.category_id}
                                        onChange={(event) => setData('category_id', event.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        aria-required="true"
                                        aria-invalid={Boolean(errors.category_id)}
                                        aria-describedby={errors.category_id ? 'edit-product-category-error' : undefined}
                                    >
                                        {categories && categories.length > 0 ? (
                                            categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>Aucune categorie disponible</option>
                                        )}
                                    </select>
                                    {errors.category_id && (
                                        <p id="edit-product-category-error" className="mt-1 text-sm text-red-500" role="alert">
                                            {errors.category_id}
                                        </p>
                                    )}
                                </div>

                                {/* FIX: Associate label, textarea and error state for the description field. */}
                                <div>
                                    <label htmlFor="edit-product-description" className="block text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <textarea
                                        id="edit-product-description"
                                        name="description"
                                        value={data.description}
                                        onChange={(event) => setData('description', event.target.value)}
                                        className="mt-1 block h-60 w-full rounded-md border-gray-300 shadow-sm"
                                        aria-invalid={Boolean(errors.description)}
                                        aria-describedby={errors.description ? 'edit-product-description-error' : undefined}
                                    />
                                    {errors.description && (
                                        <p id="edit-product-description-error" className="mt-1 text-sm text-red-500" role="alert">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                {/* FIX: Associate label, field and error state for the product price. */}
                                <div>
                                    <label htmlFor="edit-product-price" className="block text-sm font-medium text-gray-700">
                                        Prix
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        id="edit-product-price"
                                        name="price"
                                        value={data.price}
                                        onChange={(event) => setData('price', event.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        aria-required="true"
                                        aria-invalid={Boolean(errors.price)}
                                        aria-describedby={errors.price ? 'edit-product-price-error' : undefined}
                                    />
                                    {errors.price && (
                                        <p id="edit-product-price-error" className="mt-1 text-sm text-red-500" role="alert">
                                            {errors.price}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <h3 className="block text-sm font-medium text-gray-700">Images actuelles</h3>
                                    <div className="my-2 flex flex-wrap gap-2">
                                        {existingImages && existingImages.length > 0 ? (
                                            existingImages.map((image, index) => (
                                                <div key={image.id} className="group relative">
                                                    <img
                                                        src={image.url}
                                                        alt={`Image existante ${index + 1} du produit ${product.name}`}
                                                        className="h-24 w-24 rounded-md object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => openConfirmModal(image.id)}
                                                        aria-label={`Supprimer l'image existante ${index + 1} du produit ${product.name}`}
                                                        className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                                    >
                                                        <FaTrash size={12} />
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-gray-500">Aucune image disponible</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="edit-product-images" className="block text-sm font-medium text-gray-700">
                                        Ajouter de nouvelles images
                                    </label>
                                    <div className="my-2 flex flex-wrap gap-2">
                                        {newImagePreviews.map((preview, index) => (
                                            <img
                                                key={preview}
                                                src={preview}
                                                alt={`Nouvelle image ${index + 1} du produit ${product.name}`}
                                                className="h-24 w-24 rounded-md object-cover"
                                            />
                                        ))}
                                    </div>
                                    <input
                                        type="file"
                                        id="edit-product-images"
                                        name="images[]"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="mt-1 block w-full"
                                        aria-invalid={Boolean(errors.images)}
                                        aria-describedby={errors.images ? 'edit-product-images-error' : undefined}
                                    />
                                    {errors.images && (
                                        <p id="edit-product-images-error" className="mt-1 text-sm text-red-500" role="alert">
                                            {errors.images}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="rounded-md bg-blue-600 px-4 py-2 text-white shadow-sm hover:bg-blue-700"
                                    disabled={processing}
                                >
                                    {processing ? 'Mise a jour en cours...' : 'Modifier'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <ModalDialog
                isOpen={showConfirmModal}
                onClose={closeConfirmModal}
                title="Confirmer la suppression"
                initialFocusRef={confirmDeleteButtonRef}
            >
                {/* FIX: Use an accessible dialog for destructive image removal confirmation. */}
                <p className="mb-6 text-sm text-gray-600">
                    Etes-vous sur de vouloir supprimer cette image ? Cette action est irreversible.
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
                        onClick={handleDeleteImage}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                    >
                        Supprimer
                    </button>
                </div>
            </ModalDialog>
        </AdminLayout>
    );
}
