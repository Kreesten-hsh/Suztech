import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';

export default function MyLogin() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Head title="Connexion" />
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Connexion</h1>
                <form onSubmit={submit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Adresse Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700">Mot de passe</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Se connecter
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Pas encore de compte ? <Link href={route('register')} className="text-blue-600 hover:underline">Inscrivez-vous</Link>
                </p>
            </div>
        </div>
    );
}