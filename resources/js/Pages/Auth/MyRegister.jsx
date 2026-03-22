import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function MyRegister() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (event) => {
        event.preventDefault();
        post(route('register'));
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <Head title="Inscription" />
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">Inscription</h1>
                <form onSubmit={submit} noValidate>
                    <div className="mb-4">
                        {/* FIX: Bind the name label, input and error text together for assistive technologies. */}
                        <label htmlFor="register-name" className="block text-gray-700">Nom</label>
                        <input
                            id="register-name"
                            name="name"
                            type="text"
                            value={data.name}
                            onChange={(event) => setData('name', event.target.value)}
                            className="mt-1 w-full rounded-md border px-3 py-2"
                            autoComplete="name"
                            aria-required="true"
                            aria-invalid={Boolean(errors.name)}
                            aria-describedby={errors.name ? 'register-name-error' : undefined}
                        />
                        {errors.name && (
                            <div id="register-name-error" role="alert" className="mt-1 text-sm text-red-500">
                                {errors.name}
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        {/* FIX: Bind the email label, input and error text together for assistive technologies. */}
                        <label htmlFor="register-email" className="block text-gray-700">Adresse Email</label>
                        <input
                            id="register-email"
                            name="email"
                            type="email"
                            value={data.email}
                            onChange={(event) => setData('email', event.target.value)}
                            className="mt-1 w-full rounded-md border px-3 py-2"
                            autoComplete="email"
                            aria-required="true"
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={errors.email ? 'register-email-error' : undefined}
                        />
                        {errors.email && (
                            <div id="register-email-error" role="alert" className="mt-1 text-sm text-red-500">
                                {errors.email}
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        {/* FIX: Bind the password label, input and error text together for assistive technologies. */}
                        <label htmlFor="register-password" className="block text-gray-700">Mot de passe</label>
                        <input
                            id="register-password"
                            name="password"
                            type="password"
                            value={data.password}
                            onChange={(event) => setData('password', event.target.value)}
                            className="mt-1 w-full rounded-md border px-3 py-2"
                            autoComplete="new-password"
                            aria-required="true"
                            aria-invalid={Boolean(errors.password)}
                            aria-describedby={errors.password ? 'register-password-error' : undefined}
                        />
                        {errors.password && (
                            <div id="register-password-error" role="alert" className="mt-1 text-sm text-red-500">
                                {errors.password}
                            </div>
                        )}
                    </div>
                    <div className="mb-6">
                        {/* FIX: Bind the confirmation label, input and error text together for assistive technologies. */}
                        <label htmlFor="register-password-confirmation" className="block text-gray-700">Confirmer le mot de passe</label>
                        <input
                            id="register-password-confirmation"
                            name="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(event) => setData('password_confirmation', event.target.value)}
                            className="mt-1 w-full rounded-md border px-3 py-2"
                            autoComplete="new-password"
                            aria-required="true"
                            aria-invalid={Boolean(errors.password_confirmation)}
                            aria-describedby={errors.password_confirmation ? 'register-password-confirmation-error' : undefined}
                        />
                        {errors.password_confirmation && (
                            <div id="register-password-confirmation-error" role="alert" className="mt-1 text-sm text-red-500">
                                {errors.password_confirmation}
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full rounded-md bg-blue-600 py-2 font-bold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        S&apos;inscrire
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Deja un compte ? <Link href={route('login')} className="text-blue-600 hover:underline">Connectez-vous</Link>
                </p>
            </div>
        </div>
    );
}
