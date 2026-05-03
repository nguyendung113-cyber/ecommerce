FROM php:8.4-fpm-alpine

# Cài đặt các extension cần thiết cho Laravel & MySQL
RUN apk add --no-cache \
    libzip-dev \
    zip \
    unzip \
    git \
    curl \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql zip gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Phân quyền cho Laravel (build time)
RUN chown -R www-data:www-data /var/www

# Tạo entrypoint script để fix quyền lúc runtime
RUN printf '#!/bin/sh\nchmod -R 775 /var/www/storage /var/www/bootstrap/cache\nchown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache\nexec "$@"' > /usr/local/bin/entrypoint.sh \
    && chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

EXPOSE 9000
CMD ["php-fpm"]