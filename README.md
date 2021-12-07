# pul-vue

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## 部署方法

依赖：

1. 本地安装 docker

部署方法：

1. 修改代码后，运行`build.sh`，会自动构建 docker 镜像
2. 将镜像保存到本地文件: `docker save pul:{version} -o pul_{version}.tar.gz`，将其中的 version 替换为实际版本，版本和.env 中设置的一致
3. 将镜像文件上传到服务器
4. 在服务器载入镜像：`sudo docker load -i pul_{version}.tar.gz`
5. 修改`/home/songtao/Upload/pul/docker-compose.yaml`中第 83 行的 pul 镜像版本
6. 进入`/home/songtao/Upload/pul`目录，并重启服务：`sudo docker-compose restart`
