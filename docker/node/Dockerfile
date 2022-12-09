FROM node:18.10

COPY docker/node/entrypoint.sh /entrypoint.sh

RUN npm install -g npm@9.1.2 \
    && npm install -g @angular/cli

USER node

WORKDIR /var/www

EXPOSE 4200

ENTRYPOINT ["/bin/bash", "/entrypoint.sh"]
