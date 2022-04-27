import AddressModel from './../models/address-model';

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
        
        console.log(this._jsonResult)

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

    _getJsonDataByKey(key:string)
    {
        return this._jsonResult[key]
    }
}