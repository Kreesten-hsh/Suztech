import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { FaTrash } from 'react-icons/fa';

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

export default function Edit({ auth, product, categories }) {
    const { data, setData, post, processing, errors } = useForm({
        name: product.name,
        category_id: product.category_id,
        description: product.description,
        price: product.price,
        images: null,
        images_to_delete: [],
        _method: 'put',
    });

    const [existingImages, setExistingImages] = useState(product.images);
    const [newImagePreviews, setNewImagePreviews] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [imageToDelete, setImageToDelete] = useState(null);

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.products.update', product.id), {
            forceFormData: true,
        });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setData('images', files);
        
        const previews = files.map(file => URL.createObjectURL(file));
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
        if (imageToDelete) {
            setData('images_to_delete', [...data.images_to_delete, imageToDelete]);
            setExistingImages(existingImages.filter(img => img.id !== imageToDelete));
            closeConfirmModal();
        }
    };

    return (
        <AdminLayout
            user={auth.user}
            header="Modifier un produit"
        >
            <Head title="Modifier un produit" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={submit}>
                                {/* Champ Nom */}
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom du produit</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                    {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                                </div>
                                {/* Champ Catégorie */}
                                <div className="mb-4">
                                    <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">Catégorie</label>
                                    <select
                                        id="category_id"
                                        name="category_id"
                                        value={data.category_id}
                                        onChange={(e) => setData('category_id', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    >
                                    {categories && categories.length > 0 ? categories.map(category => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    )) : (
                                        <option disabled>Aucune catégorie disponible</option>
                                    )}
                                    </select>
                                    {errors.category_id && <div className="text-red-500 text-sm mt-1">{errors.category_id}</div>}
                                </div>
                                {/* Champ Description */}
                                <div className="mb-4">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="mt-1 block h-60 w-full rounded-md border-gray-300 shadow-sm"
                                    ></textarea>
                                    {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                                </div>
                                {/* Champ Prix */}
                                <div className="mb-4">
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Prix</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        id="price"
                                        name="price"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                    {errors.price && <div className="text-red-500 text-sm mt-1">{errors.price}</div>}
                                </div>
                                {/* Images existantes */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Images actuelles</label>
                                    <div className="flex flex-wrap gap-2 my-2">
                                        {existingImages && existingImages.length > 0 ? existingImages.map(image => (
                                            <div key={image.id} className="relative group">
                                                <img src={image.url} alt="" className="h-24 w-24 object-cover rounded-md" />
                                                <button
                                                    type="button"
                                                    onClick={() => openConfirmModal(image.id)}
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <FaTrash size={12} />
                                                </button>
                                            </div>
                                        )) : (
                                            <p className="text-gray-500 text-sm">Aucune image disponible</p>
                                        )}
                                    </div>
                                </div>
                                {/* Ajouter de nouvelles images */}
                                <div className="mb-4">
                                    <label htmlFor="images" className="block text-sm font-medium text-gray-700">Ajouter de nouvelles images</label>
                                    <div className="flex flex-wrap gap-2 my-2">
                                        {newImagePreviews.map((preview, index) => (
                                            <img key={index} src={preview} alt="Nouvelle image" className="h-24 w-24 object-cover rounded-md" />
                                        ))}
                                    </div>
                                    <input
                                        type="file"
                                        id="images"
                                        name="images[]"
                                        multiple
                                        onChange={handleImageChange}
                                        className="mt-1 block w-full"
                                    />
                                    {errors.images && <div className="text-red-500 text-sm mt-1">{errors.images}</div>}
                                </div>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700" disabled={processing}>
                                    Modifier
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmationModal
                isOpen={showConfirmModal}
                onClose={closeConfirmModal}
                onConfirm={handleDeleteImage}
                title="Confirmer la suppression"
                message="Êtes-vous sûr de vouloir supprimer cette image ? Cette action est irréversible."
            />
        </AdminLayout>
    );
}