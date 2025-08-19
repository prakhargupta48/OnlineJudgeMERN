FROM node:22-alpine
WORKDIR /app 


RUN apk update && apk add --no-cache g++ python3 py3-pip openjdk21-jdk

RUN mkdir -p /app/CC/codes /app/CC/outputs /app/CC/inputs /app/uploads /app/CC/ExpectedOutputs

COPY package*.json ./
RUN npm install

COPY . .

RUN chown -R node:node /app && \
    chmod -R 755 /app/CC/codes && \
    chmod -R 755 /app/CC/outputs && \
    chmod -R 755 /app/CC/inputs && \
    chmod -R 755 /app/uploads && \
    chmod -R 755 /app/CC/ExpectedOutputs

USER node

EXPOSE 5000


CMD [ "node", "index.js" ]

# WORKDIR => docker => /app
# local system => local backend directory