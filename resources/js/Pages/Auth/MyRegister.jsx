import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';

export default function MyRegister() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Head title="Inscription" />
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Inscription</h1>
                <form onSubmit={submit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nom</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full px-3 py-2 mt-1 border rounded-md"
                        />
                        {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Adresse Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full px-3 py-2 mt-1 border rounded-md"
                        />
                        {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Mot de passe</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full px-3 py-2 mt-1 border rounded-md"
                        />
                        {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700">Confirmer le mot de passe</label>
                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="w-full px-3 py-2 mt-1 border rounded-md"
                        />
                        {errors.password_confirmation && <div className="text-red-500 text-sm mt-1">{errors.password_confirmation}</div>}
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        S'inscrire
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Déjà un compte ? <Link href={route('login')} className="text-blue-600 hover:underline">Connectez-vous</Link>
                </p>
            </div>
        </div>
    );
}