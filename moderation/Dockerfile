FROM node:18-alpine3.17

WORKDIR /app
COPY ./package.json ./
RUN npm install

COPY ./ ./

CMD ["npm", "start"]

# note - run-  docker run -p 4000(or any port2):4000(port in server file) image tag
# Now when you open this port2 on local, it redirects to port 4000 of container where the server is up.