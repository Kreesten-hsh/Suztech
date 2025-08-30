import React from 'react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function Guest({ children }) {
    return (
        <div>
            <Header />
            <main className="pt-20">
                {children}
            </main>
            <Footer />
        </div>
    );
}