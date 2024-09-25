
docker pull getmeili/meilisearch:v1.10 ;


docker run -it --rm \
    -p 7700:7700 \
    -e MEILI_ENV='development' \
    -e MEILI_NO_ANALYTICS=true \
    -v $(pwd)/meili_data:/meili_data \
    getmeili/meilisearch:v1.10
