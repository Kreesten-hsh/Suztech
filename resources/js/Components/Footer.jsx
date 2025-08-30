import React from 'react';

export default function Footer() {
    return (
        <footer className="text-center p-4 bg-gray-800 text-white mt-8">
            <p>&copy; {new Date().getFullYear()} Suztech. Tous droits réservés.</p>
        </footer>
    );
}