
docker pull getmeili/meilisearch:v1.10 ;


docker run -it --rm \
    -p 7700:7700 \
    -e MEILI_MASTER_KEY='ztRNp4FS8YaoMsmRwzGy28Y97o9Ry10aJqk-NAvSpE0'\
    -e MEILI_ENV='development' \
    -v $(pwd)/meili_data:/meili_data \
    getmeili/meilisearch:v1.10