FROM php:8.1-fpm

ARG USERID

RUN usermod -u $USERID www-data && \
    mkdir -p /var/www && \
    chown -R www-data:www-data /var/www && \
    chmod 777 -R /var/www

RUN apt-get -qq update --fix-missing \
    && apt-get -q install -y \
        zlib1g-dev \
        libicu-dev \
        g++ \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libmcrypt-dev \
        libxml2-dev \
        libxslt1-dev \
        libc-client-dev \
        libzip-dev \
        libkrb5-dev \
        cloc \
        zip \
        unzip \
        git-core \
    && docker-php-ext-install zip

COPY docker/php/docker-php-pecl-install /usr/local/bin/

COPY --from=composer:latest /usr/bin/composer /usr/sbin/composer

RUN docker-php-ext-configure imap --with-imap-ssl --with-kerberos \
    && docker-php-ext-install iconv intl mysqli gd pdo_mysql xsl opcache imap bcmath soap

#RUN docker-php-pecl-install apcu \
#    && docker-php-ext-enable apcu

RUN apt-get install -y libmagickwand-6.q16-dev --no-install-recommends \
    && ln -s /usr/lib/x86_64-linux-gnu/ImageMagick-6.8.9/bin-Q16/MagickWand-config /usr/bin \
    && pecl install imagick \
    && echo "extension=imagick.so" > /usr/local/etc/php/conf.d/ext-imagick.ini \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-pecl-install xdebug \
    && docker-php-ext-enable xdebug

COPY docker/php/php.ini /usr/local/etc/php/
COPY docker/php/xdebug.ini /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
COPY docker/php/entrypoint.sh /entrypoint.sh

VOLUME /var/www
WORKDIR /var/www/html
USER www-data

ENTRYPOINT ["/bin/bash", "/entrypoint.sh"]