import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Transaction,Inputs } from '@mysten/sui/transactions';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { decodeSuiPrivateKey, encodeSuiPrivateKey } from '@mysten/sui/cryptography';

import { bcs } from '@mysten/bcs';

import * as dotenv from 'dotenv';
dotenv.config();

// use getFullnodeUrl to define Devnet RPC location
const rpcUrl = getFullnodeUrl('testnet');

// create a client connected to devnet
const client = new SuiClient({ url: rpcUrl });

async function createImage() {
    const move_package = "dd6fc2818ec29b9506dcd3e49952b28ce89f44f1ddfc8450680346f22f3e78ea"

    const suipriv = process.env.SUI_PRIV_KEY;
    if (suipriv == undefined) {
        console.log("please configure sui private key");
        return
    }

    const pk =  decodeSuiPrivateKey(suipriv);
    const keypair = Ed25519Keypair.fromSecretKey(pk.secretKey);
    console.log(keypair.toSuiAddress());

    const image_tag = "ubuntu:2404"
    const image_desc = "ubuntu:2404"
    const image_hash256 = "sha256:edbfe74c41f8a3501ce542e137cf28ea04dd03e6df8c9d66519b6ad761c2598a"
    // it's not blob-id
    const blob_object_uid = "0x4dd3f2a3d0b192b758f77ca850cf0df36ed2c0192b338bbc15984c7da69ec9b1"

    const tx = new Transaction();
    tx.moveCall({
        target: move_package + '::de_docker_hub::create_image',
        arguments: [
            tx.pure.string(image_tag),
            tx.pure.string(image_desc),
            tx.pure.string(image_hash256),
            tx.object(blob_object_uid),

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

    console.log(resp);
}

 createImage();



