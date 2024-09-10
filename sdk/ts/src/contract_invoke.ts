import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Transaction,Inputs } from '@mysten/sui/transactions';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { decodeSuiPrivateKey, encodeSuiPrivateKey } from '@mysten/sui/cryptography';

import { bcs } from '@mysten/bcs';

// use getFullnodeUrl to define Devnet RPC location
const rpcUrl = getFullnodeUrl('testnet');

// create a client connected to devnet
const client = new SuiClient({ url: rpcUrl });

const pk =  decodeSuiPrivateKey("suiprivkey1qpfakvrud20un3rxdmpa3rlel8ah3weptfsc42eywnlvxk75kdraxw8u8xe");
const keypair = Ed25519Keypair.fromSecretKey(pk.secretKey);


async function createImage() {
    const tx = new Transaction();
    // let objref = Inputs.ObjectRef({ digest, objectId, version })
    tx.moveCall({
        target: '0x4c23a401c0419df34107bf8a2c96abc74ec0420a9d57256c3dfcd219d5e2ab24::de_docker_hub::create_image',
        arguments: [
            // using vector and option methods
            // tx.pure.vector('u8', [1, 2, 3]),
            // tx.pure.option('u8', 1),
            // tx.pure.option('u8', null),

            tx.pure.string("docker.io/yagnrui/base:alpine-glibc"),
            tx.pure.string("docker image alpine with glibc"),
            tx.pure.string("8963899b0f215618b88295917c0914195fcb33ee0f953c96f4f59f6c631cc785"),
            // tx.pure(bcs.u256().serialize('31047962936875863328318480636459205984119665894487819760892210387509083871069')),

            // tx.pure.address('0xe3d875663f05fd35d99fb79af13e92cf55abc720e6bb58b09fdcaae6b246523f'),
            // tx.pure.address('0xe3d875663f05fd35d99fb79af13e92cf55abc720e6bb58b09fdcaae6b246523f'),
            tx.object("0xe3d875663f05fd35d99fb79af13e92cf55abc720e6bb58b09fdcaae6b246523f"),
            // tx.objectRef(
            //         {
            //             digest:"Bvn3RZdM9cCnjLPxX423s2FuPdNfcqfgXE8yfLyA6AAW",
            //             objectId: "0xe3d875663f05fd35d99fb79af13e92cf55abc720e6bb58b09fdcaae6b246523f",
            //             version: 132061373
            //         }
            // )
            // Using bcs.serialize
            // tx.pure(bcs.vector(bcs.U8).serialize([1, 2, 3])),
            // tx.pure(bcs.option(bcs.U8).serialize(1)),
            // tx.pure(bcs.option(bcs.U8).serialize(null)),
            // tx.pure(bcs.vector(bcs.option(bcs.U8)).serialize([1, null, 2])),
        ],
    });
    tx.setGasBudget(10000000) ;

    let resp = await client.signAndExecuteTransaction({ signer: keypair, transaction: tx,
        options:{
            showEffects:true,
            showBalanceChanges:true,
            showEvents:true
        }
    });

    // const committeeInfo = await client.call('suix_getCommitteeInfo', []);
    console.log(resp);
}

 createImage();



