# Grupo Mbewu — compilação de produção (React/Vite)
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
# O projecto ainda não possui package-lock.json: instalar com npm install.
# Quando existir um lockfile, substituir por npm ci para compilações reprodutíveis.
RUN npm install --no-audit --no-fund

COPY . .
RUN npm run build

# Servir apenas os ficheiros estáticos compilados; nunca o servidor de desenvolvimento.
FROM nginx:stable-alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/ /usr/share/nginx/html/

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/healthz || exit 1
