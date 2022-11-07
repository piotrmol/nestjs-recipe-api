#COMMON
ARG IMAGE=node:16.13-alpine
FROM $IMAGE as builder

WORKDIR /app
COPY . .
RUN npm i

#DEVELOPMENT
FROM builder as dev 
CMD [""]



