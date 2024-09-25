import { bcs } from '@mysten/bcs';

// Integers
const u8 = bcs.u8().serialize(100).toBytes();
const u64 = bcs.u64().serialize(1000000n).toBytes();
const u128 = bcs.u128().serialize('100000010000001000000').toBytes();
const u256 = bcs.u256().serialize('68341495783896991496609676331795013357979380897398453867313313283219970966262').toBytes();
const b64url_u256 = Buffer.from(u256)
console.log(b64url_u256.toString("base64url"))
// // Other types
// const str = bcs.string().serialize('this is an ascii string').toBytes();
// // const hex = bcs.hex().serialize('C0FFEE').toBytes();
// // const bytes = bcs.bytes(4).serialize([1, 2, 3, 4]).toBytes();

// // Parsing data back into original types
// let s =  "XZePPki1tdlXq-aSqL_VY3ORv5QmRSHC_rHx6jaGpEQ"

// const parsedU8 = bcs.u8().parse(u8);

// function base64ToUint8Array(base64: string): Uint8Array {
//     const binaryString = atob(base64);
//     const len = binaryString.length;
//     const bytes = new Uint8Array(len);

//     for (let i = 0; i < len; i++) {
//         bytes[i] = binaryString.charCodeAt(i);
//     }

//     return bytes;
// }
// u64-u256 will be represented as bigints regardless of how they were provided when serializing them
const parsedU8 = bcs.u8().parse(u8);
const parsedU64 = bcs.u64().parse(u64);
const parsedU128 = bcs.u128().parse(u128);
const parsedU256 = bcs.u256().parse(u256);
console.log(parsedU64)
console.log(parsedU128)
console.log(parsedU8)
console.log(parsedU256)
const ss = Buffer.from("XZePPki1tdlXq-aSqL_VY3ORv5QmRSHC_rHx6jaGpEQ","base64url")
console.log(ss)
console.log(new Uint8Array(ss))
console.log(u256)
const parsedU2562 = bcs.u256().parse(new Uint8Array(ss));

console.log( parsedU2562)
console.log( ss.toString("base64url"))

// const u256s = bcs.u256().parse(base64ToUint8Array(s));
// console.log(u256s)
// const parsedStr = bcs.string().parse(str);


// const parsedHex = bcs.hex().parse(hex);
// const parsedBytes = bcs.bytes(4).parse(bytes);