import React from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { auth } = usePage().props;
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <Head title="Verification de l'adresse e-mail" />

            <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-md">
                <h1 className="mb-4 text-2xl font-bold text-gray-900">
                    Verification de votre adresse e-mail
                </h1>

                <p className="mb-4 text-sm leading-6 text-gray-600">
                    {/* FIX: Provide a dedicated Inertia screen for the verified middleware flow. */}
                    Un lien de verification a ete envoye a <span className="font-semibold">{auth?.user?.email}</span>.
                    Ouvrez votre boite mail puis cliquez sur le lien pour activer votre compte.
                </p>

                {status === 'verification-link-sent' && (
                    <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                        Un nouveau lien de verification vient d'etre envoye.
                    </div>
                )}

                <form onSubmit={submit} className="space-y-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {processing ? 'Envoi en cours...' : 'Renvoyer le lien de verification'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    <Link href={route('home')} className="font-medium text-blue-600 hover:underline">
                        Retour a l'accueil
                    </Link>
                </div>
            </div>
        </div>
    );
}
