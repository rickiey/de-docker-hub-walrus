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

    const suipriv = process.env.SUI_PRIV_KEY;
    if (suipriv == undefined) {
        console.log("please configure sui private key");
        return
    }

    const pk =  decodeSuiPrivateKey(suipriv);
    const keypair = Ed25519Keypair.fromSecretKey(pk.secretKey);
    console.log(keypair.toSuiAddress());

    const tx = new Transaction();
    tx.moveCall({
        target: 'dd6fc2818ec29b9506dcd3e49952b28ce89f44f1ddfc8450680346f22f3e78ea::de_docker_hub::create_image',
        arguments: [
            tx.pure.string("alpine:glibc"),
            tx.pure.string("docker image alpine with glibc"),
            tx.pure.string("sha256:8963899b0f215618b88295917c0914195fcb33ee0f953c96f4f59f6c631cc785"),
            tx.object("0xe3d875663f05fd35d99fb79af13e92cf55abc720e6bb58b09fdcaae6b246523f"),

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



