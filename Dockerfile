FROM node:19-alpine3.15 as dev-deps
WORKDIR /app
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --frozen-lockfile



FROM node:19-alpine3.15 as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN yarn build



FROM nginx:1.21 as production
EXPOSE 80

COPY --from=builder /app/dist /usr/share/nginx/html
# COPY assets/  /usr/share/nginx/html/assets
COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
