import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import SEO from '@/Components/SEO';
import { motion } from 'framer-motion';
import { FaBolt, FaHeadset, FaShieldAlt, FaStar } from 'react-icons/fa';

export default function About() {
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
        hover: {
            scale: 1.05,
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
    };

    return (
        <GuestLayout>
            {/* FIX: Add reusable SEO metadata for the about page. */}
            <SEO
                title="A propos"
                description="Decouvrez l'histoire, l'approche et l'equipe de SUZTECH, votre partenaire technologique de confiance au Benin."
                type="website"
            />

            <motion.section
                className="relative overflow-hidden py-28 text-center text-white shadow-xl sm:py-36"
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                style={{
                    backgroundImage: 'url("/images/imagescircuit2.webp")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="absolute inset-0 bg-gray-900 bg-opacity-70" />
                <div className="container relative z-10 mx-auto px-4">
                    <motion.h1
                        className="mb-6 text-4xl font-extrabold tracking-tight sm:text-6xl"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                    >
                        A propos de <span className="text-[#f8e71c]">SUZTECH</span>
                    </motion.h1>
                    <motion.p
                        className="mx-auto max-w-3xl text-lg font-light opacity-90 sm:text-xl lg:text-2xl"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: 0.7 } }}
                    >
                        Votre partenaire de confiance en technologie et innovation depuis plusieurs annees.
                    </motion.p>
                </div>
            </motion.section>

            <motion.section
                className="bg-white px-6 py-20 lg:px-20"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
            >
                <div className="container mx-auto max-w-7xl md:flex md:items-center md:space-x-12">
                    <div className="md:w-1/2">
                        <h2 className="mb-8 text-3xl font-bold text-gray-900 sm:text-4xl">Notre Histoire</h2>
                        <p className="leading-relaxed text-gray-700 lg:text-lg">
                            Fondee avec la passion de la technologie et de l innovation, <span className="font-bold">SUZTECH</span> s est rapidement imposee
                            comme un acteur incontournable dans le domaine des solutions informatiques au Benin.
                            <br />
                            <br />
                            Notre entreprise a debute avec une vision simple : rendre la technologie accessible a tous.
                            Nous combinons expertise technique et service client exceptionnel.
                            <br />
                            <br />
                            Aujourd hui, nous sommes fiers d accompagner nos clients dans leur transformation digitale
                            avec des solutions sur mesure et un support de qualite.
                        </p>
                    </div>
                    <div className="mt-12 flex justify-center md:mt-0 md:w-1/2">
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 100 } }}
                            viewport={{ once: true, amount: 0.5 }}
                            className="relative h-64 w-full overflow-hidden rounded-lg shadow-lg md:h-96"
                        >
                            <img
                                src="/images/logo2.jpg"
                                alt="Representation de l'innovation et de l'histoire de SUZTECH"
                                className="h-full w-full object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            <motion.section
                className="bg-gray-50 px-6 py-20 lg:px-20"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
            >
                <div className="container mx-auto text-center">
                    <h2 className="mb-14 text-3xl font-bold text-gray-900 sm:text-4xl">Notre Approche</h2>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        <motion.div
                            className="flex flex-col items-center rounded-xl bg-white p-8 shadow-md"
                            whileHover="hover"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={cardVariants}
                        >
                            <FaBolt className="text-6xl text-cyan-600" />
                            <h3 className="mb-2 mt-4 text-2xl font-semibold text-gray-800">Fiable & Rapide</h3>
                            <p className="text-gray-600">Des solutions efficaces dans les delais impartis.</p>
                        </motion.div>
                        <motion.div
                            className="flex flex-col items-center rounded-xl bg-white p-8 shadow-md"
                            whileHover="hover"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={cardVariants}
                        >
                            <FaShieldAlt className="text-6xl text-indigo-600" />
                            <h3 className="mb-2 mt-4 text-2xl font-semibold text-gray-800">Securite</h3>
                            <p className="text-gray-600">Protection et confidentialite de vos donnees garanties.</p>
                        </motion.div>
                        <motion.div
                            className="flex flex-col items-center rounded-xl bg-white p-8 shadow-md"
                            whileHover="hover"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={cardVariants}
                        >
                            <FaHeadset className="text-6xl text-teal-600" />
                            <h3 className="mb-2 mt-4 text-2xl font-semibold text-gray-800">Service Client</h3>
                            <p className="text-gray-600">Support reactif et accompagnement personnalise.</p>
                        </motion.div>
                        <motion.div
                            className="flex flex-col items-center rounded-xl bg-white p-8 shadow-md"
                            whileHover="hover"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={cardVariants}
                        >
                            <FaStar className="text-6xl text-yellow-500" />
                            <h3 className="mb-2 mt-4 text-2xl font-semibold text-gray-800">Qualite</h3>
                            <p className="text-gray-600">Standards eleves pour tous nos produits et services.</p>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            <motion.section
                className="bg-white px-6 py-20 lg:px-20"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
            >
                <div className="container mx-auto text-center">
                    <h2 className="mb-14 text-3xl font-bold text-gray-900 sm:text-4xl">Notre Equipe</h2>
                    <div className="mx-auto grid max-w-6xl grid-cols-1 justify-items-center gap-10 md:grid-cols-2 lg:grid-cols-3">
                        <motion.div
                            className="w-full max-w-sm rounded-xl bg-gray-50 p-8 shadow-lg"
                            whileHover="hover"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={cardVariants}
                        >
                            <img
                                src="/images/CEO.jpg"
                                alt="Portrait de HOUNGBO Tobias, CEO de SUZTECH"
                                className="mx-auto mb-4 h-40 w-40 rounded-full border-4 border-gray-200 object-cover"
                            />
                            <h4 className="mt-4 text-2xl font-bold text-gray-800">HOUNGBO Tobias</h4>
                            <p className="text-lg font-semibold text-gray-700">CEO de SUZTECH</p>
                            <p className="mt-3 text-gray-600">
                                Tobias est le moteur strategique de SUZTECH. Il supervise chaque aspect de l entreprise
                                pour transformer les defis technologiques en opportunites de croissance.
                            </p>
                        </motion.div>

                        <motion.div
                            className="w-full max-w-sm rounded-xl bg-gray-50 p-8 shadow-lg"
                            whileHover="hover"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={cardVariants}
                        >
                            <img
                                src="/images/Dev.jpg"
                                alt="Portrait de AGBOTON Kreesten, developpeur web"
                                className="mx-auto mb-4 h-40 w-40 rounded-full border-4 border-gray-200 object-cover"
                            />
                            <h4 className="mt-4 text-2xl font-bold text-gray-800">AGBOTON Kreesten</h4>
                            <p className="text-lg font-semibold text-gray-700">Developpeur Web</p>
                            <p className="mt-3 text-gray-600">
                                Kreesten conçoit des experiences web modernes et performantes. Son exigence sur la qualite
                                et les details permet a SUZTECH de livrer des produits numeriques solides.
                            </p>
                        </motion.div>

                        <motion.div
                            className="w-full max-w-sm rounded-xl bg-gray-50 p-8 shadow-lg"
                            whileHover="hover"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={cardVariants}
                        >
                            <img
                                src="/images/comptable.jpg"
                                alt="Portrait de Evrard SOKENOU, comptable de SUZTECH"
                                className="mx-auto mb-4 h-40 w-40 rounded-full border-4 border-gray-200 object-cover"
                            />
                            <h4 className="mt-4 text-2xl font-bold text-gray-800">Evrard SOKENOU</h4>
                            <p className="text-lg font-semibold text-gray-700">Comptable</p>
                            <p className="mt-3 text-gray-600">
                                Evrard pilote la gestion financiere, comptable, fiscale et sociale de SUZTECH afin de garantir
                                la conformite et la bonne allocation des ressources de l entreprise.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </motion.section>
        </GuestLayout>
    );
}
