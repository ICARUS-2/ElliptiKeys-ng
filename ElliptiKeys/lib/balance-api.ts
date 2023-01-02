import AddressModel from './../models/address-model';
import KeyRowViewModel from './../models/key-row-model';
import KeyStatsModel from './../models/key-stats-model';

export default class BalanceApi
{
    url: string = ""
    addressModels: AddressModel[] = []

    isTestnet: Boolean = false;

    _jsonResult: any;

    errorCallingApi: Boolean = false;

    constructor(isTn: Boolean) 
    {
        this.isTestnet = isTn;
        this.url = this.getURL();
    }

    getURL()
    {
        if (this.isTestnet)
            return "https://api.haskoin.com/btctest/address/balances?addresses="
        else
            return "https://blockchain.info/balance?cors=true&active="

    }

    addAddress(address:string) :void
    {
        this.addressModels.push(new AddressModel(address))
        
        if (!this.isTestnet)
        {
            this.url+=address+"|"
        }
        else
        {
            this.url+=address+","
        }
    }       

    async doApiRequest()
    {
        try
        {

            //Removes trailing comma.
            if (this.isTestnet)
                this.url = this.url.slice(0, -1)

            this._jsonResult = await this.fetchJson()

            if (!this.isTestnet)
            {
                this.addressModels.forEach(item => {
                    let data = this._getJsonDataByKey(item.address);
                    
                    item.balance = data.final_balance;
                    item.transactions = data.n_tx;
                    item.received = data.total_received;
                    item.sent = data.total_received - data.final_balance;
                });
            }
            else
            {
                this.addressModels.forEach(item =>
                    {
                        let data = this._jsonResult.find( (obj: Object) =>
                        {
                            //@ts-ignore
                            return obj.address == item.address
                        } ) 

                        item.balance = data.confirmed;
                        item.transactions = data.txs;
                        item.received = data.received;
                        item.sent = data.received - data.confirmed;
                    })
            }
        }catch(err)
        {
            this.errorCallingApi = true;
        }
    }

    async fetchJson(): Promise<JSON>
    {
        let res = await fetch(this.url);

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

    getStatsForKeyRow(keyrow: KeyRowViewModel)
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