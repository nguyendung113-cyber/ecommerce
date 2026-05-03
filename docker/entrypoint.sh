#!/bin/sh

# Fix permissions for Laravel
chmod -R 775 /var/www/storage /var/www/bootstrap/cache
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Execute the original CMD
exec "$@"
