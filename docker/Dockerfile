# Build
FROM node:21.6.2-alpine as build-production
ARG TZ=Europe/Moscow

WORKDIR /app

COPY package*.json ./
RUN npm install --silent

COPY ./ ./
RUN npm run build

# NGINX
FROM nginx:stable-alpine as nginx

COPY --from=build-production /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf

COPY docker/nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
