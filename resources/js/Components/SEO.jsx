import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import { BUSINESS_NAME, DEFAULT_OG_IMAGE } from '@/constants/business';

const toAbsoluteUrl = (value) => {
    if (!value) {
        return '';
    }

    if (value.startsWith('http://') || value.startsWith('https://')) {
        return value;
    }

    if (typeof window !== 'undefined') {
        return `${window.location.origin}${value}`;
    }

    return value;
};

export default function SEO({
    title,
    description,
    image = DEFAULT_OG_IMAGE,
    type = 'website',
}) {
    const { url } = usePage();
    const absoluteImage = toAbsoluteUrl(image);
    const absoluteUrl = typeof window !== 'undefined'
        ? window.location.href
        : toAbsoluteUrl(url);

    return (
        <Head title={title}>
            {/* FIX: Reuse a consistent SEO metadata block across all marketing and shop pages. */}
            <meta name="description" content={description} />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={BUSINESS_NAME} />
            <meta property="og:title" content={`${title} - ${BUSINESS_NAME}`} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={absoluteImage} />
            <meta property="og:url" content={absoluteUrl} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={`${title} - ${BUSINESS_NAME}`} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={absoluteImage} />
        </Head>
    );
}
