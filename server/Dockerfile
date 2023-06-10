# This is used to build the API image
FROM node:16.15.0
WORKDIR /usr/code
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "run", "start"]