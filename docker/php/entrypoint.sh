#!/bin/bash

function install {
  echo 'Run installation'
  cd /var/www/html/api
  composer install
  sleep 20s
  bin/console doctrine:schema:update --force
  bin/console doc:fix:load --purge-with-truncate -q
  bin/console lexik:jwt:generate-keypair
  echo 'Installation successful'
}

function run {
  php-fpm
}

if [ ! -d /var/www/html/api/vendor ]; then
  install
fi

run

