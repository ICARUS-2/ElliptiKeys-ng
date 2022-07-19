import Keys from "./Keys";
import KeysHelper from './keys-helper';
import AddressTransactionModel from './address-transaction-model';
import AddressModel from './../models/address-model';
import { TransactionIOModel, TransactionModel } from './../models/transaction-model';

export default class TransactionApi
{
    static ADDRESS_TRANSACTION_URL: string = "https://blockchain.info/rawaddr/"
    static TESTNET_ADDRESS_TRANSACTION_URL: string = "https://api.haskoin.com/btctest/blockchain/rawaddr/"

    //isTestnet: boolean = false;

    constructor()
    {
        //this.isTestnet = isTn;
    }

    async getSingleAddressData(address: string): Promise<AddressTransactionModel | undefined>
    {
        if(!Keys.ValidateBitcoinAddress(address))
            return undefined;

        try
        {
            
            let isTestnet = KeysHelper.IsAddressTestnet(address);
            
            let fetchResult = await fetch(isTestnet ? TransactionApi.TESTNET_ADDRESS_TRANSACTION_URL+address : TransactionApi.ADDRESS_TRANSACTION_URL+address)
            let jsonResult = await fetchResult.json();

            let addressModel = new AddressModel(address, jsonResult.n_tx, jsonResult.final_balance, jsonResult.total_received, jsonResult.total_sent)
        
            
            let transactions = jsonResult.txs.map( (txObj: any) =>
            {
                let mappedModel = new TransactionModel();
                mappedModel.hash = txObj["hash"];
                mappedModel.time = txObj["time"];
                mappedModel.block = txObj["block_height"];
                mappedModel.fee = txObj["fee"];
                mappedModel.result = txObj["result"];
                mappedModel.balance = txObj["balance"];

                mappedModel.inputs = txObj["inputs"].map( (txInput: any) =>
                {
                    let txInputModel = new TransactionIOModel();
                    txInputModel.address = txInput["prev_out"]["addr"];
                    txInputModel.value = txInput["prev_out"]["value"];

                    return txInputModel;
                })

                mappedModel.outputs = txObj["out"].map( (txOutput:any) =>
                {
                    let txOutputModel = new TransactionIOModel();
                    txOutputModel.address = txOutput["addr"];
                    txOutputModel.value = txOutput["value"];

                    return txOutputModel;
                } )
                
                return mappedModel;
            } )

            let atModel = new AddressTransactionModel(addressModel, transactions)

            console.log(atModel)

            return atModel;
        }catch(err)
        {
            return undefined;
        }
    }
}