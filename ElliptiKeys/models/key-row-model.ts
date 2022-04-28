import Keys from "lib/Keys"
import KeyStatsModel from './key-stats-model';

export default class KeyRowModel
{
    privateKey: string = "5xxx"
    privateKeyCompressed: string="Lxxx"
    legacy: string = "1xxx"
    legacyCompressed: string = "1xxx"
    segwit: string = "3xxx"
    bech32: string = "bc1qxxx"
    stats: string = "0 BTC (0 tx)"

    constructor(num : BigInt)
    {
        this.privateKey = Keys.GeneratePrivateKeyFromNumber(num);
        this.privateKeyCompressed = Keys.GenerateCompressedPrivateKeyFromNumber(num);
        this.legacy = Keys.PrivateKeyToLegacyAddress(this.privateKey)
        this.legacyCompressed = Keys.CompressedPrivateKeyToLegacyAddress(this.privateKeyCompressed);
        this.segwit = Keys.CompressedPrivateKeyToSegwitAddress(this.privateKeyCompressed);
        this.bech32 = Keys.CompressedPrivateKeyToBech32Address(this.privateKeyCompressed);
    }

    setAddressStats(model: KeyStatsModel)
    {

    }
}