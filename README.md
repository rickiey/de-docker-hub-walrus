# de-dokcer-hub

* TIPS: Currently only in the development and testing stage

## Description

Build a decenterlized docker hub, store docker images in Walrus

## Usage

+ upload image

> docker save alpine-base:glibc -o alpine-base:glibc.tar

* update src/upload_to_walrus.ts  filePath

> ts-node src/upload_to_walrus.ts

* update src/creat_image.ts     update image info

> ts-node src/creat_image.ts

* sui CLI

> sui client call --gas-budget 10000000   --package dd6fc2818ec29b9506dcd3e49952b28ce89f44f1ddfc8450680346f22f3e78ea --module de_docker_hub  --function create_image --args alpine:glibc "docker image alpine with glibc"  "sha256:8963899b0f2......cc785"  0xe3d875663f05fd.....623f

## search

* run meilisearch in localhost (docker)

```sh
docker run -it --rm \
    -p 7700:7700 \
    -e MEILI_MASTER_KEY='ztRNp4FS8YaoMsmRwzGy28Y97o9Ry10aJqk-NAvSpE0'\
    -e MEILI_ENV='development' \
    -v $(pwd)/meili_data:/meili_data \
    getmeili/meilisearch:v1.10
```

* import the image indexes from sui event

`ts-node src/handle_event.ts`

* You can search at <https://wuea98mxtzewdatthsgqpxtf7z2bb0c8pigoof3sx08gkg1s4.walrus.site/>