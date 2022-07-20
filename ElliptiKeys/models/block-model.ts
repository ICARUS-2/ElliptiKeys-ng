import { TransactionModel } from "./transaction-model";

export default class BlockModel
{
    static BLOCK_INTERVAL = 210000;
    static BASE_BLOCK_REWARD = 50;

    hash: string = "";
    prevHash: string = "";
    merkleRoot: string = "";
    timeStamp: number = 0;
    sizeInBytes: number = 0;
    nonce: number = 0;
    height: number = 0;
    fee: number = 0;
    txCount: number = 0;
    volume: number = 0;

    transactions: TransactionModel[] = [];

    constructor()
    {

    }

    getHalvingCount()
    {
        if (this.height < BlockModel.BLOCK_INTERVAL)
            return 0;

        let remainder = this.height % BlockModel.BLOCK_INTERVAL;
        return (this.height - remainder) / BlockModel.BLOCK_INTERVAL;
    }

    getBlockReward()
    {
        let halvings = this.getHalvingCount();

        if (halvings > 33)
            return 0;

        let subsidy = BlockModel.BASE_BLOCK_REWARD;
        
        for (let i = 0; i < halvings; i++)
        {
            subsidy /= 2;
        }
        return subsidy;
    }
}