FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8000
EXPOSE 5555
CMD ["npm", "run", "start:prod"]