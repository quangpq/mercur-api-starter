FROM node:lts AS builder
ENV MEDUSA_ADMIN_BACKEND_URL=https://backend.mercur.madlogic.dev

RUN corepack enable && corepack prepare yarn@4.2.2 --activate

WORKDIR /app
RUN mkdir /app/mercur
COPY . /app/mercur

WORKDIR /app/mercur
RUN yarn install
RUN yarn build
RUN yarn build:admin

FROM nginx:alpine AS nginx

COPY ./docker/proxy.template /etc/nginx/templates/default.conf.template

# Copy app files
RUN mkdir -p /var/www/

COPY --from=builder /app/mercur/build/ /var/www/mercur/

EXPOSE 80

