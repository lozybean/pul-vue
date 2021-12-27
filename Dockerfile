FROM node:14-alpine AS builder

WORKDIR /opt/web
COPY . ./

RUN yarn install
RUN yarn build

FROM nginx:1.17-alpine

ENV PORT=80
ENV API_URL="http://pul-api:8080/api"

EXPOSE ${PORT}

RUN echo -e "http://mirrors.ustc.edu.cn/alpine/latest-stable/main\nhttp://mirrors.ustc.edu.cn/alpine/latest-stable/community" >/etc/apk/repositories \
    && apk --no-cache add curl gettext tini tzdata --allow-untrusted \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo "Asia/Shanghai" > /etc/timezone && apk del tzdata \
    && rm -rf /var/cache/apk/*

COPY --from=builder /opt/web/dist /usr/share/nginx/html/

COPY ./nginx.config /etc/nginx/nginx.template
RUN envsubst '\$PORT \$API_URL' < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf

ENTRYPOINT ["/sbin/tini", "-s", "--"]
CMD nginx -g 'daemon off;'
