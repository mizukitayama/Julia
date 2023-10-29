FROM node:18.18.2-alpine3.17

WORKDIR /app
COPY [ "./frontend/package.json", "./frontend/package-lock.json", "./" ]

RUN npm ci

COPY . .

EXPOSE 8080

ENTRYPOINT [ "npm", "start" ]
