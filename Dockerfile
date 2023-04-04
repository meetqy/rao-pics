FROM node:16 
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --prod
COPY . .

RUN pnpm build

EXPOSE 9600
CMD [ "node", "docker/index.mjs" ]
