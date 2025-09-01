# Utilise une image PHP avec FPM et le système d'exploitation Alpine
FROM php:8.2-fpm-alpine

# Installe les dépendances système nécessaires, y compris Nginx, Git et Node.js
RUN apk add --no-cache \
    nginx \
    git \
    curl \
    libpng-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    mariadb-dev \
    zip \
    unzip \
    nodejs \
    npm \
    && docker-php-ext-configure gd --with-jpeg --with-webp \
    && docker-php-ext-install -j$(nproc) gd pdo pdo_mysql

# Installe Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copie tous les fichiers de l'application dans le répertoire de travail
COPY . /var/www/html

# Définir le répertoire de travail
WORKDIR /var/www/html

# Installe les dépendances PHP et Node.js
RUN composer install --no-dev --optimize-autoloader \
    && npm install \
    && npm run build

# Copie le fichier de configuration Nginx
COPY .docker/nginx/default.conf /etc/nginx/nginx.conf

# Définir les permissions
# L'utilisateur `www-data` existe dans l'image PHP, donc cette commande fonctionnera
RUN chown -R www-data:www-data /var/www/html && chmod -R 775 /var/www/html/storage

# Expose le port HTTP
EXPOSE 80

# Commande de démarrage : lance les deux services PHP-FPM et Nginx
CMD ["sh", "-c", "php-fpm -F & nginx -g 'daemon off;'"]