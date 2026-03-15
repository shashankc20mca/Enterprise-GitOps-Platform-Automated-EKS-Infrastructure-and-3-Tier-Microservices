# Stage 1: install dependencies
FROM node:trixie-slim AS deps

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --omit=dev


# Stage 2: runtime image
FROM node:trixie-slim

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

EXPOSE 8383

CMD ["npm", "start"]
