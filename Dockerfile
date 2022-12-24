FROM node:14.16.1-alpine as builder

WORKDIR /work

COPY . /work/

RUN npm install --no-progress

RUN npm run lint

RUN npm run build

FROM node:14.16.1-alpine

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm install --production --no-progress --cache /tmp/empty-cache && rm -rf /tmp/empty-cache
COPY --from=build-stage /work/dist ./dist

# PID 1 Problem を回避する用
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

USER node

EXPOSE 3000

ENV NODE_ENV prod

CMD ["node", "dist/src/main"]