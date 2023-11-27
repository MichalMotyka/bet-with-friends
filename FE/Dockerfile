FROM node:13.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Dockerfile

# Etap budowy
FROM node:14 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etap produkcji
FROM nginx:1.21.3-alpine

# Kopiujemy pliki z etapu budowy do katalogu serwera Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Dodajemy plik konfiguracyjny do obsługi routingu w trybie SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nasłuchuj na porcie 80
EXPOSE 80

# Uruchamiamy serwer Nginx
CMD ["nginx", "-g", "daemon off;"]