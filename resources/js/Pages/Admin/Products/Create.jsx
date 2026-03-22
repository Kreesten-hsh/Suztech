import React, { useEffect, useRef, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

const createEmptyField = (id) => ({
    id,
    file: null,
    preview: null,
});

export default function Create({ auth, categories }) {
    const [imageFields, setImageFields] = useState([createEmptyField(1)]);
    const imageFieldsRef = useRef(imageFields);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        category_id: '',
        description: '',
        price: '',
        images: [],
    });

    useEffect(() => {
        imageFieldsRef.current = imageFields;
    }, [imageFields]);

    useEffect(() => {
        return () => {
            imageFieldsRef.current.forEach((field) => {
                if (field.preview) {
                    URL.revokeObjectURL(field.preview);
                }
            });
        };
    }, []);

    const syncFormImages = (fields) => {
        setData('images', fields.filter((field) => field.file).map((field) => field.file));
    };

    const addImageField = () => {
        if (imageFields.length >= 5) {
            return;
        }

        const newFieldId = imageFields.length > 0 ? Math.max(...imageFields.map((field) => field.id)) + 1 : 1;
        setImageFields((previousFields) => [...previousFields, createEmptyField(newFieldId)]);
    };

    const removeImageField = (id) => {
        const fieldToRemove = imageFields.find((field) => field.id === id);

        if (fieldToRemove?.preview) {
            URL.revokeObjectURL(fieldToRemove.preview);
        }

        const updatedFields = imageFields.filter((field) => field.id !== id);
        setImageFields(updatedFields.length > 0 ? updatedFields : [createEmptyField(1)]);

        // FIX: Recompute the submitted images array whenever a preview field is removed.
        syncFormImages(updatedFields);
    };

    const handleFileChange = (event, id) => {
        const file = event.target.files?.[0] ?? null;

        const updatedFields = imageFields.map((field) => {
            if (field.id !== id) {
                return field;
            }

            if (field.preview) {
                URL.revokeObjectURL(field.preview);
            }

            return {
                ...field,
                file,
                preview: file ? URL.createObjectURL(file) : null,
            };
        });

        setImageFields(updatedFields);
        syncFormImages(updatedFields);
    };

    const submit = (event) => {
        event.preventDefault();
        post(route('admin.products.store'), {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Ajouter un produit</h2>}
        >
            <Head title="Ajouter un produit" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="border-b border-gray-200 bg-white p-6">
                            <form onSubmit={submit} className="space-y-6">
                                {/* FIX: Associate label, field and validation error for the product name. */}
                                <div>
                                    <label htmlFor="product-name" className="block text-sm font-medium text-gray-700">
                                        Nom du produit
                                    </label>
                                    <input
                                        type="text"
                                        id="product-name"
                                        name="name"
                                        value={data.name}
                                        onChange={(event) => setData('name', event.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        aria-required="true"
                                        aria-invalid={Boolean(errors.name)}
                                        aria-describedby={errors.name ? 'product-name-error' : undefined}
                                    />
                                    {errors.name && (
                                        <p id="product-name-error" className="mt-1 text-sm text-red-500" role="alert">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* FIX: Associate label, field and validation error for the category selector. */}
                                <div>
                                    <label htmlFor="product-category" className="block text-sm font-medium text-gray-700">
                                        Categorie
                                    </label>
                                    <select
                                        id="product-category"
                                        name="category_id"
                                        value={data.category_id}
                                        onChange={(event) => setData('category_id', event.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        aria-required="true"
                                        aria-invalid={Boolean(errors.category_id)}
                                        aria-describedby={errors.category_id ? 'product-category-error' : undefined}
                                    >
                                        <option value="">Selectionner une categorie</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category_id && (
                                        <p id="product-category-error" className="mt-1 text-sm text-red-500" role="alert">
                                            {errors.category_id}
                                        </p>
                                    )}
                                </div>

                                {/* FIX: Associate label, field and validation error for the description textarea. */}
                                <div>
                                    <label htmlFor="product-description" className="block text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <textarea
                                        id="product-description"
                                        name="description"
                                        value={data.description}
                                        onChange={(event) => setData('description', event.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        rows="6"
                                        aria-invalid={Boolean(errors.description)}
                                        aria-describedby={errors.description ? 'product-description-error' : undefined}
                                    />
                                    {errors.description && (
                                        <p id="product-description-error" className="mt-1 text-sm text-red-500" role="alert">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                {/* FIX: Associate label, field and validation error for the product price. */}
                                <div>
                                    <label htmlFor="product-price" className="block text-sm font-medium text-gray-700">
                                        Prix
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        id="product-price"
                                        name="price"
                                        value={data.price}
                                        onChange={(event) => setData('price', event.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        aria-required="true"
                                        aria-invalid={Boolean(errors.price)}
                                        aria-describedby={errors.price ? 'product-price-error' : undefined}
                                    />
                                    {errors.price && (
                                        <p id="product-price-error" className="mt-1 text-sm text-red-500" role="alert">
                                            {errors.price}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label className="block text-sm font-medium text-gray-700">Images du produit</label>
                                        <span className="text-sm text-gray-500">{imageFields.length}/5</span>
                                    </div>

                                    <div className="mt-2 space-y-3">
                                        {imageFields.map((field, index) => (
                                            <div key={field.id} className="flex items-center gap-3">
                                                <input
                                                    type="file"
                                                    id={`product-image-${field.id}`}
                                                    accept="image/*"
                                                    onChange={(event) => handleFileChange(event, field.id)}
                                                    className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                                                    aria-label={`Selectionner l'image ${index + 1} du produit`}
                                                />

                                                {field.preview && (
                                                    <div className="relative h-16 w-16 overflow-hidden rounded-md">
                                                        <img
                                                            src={field.preview}
                                                            alt={`Apercu de l'image ${index + 1} du produit`}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                )}

                                                {imageFields.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImageField(field.id)}
                                                        aria-label={`Supprimer le champ image ${index + 1}`}
                                                        className="p-2 text-red-600 hover:text-red-800"
                                                    >
                                                        &#x2715;
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {errors.images && (
                                        <p className="mt-2 text-sm text-red-500" role="alert">
                                            {errors.images}
                                        </p>
                                    )}

                                    <button
                                        type="button"
                                        onClick={addImageField}
                                        disabled={imageFields.length >= 5}
                                        className="mt-3 rounded-md bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        Ajouter une image
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    className="rounded-md bg-blue-600 px-4 py-2 text-white shadow-sm hover:bg-blue-700"
                                    disabled={processing}
                                >
                                    {processing ? 'Ajout en cours...' : 'Ajouter'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
