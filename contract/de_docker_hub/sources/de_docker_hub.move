/// Module: de_docker_hub
module de_docker_hub::de_docker_hub {
    use sui::object::{Self, UID, ID};
    use sui::event::{Self, emit};
    use sui::tx_context::TxContext;
    use std::string::String;
    use std::string;
    use sui::display;
    use sui::package;
    // use 0x7e12d67a52106ddd5f26c6ff4fe740ba5dea7cfc138d5b1d33863ba9098aa6fe::blob_store;
    use blob_store::blob::Blob;


    // public struct WrappedBlob has key {
    //     id: UID,
    //     blob: Blob,
    // }

    // public fun wrap(blob: Blob, ctx: &mut TxContext): WrappedBlob {
    //     WrappedBlob { id: object::new(ctx), blob }
    // }

    // Struct to hold Docker Image metadata, including a reference to a blob
    public struct DockerImage has key, store {
        id: UID,
        name: String,
        url: String,
        tag: String,
        hash256: String,
        blob_id: String,
        creator: address,
    }
    public struct DE_DOCKER_HUB has drop {}


     fun init(otw: DE_DOCKER_HUB, ctx : &mut TxContext) {
        let sender = tx_context::sender(ctx);

        let keys = vector[
             string::utf8(b"name"),
             string::utf8(b"url"),
             string::utf8(b"tag"),
             string::utf8(b"hash256"),
             string::utf8(b"blob_id"),
             string::utf8(b"creator"),
        ];

        let values = vector[
             string::utf8(b"TokenId #{name}"),
             string::utf8(b"{url}"),
             string::utf8(b"{tag}"),
             string::utf8(b"{hash256}"),
             string::utf8(b"{blob_id}"),
             string::utf8(b"{creator}"),
        ];
        let publisher = package::claim(otw, ctx);
        let mut displ = display::new_with_fields<DockerImage>(&publisher, keys, values, ctx);

        display::update_version(&mut displ);
        transfer::public_transfer(publisher, sender);
        transfer::public_transfer(displ, sender);

    }

    // Event struct for image creation
    public struct ImageCreated has copy, drop, store {
        // id: ID,
        name: String,
        url: String,
        tag: String,
        creator: address,
        blob_id: String,
        hash256: String
    }

    // Function to initialize a new Docker Image entry
    public entry fun create_image(
        name: String,
        url: String,
        tag: String,
        hash256: String,
        blob_id: String,
        ctx: &mut TxContext
    ) {
        // Ensure the blob exists in the blob_store contract
        // assert!(blob_store::exists(blob_id), 0);
        let sender = tx_context::sender(ctx);

        let id = object::new(ctx);
        let image = DockerImage {
            id,
            name: name,
            url: url,
            tag: tag,
            hash256: hash256,
            blob_id,
            creator: sender,
        };

        // Emit the image creation event
        emit<ImageCreated>(
            ImageCreated {
                // id.,
                name,
                url,
                tag,
                creator: tx_context::sender(ctx),
                blob_id,
                hash256,
            }
        );
        transfer::public_transfer(image, sender)

    }

}
