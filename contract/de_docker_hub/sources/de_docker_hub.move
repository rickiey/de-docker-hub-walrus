/// Module: de_docker_hub
module de_docker_hub::de_docker_hub {
   use sui::object::{Self, UID};
    use sui::event::{Self, emit};
    use sui::tx_context::TxContext;
    use 0x7e12d67a52106ddd5f26c6ff4fe740ba5dea7cfc138d5b1d33863ba9098aa6fe::blob_store;

    // Struct to hold Docker Image metadata, including a reference to a blob
    struct DockerImage has key, store {
        id: UID,
        name: vector<u8>,
        version: vector<u8>,
        tag: vector<u8>,
        hash: vector<u8>,
        blob_id: UID,
        creator: address,
    }

    // Event struct for image creation
    struct ImageCreated has copy, drop, store {
        id: UID,
        name: vector<u8>,
        version: vector<u8>,
        tag: vector<u8>,
        creator: address,
        blob_id: UID,
    }

    // Function to initialize a new Docker Image entry
    public entry fun create_image(
        name: vector<u8>,
        version: vector<u8>,
        tag: vector<u8>,
        hash: vector<u8>,
        blob_id: UID,
        ctx: &mut TxContext
    ): DockerImage {
        // Ensure the blob exists in the blob_store contract
        assert!(blob_store::exists(blob_id), 0);

        let id = object::new(ctx);
        let image = DockerImage {
            id,
            name: name.clone(),
            version: version.clone(),
            tag: tag.clone(),
            hash,
            blob_id,
            creator: tx_context::sender(ctx),
        };

        // Emit the image creation event
        emit<ImageCreated>(
            ImageCreated {
                id,
                name,
                version,
                tag,
                creator: tx_context::sender(ctx),
                blob_id,
            },
            ctx,
        );

        image
    }

    // Function to update the Docker Image metadata
    public entry fun update_image(
        image: &mut DockerImage,
        new_version: vector<u8>,
        new_tag: vector<u8>,
        new_hash: vector<u8>,
        new_blob_id: UID,
        ctx: &mut TxContext
    ) {
        // Ensure the new blob exists in the blob_store contract
        assert!(blob_store::exists(new_blob_id), 0);

        image.version = new_version;
        image.tag = new_tag;
        image.hash = new_hash;
        image.blob_id = new_blob_id;
    }
}
