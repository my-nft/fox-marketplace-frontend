# build environment
FROM node:18.12.1-alpine as build
WORKDIR /app
COPY . .
RUN npm install -g npm@9.1.3
RUN npm install 
ARG ENVIRONMENT=.env.production
RUN npm run build -f ${ENVIRONMENT}

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /app
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
