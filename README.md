# de-dokcer-hub

* TIPS: Currently only in the development and testing stage

## Description

Build a decenterlized docker hub, store docker images in Walrus

## Usage

TODO

+ upload image

> docker save alpine-base:glibc -o alpine-base:glibc.tar

* update src/upload_to_walrus.ts  filePath

> ts-node src/upload_to_walrus.ts

* update src/creat_image.ts     update image info

> ts-node src/creat_image.ts

* sui CLI

> sui client call --gas-budget 10000000   --package dd6fc2818ec29b9506dcd3e49952b28ce89f44f1ddfc8450680346f22f3e78ea --module de_docker_hub  --function create_image --args alpine:glibc "docker image alpine with glibc"  "sha256:8963899b0f215618b88295917c0914195fcb33ee0f953c96f4f59f6c631cc785"  0xe3d875663f05fd35d99fb79af13e92cf55abc720e6bb58b09fdcaae6b246523f
