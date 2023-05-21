FROM node:14-alpine

WORKDIR /app2

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
