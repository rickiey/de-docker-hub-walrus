/// Module: de_docker_hub
module hub::de_docker_hub {
    // use sui::object::{Self, UID};
    use sui::event::{emit};
    // use sui::tx_context::TxContext;
    use std::string::{Self,String};
    use sui::display;
    use sui::package;
    // use 0x7e12d67a52106ddd5f26c6ff4fe740ba5dea7cfc138d5b1d33863ba9098aa6fe::blob_store;
    use blob_store::blob::{Blob,blob_id,size};

    // Struct to hold Docker Image metadata, including a reference to a blob
    public struct DockerImage has key, store {
        id: UID,
        image_tag: String,
        description: String,
        hash256: String,
        image_blob_id: u256,
        size: u64,
        creator: address,
    }
    public struct DE_DOCKER_HUB has drop {}


     fun init(otw: DE_DOCKER_HUB, ctx : &mut TxContext) {
        let sender = tx_context::sender(ctx);

        let keys = vector[
             string::utf8(b"image_tag"),
             string::utf8(b"description"),
             string::utf8(b"hash256"),
             string::utf8(b"image_blob_id"),
             string::utf8(b"creator"),
        ];

        let values = vector[
             string::utf8(b"{image_tag}"),
             string::utf8(b"{description}"),
             string::utf8(b"{hash256}"),
             string::utf8(b"{image_blob_id}"),
             string::utf8(b"{creator}"),
        ];
        let publisher = package::claim(otw, ctx);
        let mut displ = display::new_with_fields<DockerImage>(&publisher, keys, values, ctx);

        display::update_version(&mut displ);
        transfer::public_transfer(publisher, sender);
        transfer::public_transfer(displ, sender);

    }

    // Event struct for image creation
    public struct ImageCreated has copy, drop {
        // id: ID,
        image_tag: String,
        description: String,
        creator: address,
        image_blob_id: u256,
        hash256: String,
        size:u64,
    }

    // Function to initialize a new Docker Image entry
    public entry fun create_image(
        image_tag: String,
        description: String,
        hash256: String,
        // image_blob_id: u256,
        blob: &Blob,
        ctx: &mut TxContext
    ) {

        let sender = tx_context::sender(ctx);

        let id = object::new(ctx);
        let bid = blob_id(blob);
        let size = size(blob);

        let image = DockerImage {
            id,
            image_tag: image_tag,
            description: description,
            hash256: hash256,
            image_blob_id:bid,
            creator: sender,
            size: size,
        };

        // Emit the image creation event
        emit<ImageCreated>(
            ImageCreated {
                image_tag,
                description,
                image_blob_id: blob_id(blob),
                hash256,
                creator: sender,
                size:size,
            }
        );
        transfer::public_transfer(image, sender)
    }


}
