FROM node:18-alpine

WORKDIR /app

# Add build tools if using native modules like bcrypt
RUN apk add --no-cache make gcc g++ python3

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","start"]
