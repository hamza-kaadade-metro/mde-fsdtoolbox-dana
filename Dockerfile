FROM node:lts-alpine

WORKDIR /application
#Change timezone 

RUN apk add --update tzdata 

ENV TZ=Europe/Berlin 

COPY . .

RUN npm install --verbose 
RUN npm run build

CMD ["npm","start"]