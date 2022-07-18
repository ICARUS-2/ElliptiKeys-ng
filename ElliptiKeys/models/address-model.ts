import AddressHelper from "lib/address-helper";
import { ADDRESS_TYPES } from "lib/address-types";

export default class AddressModel
{
    static DIVISOR = 100000000

    address: string = ""
    transactions: number = 0;
    balance: number = 0;
    received: number = 0;
    sent: number = 0;

    constructor(addr: string, txn:number = 0, bal:number = 0, received: number = 0, sent: number = 0)
    {
        this.address= addr;
        this.transactions = txn;
        this.balance = bal;
        this.received = received;
        this.sent = sent;
    }

    getBtcBalance():number
    {
        return this.balance / AddressModel.DIVISOR;
    }

    getBtcSent()
    {
        return this.sent / AddressModel.DIVISOR;
    }

    getBtcReceived()
    {
        return this.received / AddressModel.DIVISOR
    }

    getFormat()
    {
        return AddressHelper.GetAddressFormat(this.address)
    }

    getDisplayFormat()
    {
        switch(this.getFormat())
        {
            case ADDRESS_TYPES.legacy:
                return "Legacy/Base58 P2PKH";

            case ADDRESS_TYPES.segwit:
                return "SegWit/Base58 P2SH";

            case ADDRESS_TYPES.bech32:
                return "Native SegWit/Bech32 P2WPKH";

            default:
                return "Unknown";
        }
    }
}