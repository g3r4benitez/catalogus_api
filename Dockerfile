# Dockerfile
FROM node:20-alpine
# o node:18-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --omit=dev   
# ó npm install --prod
COPY . .
CMD ["node", "dist/main"]