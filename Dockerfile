# syntax=docker/dockerfile:1
FROM node:8-alpine
# RUN apk add --no-cache python2 g++ make
WORKDIR  /var/website/backend/
COPY . .
RUN npm install -f
RUN npm run build
CMD ["node", "build/index.js"]
EXPOSE 9000