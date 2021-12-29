FROM node:alpine AS builder

WORKDIR /srv
COPY package*.json /srv/
RUN npm ci
COPY . /srv/
RUN npm run build
RUN npm ci --production

FROM node:alpine
WORKDIR /srv
COPY --from=builder /srv/node_modules /srv/node_modules
COPY --from=builder /srv/dist /srv/
COPY --from=builder /srv/ormconfig.js /srv/ormconfig.js
COPY --from=builder /srv/.env /srv/.env
CMD node -r ts-node/register ./node_modules/typeorm/cli.js migration:run && node main.js