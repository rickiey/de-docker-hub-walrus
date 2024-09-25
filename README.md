# de-dokcer-hub

* TIPS: Currently only in the development and testing stage

## Description

Build a decenterlized docker hub, store docker images in Walrus

## Usage

1. save docker images

> docker save ubuntu:24.04 -o ubuntu-2404.tar

 remember sha256

>docker inspect ubuntu:24.04|jq '.[0].Id'
 "sha256:edbfe74c41f8a3501ce542e137cf28ea04dd03e6df8c9d66519b6ad761c2598a"

2. upload image to walrus

use cli

> walrus store ubuntu-2404.tar

```bash
Success: Blob stored successfully.
Blob ID: XZePPki1tdlXq.....C_rHx6jaGpEQ.
Sui object ID: 0x7a719ce488757.....48dd3fd8982bff.
```

or use script ( pre-intall `pnpm i`)

> ts-node src/upload_to_walrus.ts

3. create images

use script
update src/creat_image.ts     update image info

> ts-node src/creat_image.ts

or use sui CLI

```BASH
  sui client call \
    --gas-budget 10000000 \
    --package 0xdd6fc2818ec29b9506dcd3e49952b28ce89f44f1ddfc8450680346f22f3e78ea \
    --module de_docker_hub  \
    --function create_image \
    --args "<tag>" "<description>" "<iamges-sha256>" "object-id"
```

example:

```bash
 sui client call \
    --gas-budget 10000000 \
    --package 0xdd6fc2818ec29b9506dcd3e49952b28ce89f44f1ddfc8450680346f22f3e78ea \
    --module de_docker_hub  \
    --function create_image \
    --args "ubuntu:24.04"    \
    "ubuntu 24.04 latest"   \
    "sha256:edbfe74c41f8a3501ce542e137cf28ea04dd03e6df8c9d66519b6ad761c2598a"  \
    0x7a719ce488757624a3ce6f97751b9f3d5ce85a4a83250f52c248dd3fd8982bff
```

Wait a few minutes

## search (local meilisearch)

* run meilisearch in localhost (docker)

```sh
docker run -it --rm \
    -p 7700:7700 \
    -e MEILI_ENV='development' \
    -v $(pwd)/meili_data:/meili_data \
    getmeili/meilisearch:v1.10
```

* import the image indexes from sui event

`ts-node src/collect_event.ts.ts`
