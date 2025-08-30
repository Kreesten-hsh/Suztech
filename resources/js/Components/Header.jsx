import React from 'react';
import { Link } from '@inertiajs/react';

export default function Header() {
    return (
        <header className="flex justify-between p-4 bg-gray-200">
            <div>
                <Link href="/">
                    <h1 className="m-0">Suztech</h1>
                </Link>
            </div>
            <nav>
                <ul className="list-none m-0 p-0 flex gap-4">
                    <li><Link href="/">Accueil</Link></li>
                    <li><Link href="/services">Services</Link></li>
                    <li><Link href="/boutique">Boutique</Link></li>
                    <li><Link href="/about">À propos</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                </ul>
            </nav>
        </header>
    );
}