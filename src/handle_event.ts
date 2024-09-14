import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';

import { MeiliSearch } from 'meilisearch';
import { bcs } from '@mysten/bcs';

const suiClient = new SuiClient({
	url: getFullnodeUrl('testnet'),
});

// 配置 MeiliSearch 客户端
const client = new MeiliSearch({
  host: 'http://127.0.0.1:7700', // replace your MeiliSearch host and port
  apiKey: 'ztRNp4FS8YaoMsmRwzGy28Y97o9Ry10aJqk-NAvSpE0', // repalce your MeiliSearch API key
});


// query Sui event and insert into MeiliSearch
async function listenForSuiEvent(eventName: string) {


  await client.createIndex('images', {primaryKey:"blob_id"});

  const index = client.index('images')

  let unsubscribe = await suiClient.queryEvents({
    query: { MoveEventType: eventName },
    limit: 99999,
    order: 'descending'
  })


  unsubscribe.data.forEach(async event =>  {
    let jres = JSON.stringify(event.parsedJson)
    let evt = JSON.parse(jres)
    console.log('subscribeEvent',event.id.txDigest, event.timestampMs, evt);

    let u256 = bcs.u256().serialize(evt.image_blob_id).toBytes();
    let b64url_u256 = Buffer.from(u256)
    let blob_id_b64 = b64url_u256.toString("base64url")

    try {
      let document= [{
          id_tx_digest: event.id.txDigest,
          image_tag:evt.image_tag,
          desc:evt.description,
          size:Number(evt.size),
          sha256: evt.hash256 ,
          blob_id:blob_id_b64,
      }]
      let res= await index.addDocuments(document);
    console.log('Document added to MeiliSearch:', document,res);
  } catch (e) {
    console.error('Error adding document to MeiliSearch:', e);
  }

  })

}

async function main() {

  await listenForSuiEvent('0xdd6fc2818ec29b9506dcd3e49952b28ce89f44f1ddfc8450680346f22f3e78ea::de_docker_hub::ImageCreated',);
}


main();