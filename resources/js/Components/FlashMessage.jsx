import React from 'react';
import { usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';

const resolveStatusMessage = (status) => {
    if (status === 'verification-link-sent') {
        return 'Un nouveau lien de verification a ete envoye a votre adresse e-mail.';
    }

    return status;
};

export default function FlashMessage() {
    const { flash = {} } = usePage().props;

    const messages = [
        flash.success
            ? {
                id: 'success',
                text: flash.success,
                className: 'border-green-200 bg-green-50 text-green-700',
                role: 'status',
            }
            : null,
        flash.error
            ? {
                id: 'error',
                text: flash.error,
                className: 'border-red-200 bg-red-50 text-red-700',
                role: 'alert',
            }
            : null,
        flash.status
            ? {
                id: 'status',
                text: resolveStatusMessage(flash.status),
                className: 'border-blue-200 bg-blue-50 text-blue-700',
                role: 'status',
            }
            : null,
    ].filter(Boolean);

    return (
        <AnimatePresence>
            {messages.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:px-8"
                >
                    {/* FIX: Surface backend flash messages in a live region across all Inertia pages. */}
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            role={message.role}
                            aria-live={message.role === 'alert' ? 'assertive' : 'polite'}
                            className={`rounded-xl border px-4 py-3 text-sm font-medium shadow-sm ${message.className}`}
                        >
                            {message.text}
                        </div>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
