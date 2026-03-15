# Stage 1: build the React app
FROM node:trixie-slim AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm run build


# Stage 2: serve the built app without nginx
FROM node:trixie-slim

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/build ./build

EXPOSE 5050

CMD ["serve", "-s", "build", "-l", "5050"]
