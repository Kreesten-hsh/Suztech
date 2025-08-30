import React from 'react';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Home(props) {
    return (
        <GuestLayout>
            <Head title="Accueil" />

            {/* Tout le contenu de votre page d'accueil va ici */}
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h1>Bienvenue chez Suztech</h1>
                <p>Votre contenu professionnel commence ici.</p>
            </div>
        </GuestLayout>
    );
}