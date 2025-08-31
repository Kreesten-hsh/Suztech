# Étape 1 : Construction de l'application (PHP + JS)
FROM php:8.2-fpm-alpine AS laravel_builder

# Installer les dépendances système nécessaires
RUN apk add --no-cache \
    git \
    curl \
    libpng-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    zip \
    unzip \
    nodejs \
    npm \
    && docker-php-ext-configure gd --with-jpeg --with-webp \
    && docker-php-ext-install -j$(nproc) gd

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Définir le répertoire de travail
WORKDIR /var/www/html

# Copier les fichiers de l'application
COPY . .

# Installer les dépendances PHP
RUN composer install --no-dev --optimize-autoloader

# Installer les dépendances Node et compiler les assets React
RUN npm install && npm run build


# Étape 2 : Image finale (Production)
# Utilise une image Nginx légère
FROM nginx:1.25.3-alpine

# Installer PHP-FPM dans cette image pour qu'il puisse communiquer avec Nginx
RUN apk add --no-cache php82-fpm

# Copie le code de l'application depuis l'étape de construction
COPY --from=laravel_builder /var/www/html /var/www/html

# Copie le fichier de configuration Nginx
COPY .docker/nginx/default.conf /etc/nginx/conf.d/default.conf

# Copie le script de démarrage et le rend exécutable
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Définir les permissions
RUN chown -R nginx:nginx /var/www/html && chmod -R 775 /var/www/html/storage

# Expose le port HTTP
EXPOSE 80

# Commande de démarrage
ENTRYPOINT ["entrypoint.sh"]