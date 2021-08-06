FROM node:14-alpine AS builder

WORKDIR /opt/web
COPY . ./
RUN yarn

ENV PATH="./node_modules/.bin:$PATH"
ENV NODE_ENV="production"
RUN npm run build

FROM nginx:1.17-alpine

ENV PORT=80
ENV API_URL="http://pul-api:8080/api"

EXPOSE ${PORT}

RUN echo -e "https://mirrors.aliyun.com/alpine/latest-stable/main\nhttps://mirrors.aliyun.com/alpine/latest-stable/community" >/etc/apk/repositories \
    && apk --no-cache add curl gettext tini tzdata \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo "Asia/Shanghai" > /etc/timezone && apk del tzdata \
    && rm -rf /var/cache/apk/*

COPY --from=builder /opt/web/dist /usr/share/nginx/html/

COPY ./nginx.config /etc/nginx/nginx.template
RUN envsubst '\$PORT \$API_URL' < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf

ENTRYPOINT ["/sbin/tini", "-s", "--"]
CMD nginx -g 'daemon off;'
