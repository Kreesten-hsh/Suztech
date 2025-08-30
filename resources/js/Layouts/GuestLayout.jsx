import React from 'react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function Guest({ children }) {
    return (
        <div>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
}