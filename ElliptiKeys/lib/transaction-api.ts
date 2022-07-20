import Keys from "./Keys";
import KeysHelper from './keys-helper';
import AddressTransactionModel from '../models/address-transaction-model';
import AddressModel from './../models/address-model';
import { TransactionIOModel, TransactionModel } from './../models/transaction-model';
import BlockModel from "models/block-model";

export default class TransactionApi
{
    static ADDRESS_TRANSACTION_URL: string = "https://blockchain.info/rawaddr/"
    static TESTNET_ADDRESS_TRANSACTION_URL: string = "https://api.haskoin.com/btctest/blockchain/rawaddr/"

    static TRANSACTION_URL = "https://blockchain.info/rawtx/";
    static TESTNET_TRANSACTION_URL = "https://api.haskoin.com/btctest/blockchain/rawtx/"

    static BLOCK_URL = "https://blockchain.info/rawblock/";
    static TESTNET_BLOCK_URL = "https://api.haskoin.com/btctest/blockchain/rawblock/";

    constructor()
    {

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
                
                if (mappedModel.inputs.length == 1 && mappedModel.outputs.length == 1)
                {
                    if (mappedModel.inputs[0].value == 0 && mappedModel.inputs[0].address == undefined)
                    {
                        mappedModel.isCoinbase = true;
                        mappedModel.result = mappedModel.outputs[0].value;
                    }
                }
                
                return mappedModel;
            } )

            let atModel = new AddressTransactionModel(addressModel, transactions)

            return atModel;
        }catch(err)
        {
            throw(err)
        }
    }

    async getSingleTransactionData(hash: string, isTestnet: boolean) : Promise<TransactionModel | undefined>
    {
        try
        {
            let fetchResult = await fetch(isTestnet ? TransactionApi.TESTNET_TRANSACTION_URL+hash : TransactionApi.TRANSACTION_URL+hash)
            let jsonResult = await fetchResult.json();

                let mappedModel = new TransactionModel();
                mappedModel.hash = jsonResult["hash"];
                mappedModel.time = jsonResult["time"];
                mappedModel.block = jsonResult["block_height"];
                mappedModel.fee = jsonResult["fee"];
                mappedModel.result = 0;

                mappedModel.inputs = jsonResult["inputs"].map( (txInput: any) =>
                {
                    let txInputModel = new TransactionIOModel();
                    txInputModel.address = txInput["prev_out"]["addr"];
                    txInputModel.value = txInput["prev_out"]["value"];

                    mappedModel.result += txInputModel.value;

                    return txInputModel;
                })

                mappedModel.outputs = jsonResult["out"].map( (txOutput:any) =>
                {
                    let txOutputModel = new TransactionIOModel();
                    txOutputModel.address = txOutput["addr"];
                    txOutputModel.value = txOutput["value"];

                    return txOutputModel;
                })

                if (mappedModel.inputs.length == 1 && mappedModel.outputs.length == 1)
                {
                    if (mappedModel.inputs[0].value == 0 && mappedModel.inputs[0].address == undefined)
                    {
                        mappedModel.isCoinbase = true;
                        mappedModel.result = mappedModel.outputs[0].value;
                    }
                }

            return mappedModel;
        }
        catch(err)
        {
            return undefined
        }
    }

    async getSingleBlockData(blockNum: number, isTestnet: boolean) : Promise<BlockModel | undefined>
    {
        try
        {
            let fetchResult = await fetch(isTestnet ? TransactionApi.TESTNET_BLOCK_URL+blockNum : TransactionApi.BLOCK_URL+blockNum)
            let jsonResult = await fetchResult.json();

            let blockModel = new BlockModel();
            
            blockModel.hash = jsonResult["hash"];
            blockModel.prevHash = jsonResult["prev_block"];
            blockModel.merkleRoot = jsonResult["mrkl_root"];
            blockModel.timeStamp = jsonResult["time"];
            blockModel.fee = jsonResult["fee"];
            blockModel.nonce = jsonResult["nonce"];
            blockModel.txCount = jsonResult["n_tx"];
            blockModel.sizeInBytes = jsonResult["size"];
            blockModel.height = jsonResult["block_index"];

            blockModel.transactions = jsonResult["tx"].map( (txObj: any) => 
            {
                let mappedModel = new TransactionModel();
                mappedModel.hash = txObj["hash"];
                mappedModel.time = txObj["time"];
                mappedModel.block = txObj["block_height"];
                mappedModel.fee = txObj["fee"];
                mappedModel.result = 0;

                mappedModel.inputs = txObj["inputs"].map( (txInput: any) =>
                {
                    let txInputModel = new TransactionIOModel();
                    txInputModel.address = txInput["prev_out"]["addr"];
                    txInputModel.value = txInput["prev_out"]["value"];

                    mappedModel.result += txInputModel.value;

                    return txInputModel;
                })

                mappedModel.outputs = txObj["out"].map( (txOutput:any) =>
                {
                    let txOutputModel = new TransactionIOModel();
                    txOutputModel.address = txOutput["addr"];
                    txOutputModel.value = txOutput["value"];

                    return txOutputModel;
                })

                if (mappedModel.inputs.length == 1 && mappedModel.outputs.length == 1)
                {
                    if (mappedModel.inputs[0].value == 0 && mappedModel.inputs[0].address == undefined)
                    {
                        mappedModel.isCoinbase = true;
                        mappedModel.result = mappedModel.outputs[0].value;
                    }
                }

            return mappedModel;

            })

            console.log(blockModel)

            return blockModel;
        }
        catch(err)
        {
            return undefined
        }
    }
}