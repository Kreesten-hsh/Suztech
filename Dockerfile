# Utilise l'image PHP officielle comme base. C'est la fondation de notre environnement.
FROM php:8.2-fpm

# Installe les dépendances système comme Git, Curl, et des librairies pour les images.
# C'est essentiel pour que Composer et d'autres outils fonctionnent.
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libjpeg-dev \
    libwebp-dev \
    zip \
    unzip \
    && docker-php-ext-configure gd --with-jpeg --with-webp \
    && docker-php-ext-install -j$(nproc) gd

# Installe Composer, l'outil de gestion de dépendances de PHP.
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Définit le répertoire de travail dans le conteneur.
WORKDIR /var/www/html

# Copie tous vos fichiers de projet dans le conteneur.
COPY . .

# Installe Node.js et npm, les outils nécessaires pour React.
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Expose le port par défaut pour PHP-FPM, qui gérera les requêtes.
EXPOSE 9000

# Commande pour démarrer le serveur.
CMD ["php-fpm"]