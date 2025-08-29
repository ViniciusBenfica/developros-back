FROM node:22-alpine AS build
WORKDIR /app

RUN npm install -g pnpm
COPY package*.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm exec prisma generate
RUN pnpm run build

FROM node:22-alpine AS runtime
WORKDIR /app

RUN npm install -g pnpm
COPY package*.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

ENV NODE_ENV=production
EXPOSE 4000

CMD ["pnpm", "start"]
