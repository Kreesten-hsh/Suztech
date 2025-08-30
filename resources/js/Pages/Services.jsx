import React from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { FaLaptopCode, FaTools, FaPencilRuler, FaIdCard, FaFileInvoice, FaNetworkWired, FaCog, FaPaintBrush, FaGlobe, FaCreditCard, FaUserTie, FaPassport, FaTv, FaFileSignature } from 'react-icons/fa';

export default function Services(props) {
    return (
        <GuestLayout>
            <Head title="Services" />

            {/* Bannière de la page Services */}
            <section className="bg-blue-600 text-white py-24 sm:py-32 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl sm:text-5xl font-extrabold">Nos services et prestations</h1>
                    <p className="mt-10 text-lg sm:text-xl lg:text-2xl font-light">Suztech vous accompagne avec des solutions complètes en informatique, design et services administratifs pour particuliers et entreprises.</p>
                </div>
            </section>

            {/* Section des solutions IT */}
            <section className="py-16 px-6 lg:px-20 bg-white" id="solutions-it">
                <div className="container mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Solutions IT pour professionnels et particuliers</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Service 1 : Consultant en informatique */}
                        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 p-6 bg-gray-100 rounded-lg shadow-md">
                            <FaNetworkWired className="text-5xl text-blue-600" />
                            <div>
                                <h3 className="text-xl font-bold">Consultant en informatique</h3>
                                <p className="text-gray-600 mt-2 leading-relaxed">
                                    Vous avez un projet de transformation numérique ? Nous vous accompagnons de A à Z. De l'audit de votre système à la mise en place de stratégies IT, notre expertise vous garantit des résultats mesurables.
                                </p>
                            </div>
                        </div>

                        {/* Service 2 : Solution en IT */}
                        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 p-6 bg-gray-100 rounded-lg shadow-md">
                            <FaLaptopCode className="text-5xl text-blue-600" />
                            <div>
                                <h3 className="text-xl font-bold">Solution en IT</h3>
                                <p className="text-gray-600 mt-2 leading-relaxed">
                                    Du développement d'applications métiers à la mise en place de réseaux sécurisés, nous concevons des solutions technologiques qui s'intègrent parfaitement à vos activités. Nous vous offrons les outils pour un développement durable.
                                </p>
                            </div>
                        </div>

                        {/* Service 3 : Suivi et entretien */}
                        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 p-6 bg-gray-100 rounded-lg shadow-md">
                            <FaCog className="text-5xl text-blue-600" />
                            <div>
                                <h3 className="text-xl font-bold">Suivi et entretien des appareils</h3>
                                <p className="text-gray-600 mt-2 leading-relaxed">
                                    Un entretien régulier est la clé de la performance. Nous proposons des contrats de maintenance pour garantir le bon fonctionnement de vos ordinateurs, serveurs et autres équipements, évitant ainsi les pannes imprévues.
                                </p>
                            </div>
                        </div>

                        {/* Service 4 : Réparation */}
                        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 p-6 bg-gray-100 rounded-lg shadow-md">
                            <FaTools className="text-5xl text-blue-600" />
                            <div>
                                <h3 className="text-xl font-bold">Réparation</h3>
                                <p className="text-gray-600 mt-2 leading-relaxed">
                                    Ordinateur lent, écran cassé, virus... Nos techniciens qualifiés gèrent tout type de pannes. Apportez-nous votre appareil, nous nous occupons du reste.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Services de Design */}
            <section className="py-16 px-6 lg:px-20 bg-gray-100">
                <div className="container mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Services de Design</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {/* Service : Création de Logos */}
                        <div className="text-center p-6 bg-white rounded-lg shadow-md">
                            <FaPencilRuler className="text-5xl text-purple-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold">Création de Logos</h3>
                            <p className="text-gray-600 mt-2 leading-relaxed">
                                Design d'identité visuelle professionnelle pour votre entreprise.
                            </p>
                        </div>
                        {/* Service : Flyers et supports marketing */}
                        <div className="text-center p-6 bg-white rounded-lg shadow-md">
                            <FaPaintBrush className="text-5xl text-purple-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold">Flyers et supports marketing</h3>
                            <p className="text-gray-600 mt-2 leading-relaxed">
                                Conception graphique pour vos communications.
                            </p>
                        </div>
                        {/* Service : Cartes de visites */}
                        <div className="text-center p-6 bg-white rounded-lg shadow-md">
                            <FaCreditCard className="text-5xl text-purple-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold">Cartes de visites</h3>
                            <p className="text-gray-600 mt-2 leading-relaxed">
                                Cartes de visite professionnelles et modernes.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Prestations administratives */}
            <section className="py-16 px-6 lg:px-20 bg-white" id="prestations-administratives">
                <div className="container mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Prestations administratives</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                        {/* Service : IFU */}
                        <div className="text-center p-6 bg-gray-100 rounded-lg shadow-md">
                            <FaIdCard className="text-5xl text-teal-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold">IFU (Identifiant Fiscal Unique)</h3>
                            <p className="font-semibold text-gray-700">Administratif</p>
                            <p className="text-gray-600 mt-2 leading-relaxed">
                                Obtention de votre numéro d'identification fiscale.
                            </p>
                        </div>
                        {/* Service : RCCM */}
                        <div className="text-center p-6 bg-gray-100 rounded-lg shadow-md">
                            <FaFileSignature className="text-5xl text-teal-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold">RCCM (Registre du Commerce)</h3>
                            <p className="font-semibold text-gray-700">Juridique</p>
                            <p className="text-gray-600 mt-2 leading-relaxed">
                                Immatriculation au registre du commerce.
                            </p>
                        </div>
                        {/* Service : C'EST MOI */}
                        <div className="text-center p-6 bg-gray-100 rounded-lg shadow-md">
                            <FaUserTie className="text-5xl text-teal-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold">C'EST MOI</h3>
                            <p className="font-semibold text-gray-700">Digital</p>
                            <p className="text-gray-600 mt-2 leading-relaxed">
                                Service d'identification numérique sécurisée.
                            </p>
                        </div>
                        {/* Service : CIP */}
                        <div className="text-center p-6 bg-gray-100 rounded-lg shadow-md">
                            <FaPassport className="text-5xl text-teal-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold">CIP (Carte d'Identité Professionnelle)</h3>
                            <p className="font-semibold text-gray-700">Professionnel</p>
                            <p className="text-gray-600 mt-2 leading-relaxed">
                                Obtention de carte d'identité professionnelle.
                            </p>
                        </div>
                        {/* Service : ACTE SECURISE */}
                        <div className="text-center p-6 bg-gray-100 rounded-lg shadow-md">
                            <FaFileInvoice className="text-5xl text-teal-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold">ACTE SECURISE</h3>
                            <p className="font-semibold text-gray-700">Sécurité</p>
                            <p className="text-gray-600 mt-2 leading-relaxed">
                                Sécurisation et authentification de documents.
                            </p>
                        </div>
                        {/* Service : REABONNEMENT CANAL+ */}
                        <div className="text-center p-6 bg-gray-100 rounded-lg shadow-md">
                            <FaTv className="text-5xl text-teal-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold">REABONNEMENT CANAL+</h3>
                            <p className="font-semibold text-gray-700">Télévision</p>
                            <p className="text-gray-600 mt-2 leading-relaxed">
                                Gestion des abonnements et renouvellements.
                            </p>
                        </div>
                        {/* Service : DMD PASSEPORT */}
                        <div className="text-center p-6 bg-gray-100 rounded-lg shadow-md">
                            <FaPassport className="text-5xl text-teal-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold">DMD PASSEPORT</h3>
                            <p className="font-semibold text-gray-700">Voyage</p>
                            <p className="text-gray-600 mt-2 leading-relaxed">
                                Assistance pour demande de passeport.
                            </p>
                        </div>
                        {/* Service : FACTURE NORMALISEE */}
                        <div className="text-center p-6 bg-gray-100 rounded-lg shadow-md">
                            <FaFileInvoice className="text-5xl text-teal-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold">FACTURE NORMALISEE</h3>
                            <p className="font-semibold text-gray-700">Comptabilité</p>
                            <p className="text-gray-600 mt-2 leading-relaxed">
                                Mise en conformité de la facturation.
                            </p>
                        </div>
                        {/* Service : PAYEMENT FACTURE SONEB/SBEE */}
                        <div className="text-center p-6 bg-gray-100 rounded-lg shadow-md">
                            <FaFileInvoice className="text-5xl text-teal-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold">PAYEMENT FACTURE SONEB/SBEE</h3>
                            <p className="font-semibold text-gray-700">Utilités</p>
                            <p className="text-gray-600 mt-2 leading-relaxed">
                                Paiement de factures d'eau et d'électricité.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}