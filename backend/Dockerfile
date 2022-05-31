FROM node:17-alpine

RUN npm install -g nodemon

WORKDIR /back

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3069

CMD ["npm", "run", "start:dev"]