import React from 'react';
import FlashMessage from '@/Components/FlashMessage';
import Footer from '@/Components/Footer';
import Header from '@/Components/Header';

export default function GuestLayout({ children }) {
    return (
        <div>
            <Header />
            {/* FIX: Render global flash feedback inside the shared guest layout. */}
            <FlashMessage />
            <main id="main-content" className="pt-20">
                {children}
            </main>
            <Footer />
        </div>
    );
}
