export default class AddressModel
{
    address: string = ""
    transactions: number = 0;
    balance: number = 0;

    constructor(addr: string, txn:number = 0, bal:number = 0)
    {
        this.address= addr;
        this.transactions = txn
        this.balance = bal;
    }

    getBtcBalance():number
    {
        return this.balance / 100000000
    }
}