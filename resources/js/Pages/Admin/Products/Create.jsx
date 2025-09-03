import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Create({ auth, categories }) {
    const [imageFields, setImageFields] = useState([{ id: 1, file: null, preview: null }]);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        category_id: '',
        description: '',
        price: '',
        images: [],
    });

    const addImageField = () => {
        const newFieldId = imageFields.length > 0 ? Math.max(...imageFields.map(f => f.id)) + 1 : 1;
        setImageFields([...imageFields, { id: newFieldId, file: null, preview: null }]);
    };

    const removeImageField = (id) => {
        setImageFields(imageFields.filter(field => field.id !== id));
    };

    const handleFileChange = (e, id) => {
        const file = e.target.files[0];
        const updatedFields = imageFields.map(field => {
            if (field.id === id) {
                return {
                    ...field,
                    file: file,
                    preview: file ? URL.createObjectURL(file) : null
                };
            }
            return field;
        });
        setImageFields(updatedFields);

        // Mettre à jour les données du formulaire avec tous les fichiers
        const allFiles = updatedFields.filter(f => f.file).map(f => f.file);
        setData('images', allFiles);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.products.store'), {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Ajouter un produit</h2>}
        >
            <Head title="Ajouter un produit" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={submit}>
                                {/* Autres champs de formulaire (nom, catégorie, etc.) */}
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
                                <div className="mb-4">
                                    <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">Catégorie</label>
                                    <select
                                        id="category_id"
                                        name="category_id"
                                        value={data.category_id}
                                        onChange={(e) => setData('category_id', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    >
                                        <option value="">Sélectionner une catégorie</option>
                                        {categories.map(category => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))}
                                    </select>
                                    {errors.category_id && <div className="text-red-500 text-sm mt-1">{errors.category_id}</div>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    ></textarea>
                                    {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                                </div>
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

                                {/* Gestion dynamique des champs d'images */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Images du produit</label>
                                    {imageFields.map((field, index) => (
                                        <div key={field.id} className="flex items-center space-x-2 mt-2">
                                            <input
                                                type="file"
                                                onChange={(e) => handleFileChange(e, field.id)}
                                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                            />
                                            {field.preview && (
                                                <div className="relative w-16 h-16 rounded-md overflow-hidden">
                                                    <img src={field.preview} alt="Aperçu" className="w-full h-full object-cover" />
                                                </div>
                                            )}
                                            {imageFields.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeImageField(field.id)}
                                                    className="p-2 text-red-600 hover:text-red-800"
                                                >
                                                    &#x2715;
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addImageField}
                                        className="mt-2 px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-md shadow-sm hover:bg-green-600"
                                    >
                                        Ajouter une image
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
                                    disabled={processing}>
                                    Ajouter
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}