import * as fs from 'fs';
import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
dotenv.config();

const filePath = '<replace your file>';

async function uploadFile(filePath: string) {

  // AGGREGATOR=https://aggregator-devnet.walrus.space
  // PUBLISHER=https://publisher-devnet.walrus.space
  const publisher = process.env.PUBLISHER ;
  const aggregator = process.env.AGGREGATOR ;

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    // push url
    let url = publisher+"/v1/store"

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: fileContent,
    });

    if (response.ok) {

      let r = await response.json() ;
      console.log(r);
    } else {
      console.error(`文件上传失败: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error(`发生错误: ${error}`);
  }
}

uploadFile(filePath );

/*

{
  newlyCreated: {
    blobObject: {
      id: '0x30ed1ccfd86e16a05aef10b32082cec572b966e8a265ff0a143b6e2993b179f9',
      storedEpoch: 0,
      blobId: 'aiALAklNBMMWwPTLkCsFYtoije1UnA2qt_UF0KJmS_Y',
      size: 2103,
      erasureCodeType: 'RedStuff',
      certifiedEpoch: 0,
      storage: [Object]
    },
    encodedSize: 65023000,
    cost: 3175000
  }
}                                                                                                                                                                   10.84s

{
  alreadyCertified: {
    blobId: 'dhUinwxXTiLvFI9jzBgHlpE8NE0a031UvM5A0L2MG-Y',
    event: {
      txDigest: '77yRS5xZoBkoKuy4B1deSjfhwrE5aqRQZfd9ShZwjSRC',
      eventSeq: '0'
    },
    endEpoch: 1
  }
}

*/