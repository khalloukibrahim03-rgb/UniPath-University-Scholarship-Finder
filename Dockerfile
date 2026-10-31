FROM node:22-bookworm-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
ENV NODE_ENV=production
ENV PORT=8080
ENV HOSTNAME=0.0.0.0

RUN npm run build

EXPOSE 8080

CMD ["sh", "-c", "npm run start -- --hostname 0.0.0.0 --port ${PORT:-8080}"]
