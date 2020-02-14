FROM node:12 as base

WORKDIR /usr/src/app
COPY ./ ./
RUN npm ci
RUN npm run build

FROM nginx:stable-alpine as production
LABEL version="1.0"

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

COPY --from=base /usr/src/app/dist/mocks-server-ui/ .