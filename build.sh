source .env

IMAGE_NAME="pul:${VERSION}"

rm -rf ./dist

docker build -t "${IMAGE_NAME}" .
