### Stage 1: Build ###

FROM gmathieu/node-browsers:3.0.0 AS compile-image


# Create app directory
WORKDIR /usr/src/app

COPY ./package*.json ./
RUN npm install

ENV PATH="./node_modules/.bin:$PATH" 

COPY . .
RUN npm run build:prod



### Stage 2: Run ###

# FROM nginx
# COPY ./nginx.conf /etc/nginx/nginx.conf
# COPY --from=compile-image ./dist/expert-collective/browser /usr/share/nginx/html/
# EXPOSE 80
