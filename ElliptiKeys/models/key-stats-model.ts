export default class KeyStatsModel
{
    totalTx:number = 0;
    totalBalance: number = 0;

    static MAX_TX: number = 99;

    constructor(tx:number, bal:number)
    {
        this.totalTx = tx;
        this.totalBalance = bal;
    }

    getFormat():string
    {
        let tx:string = this.totalTx.toString();

        if (this.totalTx > KeyStatsModel.MAX_TX)
            tx = "99+"

        return `${this.totalBalance} BTC (${tx} tx)`;
    }
}