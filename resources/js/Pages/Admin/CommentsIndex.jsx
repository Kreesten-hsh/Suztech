import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';

// Composant de la modale de confirmation
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50 p-4"
                >
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm"
                    >
                        <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">{title}</h3>
                        <p className="text-sm text-gray-600 mb-6 text-center">{message}</p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={onConfirm}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
                            >
                                Supprimer
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default function CommentsIndex({ auth, comments }) {
    const { processing } = useForm();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);

    const openConfirmModal = (commentId) => {
        setCommentToDelete(commentId);
        setShowConfirmModal(true);
    };

    const closeConfirmModal = () => {
        setCommentToDelete(null);
        setShowConfirmModal(false);
    };

    const handleDelete = () => {
        if (commentToDelete) {
            router.delete(route('admin.comments.destroy', commentToDelete), {
                onSuccess: () => {
                    closeConfirmModal();
                    // Optional: show a success message
                    console.log("Le commentaire a été supprimé avec succès.");
                },
                onError: (errors) => {
                    closeConfirmModal();
                    console.error("Erreur lors de la suppression :", errors);
                },
            });
        }
    };

    // Variants for Framer Motion animations
    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Gestion des Commentaires</h2>}
        >
            <Head title="Gestion des Commentaires" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <motion.div
                        className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6"
                        initial="hidden"
                        animate="visible"
                        variants={sectionVariants}
                    >
                        {comments.length > 0 ? (
                            <>
                                {/* Version pour les petits écrans (les cartes) */}
                                <div className="md:hidden space-y-4">
                                    {comments.map((comment) => (
                                        <motion.div
                                            key={comment.id}
                                            className="bg-gray-50 rounded-lg shadow-md p-4 flex flex-col space-y-2"
                                            variants={itemVariants}
                                        >
                                            <div className="flex justify-between items-center border-b pb-2 mb-2">
                                                <span className="font-semibold text-sm text-gray-800">Produit:</span>
                                                <span className="text-sm text-gray-600">{comment.product.name}</span>
                                            </div>
                                            <div className="flex justify-between items-center border-b pb-2 mb-2">
                                                <span className="font-semibold text-sm text-gray-800">Nom:</span>
                                                <span className="text-sm text-gray-600">{comment.name}</span>
                                            </div>
                                            <div className="border-b pb-2 mb-2">
                                                <span className="font-semibold text-sm text-gray-800 block">Commentaire:</span>
                                                <p className="text-sm text-gray-700 mt-1 line-clamp-3">{comment.comment}</p>
                                            </div>
                                            <div className="flex justify-end pt-2">
                                                <motion.button 
                                                    onClick={() => openConfirmModal(comment.id)}
                                                    className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                                    disabled={processing}
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <FaTrash size={18} />
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Version pour les grands écrans (le tableau) */}
                                <div className="hidden md:block overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    ID
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Produit
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Nom
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Commentaire
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {comments.map((comment) => (
                                                <motion.tr key={comment.id} variants={itemVariants}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {comment.id}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {comment.product.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                        {comment.name}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-sm overflow-hidden text-ellipsis">
                                                        {comment.comment}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <motion.button 
                                                            onClick={() => openConfirmModal(comment.id)}
                                                            className="text-red-600 hover:text-red-900"
                                                            disabled={processing}
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                        >
                                                            Supprimer
                                                        </motion.button>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        ) : (
                            <p className="text-center text-gray-500">Aucun commentaire à afficher pour le moment.</p>
                        )}
                    </motion.div>
                </div>
            </div>

            <ConfirmationModal
                isOpen={showConfirmModal}
                onClose={closeConfirmModal}
                onConfirm={handleDelete}
                title="Confirmer la suppression"
                message="Êtes-vous sûr de vouloir supprimer ce commentaire ? Cette action est irréversible."
            />
        </AdminLayout>
    );
}