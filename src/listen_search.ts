import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';

import { MeiliSearch } from 'meilisearch';
import { bcs } from '@mysten/bcs';

const suiClient = new SuiClient({
	url: getFullnodeUrl('testnet'),
});

// 配置 MeiliSearch 客户端
const client = new MeiliSearch({
  host: 'http://127.0.0.1:7700', // 替换为你的 MeiliSearch 主机和端口
  apiKey: '48Rm0GEcgcmVd02fqcHWmkBhD3xBbTg013sA1VXnfbI', // 替换为你的 MeiliSearch API key
});



// 监听 Sui 事件并插入 MeiliSearch
async function listenForSuiEvent(eventName: string) {


  let unsubscribe = await suiClient.subscribeEvent({
	filter: { MoveEventType: eventName },
	onMessage: (event) => {
		console.log('subscribeEvent', JSON.stringify(event, null, 2));
        },
    });


}

// 示例用法
async function main() {

  await insertDocument()

  await listenForSuiEvent('0xdd6fc2818ec29b9506dcd3e49952b28ce89f44f1ddfc8450680346f22f3e78ea::de_docker_hub::ImageCreated',);
}

async function insertDocument() {
    // let cres = await client.createIndex('images');
    // console.log(cres)

    const index = client.index('images')
    let u256 = bcs.u256().serialize('31047962936875863328318480636459205984119665894487819760892210387509083871069').toBytes();
    let b64url_u256 = Buffer.from(u256)
    let blob_id_b64 = b64url_u256.toString("base64url")
    // 插入文档到 MeiliSearch
    try {
        let document= [{
            image_tag:"alpine:glibc",
            desc:"docker image alpine with glib",
            size:21107200,
            sha256:"sha256:8963899b0f215618b88295917c0914195fcb33ee0f953c96f4f59f6c631cc785",
            blob_id:blob_id_b64,
        }]
        await index.addDocuments(document);
      console.log('Document added to MeiliSearch:', document);
    } catch (e) {
      console.error('Error adding document to MeiliSearch:', e);
    }
}

main();