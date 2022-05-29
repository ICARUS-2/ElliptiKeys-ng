import AddressModel from './../models/address-model';
import KeyRowModel from './../models/key-row-model';
import KeyStatsModel from './../models/key-stats-model';

export default class BalanceApi
{
    url: string = "https://blockchain.info/balance?cors=true&active="
    addressModels: AddressModel[] = []

    _jsonResult: any;
    constructor() 
    {

    }

    addAddress(address:string) :void
    {
        this.addressModels.push(new AddressModel(address))
        this.url+=address+"|"
    }

    async doApiRequest()
    {
        this._jsonResult = await this.fetchJson(this.url)
        
        //console.log(this._jsonResult)

        this.addressModels.forEach(item => {
            let data = this._getJsonDataByKey(item.address);
            
            item.balance = data.final_balance;
            item.transactions = data.n_tx;
        });
    }

    async fetchJson(url:string): Promise<JSON>
    {
        let res = await fetch(url);

        return res.json();
    }

    getAddressModel(address: string)
    {
        for(let model of this.addressModels)
        {
            if (model.address == address)
                return model;
        }

        return new AddressModel("address not found");
    }

    getStatsForKeyRow(keyrow: KeyRowModel)
    {
        let legacyModel = new AddressModel("", 0, 0);
        let compressedLegacyModel = new AddressModel("", 0, 0);
        let segwitModel = new AddressModel("", 0, 0);
        let bech32Model = new AddressModel("", 0, 0);

        for(let model of this.addressModels)
        {
            if (model.address == keyrow.legacy)
                legacyModel = model;

            if (model.address == keyrow.legacyCompressed)
                compressedLegacyModel = model;

            if (model.address == keyrow.segwit)
                segwitModel = model;

            if (model.address == keyrow.bech32)
                bech32Model = model;
        }

        
        let totalBalance = legacyModel.getBtcBalance() + compressedLegacyModel.getBtcBalance() + segwitModel.getBtcBalance() + bech32Model.getBtcBalance();
        let totalTx = legacyModel.transactions + compressedLegacyModel.transactions + segwitModel.transactions + bech32Model.transactions;

        return new KeyStatsModel(totalTx, totalBalance)
    }

    _getJsonDataByKey(key:string)
    {
        return this._jsonResult[key]
    }
}