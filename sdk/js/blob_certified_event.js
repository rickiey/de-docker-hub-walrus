const { JsonRpcProvider } = require('@mysten/sui.js');

async function main() {
    // Connect to SUI network
    const provider = new JsonRpcProvider();

    // Event filter to listen for BlobCertified events
    const eventFilter = {
        MoveEvent: {
            package: '0x7e12d67a52106ddd5f26c6ff4fe740ba5dea7cfc138d5b1d33863ba9098aa6fe',
            module: 'blob_store',
            event: 'BlobCertified'
        }
    };

    // Listen to events
    provider.subscribeEvent(eventFilter, (event) => {
        console.log('BlobCertified Event:', event);
    });

    console.log('Listening for BlobCertified events...');
}

main().catch(console.error);
