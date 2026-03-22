import React from 'react';
import { Link } from '@inertiajs/react';

const normalizeLabel = (label = '') => {
    return label
        .replace(/&laquo;/g, '«')
        .replace(/&raquo;/g, '»')
        .replace(/&amp;/g, '&')
        .replace(/<\/?[^>]+(>|$)/g, '')
        .trim();
};

const buildPaginationState = (paginator) => {
    const pageLinks = Array.isArray(paginator?.meta?.links)
        ? paginator.meta.links
        : Array.isArray(paginator?.links)
            ? paginator.links
            : [];

    if (pageLinks.length > 0) {
        return {
            currentPage: paginator?.meta?.current_page ?? paginator?.current_page ?? 1,
            lastPage: paginator?.meta?.last_page ?? paginator?.last_page ?? 1,
            links: pageLinks.map((link) => ({
                ...link,
                label: normalizeLabel(link.label),
            })),
        };
    }

    const currentPage = paginator?.current_page ?? paginator?.meta?.current_page ?? 1;
    const lastPage = paginator?.last_page ?? paginator?.meta?.last_page ?? 1;

    return {
        currentPage,
        lastPage,
        links: [
            {
                url: paginator?.prev_page_url ?? null,
                label: 'Precedent',
                active: false,
            },
            {
                url: null,
                label: `Page ${currentPage}`,
                active: true,
            },
            {
                url: paginator?.next_page_url ?? null,
                label: 'Suivant',
                active: false,
            },
        ],
    };
};

export default function Pagination({ paginator, className = '' }) {
    if (!paginator) {
        return null;
    }

    const { currentPage, lastPage, links } = buildPaginationState(paginator);

    if (lastPage <= 1) {
        return null;
    }

    return (
        <nav
            className={`mt-8 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-4 sm:flex-row ${className}`}
            aria-label="Pagination"
        >
            {/* FIX: Expose pagination progress for screen readers and keyboard users. */}
            <p className="text-sm text-gray-500">
                Page {currentPage} sur {lastPage}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2">
                {links.map((link, index) => {
                    const label = normalizeLabel(link.label);
                    const isDisabled = !link.url;
                    const isEllipsis = label === '...';

                    if (isEllipsis) {
                        return (
                            <span
                                key={`${label}-${index}`}
                                className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-400"
                                aria-hidden="true"
                            >
                                {label}
                            </span>
                        );
                    }

                    const baseClassName = `rounded-lg px-4 py-2 text-sm font-medium transition ${
                        link.active
                            ? 'border border-blue-600 bg-blue-600 text-white'
                            : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`;

                    if (isDisabled) {
                        return (
                            <span
                                key={`${label}-${index}`}
                                className={`${baseClassName} cursor-not-allowed opacity-50`}
                                aria-disabled="true"
                            >
                                {label}
                            </span>
                        );
                    }

                    return (
                        <Link
                            key={`${label}-${index}`}
                            href={link.url}
                            preserveScroll
                            className={baseClassName}
                            aria-current={link.active ? 'page' : undefined}
                        >
                            {label}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
