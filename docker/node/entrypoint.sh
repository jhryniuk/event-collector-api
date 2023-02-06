#!/bin/bash

cd /var/www

function install {
  npm install --force
  npm audit fix
}

function run {
  npm run-script start
}

if [ ! -d /var/www/node_modules ]; then
  install
fi

run