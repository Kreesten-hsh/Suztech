// FIX: Centralize business constants so contact information and external endpoints stay consistent across the UI.
export const BUSINESS_NAME = 'SUZTECH';
export const WHATSAPP_NUMBER = '22961012941';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const CONTACT_EMAIL = 'Suztech7@gmail.com';
export const CONTACT_PHONE_URL = `tel:+${WHATSAPP_NUMBER}`;
export const CONTACT_PHONE_DISPLAY = '+229 61 01 29 41';
export const FORMSPREE_URL = import.meta.env.VITE_FORMSPREE_URL || 'https://formspree.io/f/xeolvzbr';
export const DEFAULT_OG_IMAGE = '/images/logo.png';
