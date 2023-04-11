FROM node:alpine
RUN npm i -g pnpm
WORKDIR /app

COPY . .
RUN npm pkg delete scripts.prepare 
RUN pnpm install --frozen-lockfile --prod

EXPOSE 9600
CMD [ "node", "docker/index.mjs" ]
