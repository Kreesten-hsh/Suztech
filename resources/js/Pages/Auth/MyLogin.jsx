import React from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function MyLogin() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const submit = (event) => {
        event.preventDefault();
        post(route('login'));
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <Head title="Connexion" />
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">Connexion</h1>
                <form onSubmit={submit} noValidate>
                    <div className="mb-4">
                        {/* FIX: Bind the email label, input and error text together for assistive technologies. */}
                        <label htmlFor="login-email" className="block text-gray-700">Adresse Email</label>
                        <input
                            id="login-email"
                            name="email"
                            type="email"
                            value={data.email}
                            onChange={(event) => setData('email', event.target.value)}
                            className="mt-1 w-full rounded-md border px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                            autoComplete="email"
                            aria-required="true"
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={errors.email ? 'login-email-error' : undefined}
                        />
                        {errors.email && (
                            <div id="login-email-error" role="alert" className="mt-1 text-sm text-red-500">
                                {errors.email}
                            </div>
                        )}
                    </div>
                    <div className="mb-6">
                        {/* FIX: Bind the password label, input and error text together for assistive technologies. */}
                        <label htmlFor="login-password" className="block text-gray-700">Mot de passe</label>
                        <input
                            id="login-password"
                            name="password"
                            type="password"
                            value={data.password}
                            onChange={(event) => setData('password', event.target.value)}
                            className="mt-1 w-full rounded-md border px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                            autoComplete="current-password"
                            aria-required="true"
                            aria-invalid={Boolean(errors.password)}
                            aria-describedby={errors.password ? 'login-password-error' : undefined}
                        />
                        {errors.password && (
                            <div id="login-password-error" role="alert" className="mt-1 text-sm text-red-500">
                                {errors.password}
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full rounded-md bg-blue-600 py-2 font-bold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        Se connecter
                    </button>
                </form>
                {/* FIX: Hide the public registration entry point because the back office is now admin-only. */}
                <p className="mt-4 text-center text-sm text-gray-500">
                    Acces reserve a l administrateur SUZTECH.
                </p>
            </div>
        </div>
    );
}
