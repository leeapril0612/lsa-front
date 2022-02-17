FROM node as build-stage
WORKDIR /app
ADD . .
RUN npm i
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY  ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]