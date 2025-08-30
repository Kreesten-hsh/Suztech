import React from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { FaHeart, FaHandshake, FaBolt, FaShieldAlt, FaHeadset, FaStar, FaLaptopCode, FaPencilRuler, FaUserTie } from 'react-icons/fa';

export default function About(props) {
    return (
        <GuestLayout>
            <Head title="À propos" />

            {/* Section Bannière */}
            <section className="bg-gray-900 text-white py-24 sm:py-32 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-10">À propos de Suztech</h1>
                    <p className='text-lg sm:text-xl lg:text-2xl font-light'>Votre partenaire de confiance en technologie et innovation depuis plusieurs années.</p>
                </div>
            </section>

            {/* Section Notre Histoire */}
            <section className="py-16 sm:py-24 px-6 lg:px-20 bg-white">
                <div className="container mx-auto max-w-10xl">
                    <div className="md:flex md:items-center md:space-x-12">
                        <div className="md:w-1/2">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-10">Notre Histoire</h2>
                            <p className="text-gray-700 lg:text-xl leading-relaxed mb-6">
                                Fondée avec la passion de la technologie et l'innovation, Suztech s'est rapidement imposée comme un acteur incontournable dans le domaine des solutions informatiques au Bénin. <br /> <br />
                                Notre entreprise a débuté avec une vision simple : rendre la technologie accessible à tous, qu'il s'agisse de particuliers ou d'entreprises. Nous combinons expertise technique et service client exceptionnel. <br /> <br />
                                Aujourd'hui, nous sommes fiers d'accompagner nos clients dans leur transformation digitale avec des solutions sur mesure et un support de qualité.
                            </p>
                        </div>
                        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
                            <FaHeart className="text-9xl text-blue-500" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Notre Approche */}
            <section className="py-16 sm:py-24 px-6 lg:px-20 bg-gray-100">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-12">Notre approche</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Valeur 1 : Fiabilité & Rapidité */}
                        <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md">
                            <FaBolt className="text-6xl text-blue-600 mb-4" />
                            <h3 className="text-2xl font-semibold mb-2">Fiable & Rapide</h3>
                            <p className="text-gray-600">
                                Notre devise : des solutions efficaces dans les délais impartis.
                            </p>
                        </div>
                        {/* Valeur 2 : Sécurité */}
                        <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md">
                            <FaShieldAlt className="text-6xl text-green-600 mb-4" />
                            <h3 className="text-2xl font-semibold mb-2">Sécurité</h3>
                            <p className="text-gray-600">
                                Protection et confidentialité de vos données garanties.
                            </p>
                        </div>
                        {/* Valeur 3 : Service Client */}
                        <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md">
                            <FaHeadset className="text-6xl text-purple-600 mb-4" />
                            <h3 className="text-2xl font-semibold mb-2">Service Client</h3>
                            <p className="text-gray-600">
                                Accompagnement personnalisé et support réactif.
                            </p>
                        </div>
                        {/* Valeur 4 : Qualité */}
                        <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md">
                            <FaStar className="text-6xl text-yellow-600 mb-4" />
                            <h3 className="text-2xl font-semibold mb-2">Qualité</h3>
                            <p className="text-gray-600">
                                Standards élevés pour tous nos produits et services.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Notre Équipe */}
            <section className="py-16 sm:py-24 px-6 lg:px-20 bg-white">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-12">Notre Équipe</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {/* Membre 1 : Expert IT */}
                        <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
                            <FaLaptopCode className="text-6xl text-blue-600 mx-auto mb-4" />
                            <h4 className="text-2xl font-bold">Expert IT</h4>
                            <p className="text-lg font-semibold text-gray-700">Responsable Technique</p>
                            <p className="text-gray-600 mt-2">
                                Spécialiste en infrastructure et sécurité informatique.
                            </p>
                        </div>
                        {/* Membre 2 : Designer */}
                        <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
                            <FaPencilRuler className="text-6xl text-purple-600 mx-auto mb-4" />
                            <h4 className="text-2xl font-bold">Designer</h4>
                            <p className="text-lg font-semibold text-gray-700">Responsable Créatif</p>
                            <p className="text-gray-600 mt-2">
                                Expert en design graphique et identité visuelle.
                            </p>
                        </div>
                        {/* Membre 3 : Consultant */}
                        <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
                            <FaUserTie className="text-6xl text-teal-600 mx-auto mb-4" />
                            <h4 className="text-2xl font-bold">Consultant</h4>
                            <p className="text-lg font-semibold text-gray-700">Responsable Commercial</p>
                            <p className="text-gray-600 mt-2">
                                Spécialiste des services administratifs et conseil.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}