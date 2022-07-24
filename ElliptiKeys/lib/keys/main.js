import Keys from './Keys.js';

let compr = Keys.GenerateRandomCompressedPrivateKey();
//let compr = 'KzMVzFdD4UDzRiXpGUtmM9HDh8RefUR4ZrQk53Qh6USTs7kDxxFS'
let decomp = Keys.DecompressWIF(compr)
console.log(compr)

let legacy = Keys.CompressedPrivateKeyToLegacyAddress(compr)
console.log(legacy)

let legacyD = Keys.PrivateKeyToLegacyAddress(decomp)
console.log(legacyD)

let segwit = Keys.CompressedPrivateKeyToSegwitAddress(compr)
console.log(segwit)

let bech32 = Keys.CompressedPrivateKeyToBech32Address(compr);
console.log(bech32)