FROM node:12 as base

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:stable-alpine as production

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

COPY --from=base /usr/src/app/dist/mocks-server-ui/ .

EXPOSE 80 3003