FROM node:22

WORKDIR /miniloan

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "start"]

