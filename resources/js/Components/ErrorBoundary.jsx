import React, { Component } from 'react';
import { Link } from '@inertiajs/react';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            error: null,
        };
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error,
        };
    }

    componentDidCatch() {
        // FIX: Keep the boundary hook in place for React while avoiding console noise in production code.
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12">
                    <div
                        className="w-full max-w-xl rounded-2xl bg-white p-8 text-center shadow-xl"
                        role="alert"
                        aria-live="assertive"
                    >
                        {/* FIX: Provide a resilient fallback UI when an unexpected render error occurs. */}
                        <h1 className="mb-4 text-3xl font-bold text-gray-900">
                            Une erreur inattendue est survenue
                        </h1>
                        <p className="mb-6 text-base text-gray-600">
                            L&apos;interface n&apos;a pas pu s&apos;afficher correctement. Vous pouvez recharger la page ou revenir a l&apos;accueil.
                        </p>
                        <div className="flex flex-col justify-center gap-3 sm:flex-row">
                            <button
                                type="button"
                                onClick={this.handleReload}
                                className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                            >
                                Recharger la page
                            </button>
                            <Link
                                href={route('home')}
                                className="rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
                            >
                                Retour a l&apos;accueil
                            </Link>
                        </div>
                        {import.meta.env.DEV && this.state.error?.message && (
                            <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-left text-sm text-red-700">
                                {this.state.error.message}
                            </p>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
