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

> sui client call --gas-budget 10000000   --package 259870e858d5b2aa26b77e6cbeaded1bab55ed9e4be173f4e84aba7ee313ecc9 --module de_docker_hub  --function create_image --args alpine docker.io/yagnrui/base alpine-glibc 8963899b0f215618b88295917c0914195fcb33ee0f953c96f4f59f6c631cc785 XZePPki1tdlXq-aSqL_VY3ORv5QmRSHC_rHx6jaGpEQ