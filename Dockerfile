FROM node:18-alpine3.17

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 8081

CMD ["node", "dist/server.js"]