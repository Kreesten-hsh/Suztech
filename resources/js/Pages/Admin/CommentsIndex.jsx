import React, { useRef, useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ModalDialog from '@/Components/ModalDialog';
import Pagination from '@/Components/Pagination';
import { motion } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';

export default function CommentsIndex({ auth, comments }) {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const confirmDeleteButtonRef = useRef(null);

    const commentsData = comments?.data ?? [];

    const openConfirmModal = (commentId) => {
        setCommentToDelete(commentId);
        setShowConfirmModal(true);
    };

    const closeConfirmModal = () => {
        if (isDeleting) {
            return;
        }

        setCommentToDelete(null);
        setShowConfirmModal(false);
    };

    const handleDelete = () => {
        if (!commentToDelete) {
            return;
        }

        setIsDeleting(true);

        router.delete(route('admin.comments.destroy', commentToDelete), {
            onFinish: () => {
                setIsDeleting(false);
                setCommentToDelete(null);
                setShowConfirmModal(false);
            },
        });
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Gestion des Commentaires</h2>}
        >
            <Head title="Gestion des Commentaires" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <motion.div
                        className="overflow-hidden rounded-lg bg-white p-6 shadow-sm"
                        initial="hidden"
                        animate="visible"
                        variants={sectionVariants}
                    >
                        {commentsData.length > 0 ? (
                            <>
                                <div className="space-y-4 md:hidden">
                                    {commentsData.map((comment) => (
                                        <motion.div
                                            key={comment.id}
                                            className="flex flex-col space-y-2 rounded-lg bg-gray-50 p-4 shadow-md"
                                            variants={itemVariants}
                                        >
                                            <div className="mb-2 flex items-center justify-between border-b pb-2">
                                                <span className="text-sm font-semibold text-gray-800">Produit:</span>
                                                <span className="text-sm text-gray-600">{comment.product?.name ?? 'Produit supprime'}</span>
                                            </div>
                                            <div className="mb-2 flex items-center justify-between border-b pb-2">
                                                <span className="text-sm font-semibold text-gray-800">Nom:</span>
                                                <span className="text-sm text-gray-600">{comment.name}</span>
                                            </div>
                                            <div className="mb-2 border-b pb-2">
                                                <span className="block text-sm font-semibold text-gray-800">Commentaire:</span>
                                                <p className="mt-1 line-clamp-3 text-sm text-gray-700">{comment.comment}</p>
                                            </div>
                                            <div className="flex justify-end pt-2">
                                                <motion.button
                                                    type="button"
                                                    onClick={() => openConfirmModal(comment.id)}
                                                    aria-label={`Supprimer le commentaire de ${comment.name}`}
                                                    className="text-red-600 transition-colors duration-200 hover:text-red-900"
                                                    disabled={isDeleting}
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <FaTrash size={18} />
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="hidden overflow-x-auto md:block">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    ID
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Produit
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Nom
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Commentaire
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {commentsData.map((comment) => (
                                                <motion.tr key={comment.id} variants={itemVariants}>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{comment.id}</td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                                        {comment.product?.name ?? 'Produit supprime'}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{comment.name}</td>
                                                    <td className="max-w-sm overflow-hidden px-6 py-4 text-sm text-gray-500 text-ellipsis">
                                                        {comment.comment}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                                                        <motion.button
                                                            type="button"
                                                            onClick={() => openConfirmModal(comment.id)}
                                                            className="text-red-600 hover:text-red-900"
                                                            disabled={isDeleting}
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

                                {/* FIX: Use the shared paginator component for admin comment moderation. */}
                                <Pagination paginator={comments} className="mt-6" />
                            </>
                        ) : (
                            <p className="text-center text-gray-500">Aucun commentaire a afficher pour le moment.</p>
                        )}
                    </motion.div>
                </div>
            </div>

            <ModalDialog
                isOpen={showConfirmModal}
                onClose={closeConfirmModal}
                title="Confirmer la suppression"
                initialFocusRef={confirmDeleteButtonRef}
            >
                {/* FIX: Unify destructive comment deletion around a local loading state and accessible dialog. */}
                <p className="mb-6 text-sm text-gray-600">
                    Etes-vous sur de vouloir supprimer ce commentaire ? Cette action est irreversible.
                </p>
                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={closeConfirmModal}
                        className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-300"
                    >
                        Annuler
                    </button>
                    <button
                        ref={confirmDeleteButtonRef}
                        type="button"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isDeleting ? 'Suppression...' : 'Supprimer'}
                    </button>
                </div>
            </ModalDialog>
        </AdminLayout>
    );
}
