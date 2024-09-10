# de-dokcer-hub

* TIPS: Currently only in the development and testing stage

## Description

Build a decenterlized docker hub, store docker images in Walrus

## Usage

TODO

+ upload image

> docker save alpine-base:glibc -o alpine-base:glibc.tar
> walrus store ./alpine-base:glibc.tar

+ testnet

    image_tag: String,
        description: String,
        hash256: String,
        image_blob_id: u256,

> sui client call --gas-budget 10000000   --package 0x66537cc32afe49bdeb6eb0b96cfe2a1c9014c1a4bc04dde20a1bc5a936be6a6d --module de_docker_hub  --function create_image --args docker.io/yagnrui/base:alpine-glibc "docker image alpine with glibc"  8963899b0f215618b88295917c0914195fcb33ee0f953c96f4f59f6c631cc785  0xe3d875663f05fd35d99fb79af13e92cf55abc720e6bb58b09fdcaae6b246523f