import Keys from "lib/Keys"
import KeyStatsModel from './key-stats-model';

export default class KeyRowModel
{
    BORDER_WIDTH = 4

    privateKey: string = "5xxx"
    privateKeyCompressed: string="Lxxx"
    legacy: string = "1xxx"
    legacyCompressed: string = "1xxx"
    segwit: string = "3xxx"
    bech32: string = "bc1qxxx"
    stats: string = "? BTC (? tx)"

    borderColor: string = `${this.BORDER_WIDTH}px solid gray`
    legacyColor: string = "white";
    legacyCompressedColor: string = "white";
    segwitColor: string = "white";
    bech32Color: string = "white";

    constructor(num : BigInt)
    {
        this.privateKey = Keys.GeneratePrivateKeyFromNumber(num);
        this.privateKeyCompressed = Keys.GenerateCompressedPrivateKeyFromNumber(num);
        this.legacy = Keys.PrivateKeyToLegacyAddress(this.privateKey)
        this.legacyCompressed = Keys.CompressedPrivateKeyToLegacyAddress(this.privateKeyCompressed);
        this.segwit = Keys.CompressedPrivateKeyToSegwitAddress(this.privateKeyCompressed);
        this.bech32 = Keys.CompressedPrivateKeyToBech32Address(this.privateKeyCompressed);
    }

    setBorderColor(color: string = "red")
    {
        this.borderColor = `${this.BORDER_WIDTH}px solid ${color}`
    }
}