FROM php:8.4-fpm

RUN apt-get update && apt-get install -y \
    libzip-dev \
    unzip \
    git \
    curl \
    && docker-php-ext-install pdo pdo_mysql mysqli zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer


WORKDIR /var/www

RUN chown -R www-data:www-data /var/www

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=80"]