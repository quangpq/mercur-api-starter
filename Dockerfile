FROM node:lts

RUN corepack enable && corepack prepare yarn@4.2.2 --activate

WORKDIR /app
RUN mkdir /app/mercur
COPY . /app/mercur

WORKDIR /app/mercur
RUN yarn install
RUN yarn build

CMD ["yarn", "start"]
