# Stage 1 - the build process
FROM node:18.12-buster as build-deps
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm install --force
COPY . ./
RUN npm run build --production

# Stage 2 - the production environment
FROM nginx:1.15.8-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
COPY resources/config/nginx.conf /etc/nginx/conf.d/default.conf

# Run sed command to remove defer="defer" attribute
RUN sed -i 's/defer="defer"//g' /usr/share/nginx/html/index.html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
