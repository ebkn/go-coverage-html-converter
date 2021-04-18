FROM node:15.14.0-alpine

RUN apk update

WORKDIR /app

COPY tsconfig.json ./
COPY package*.json ./

RUN npm install

COPY src /app/src

RUN npm run build

CMD ["node", "dist/index.js", "--html", "/app/cover.html"]
