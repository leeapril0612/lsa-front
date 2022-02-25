FROM node:lts-alpine as build-stage
WORKDIR /app
ADD . .
RUN npm i
RUN npm run build

# production stage
FROM nginx:alpine as production-stage
COPY  ./nginx.conf /etc/nginx/conf.d/default.conf
COPY  ./cert/localhost.dev.crt /etc/ssl/
COPY  ./cert/localhost.dev.key /etc/ssl/

COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]