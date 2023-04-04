FROM node:16 
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
WORKDIR /raopics

COPY docker .
RUN pnpm install

EXPOSE 9600
CMD [ "node", "index.mjs" ]
