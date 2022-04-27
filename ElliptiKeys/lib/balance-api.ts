import AddressModel from './../models/address-model';

export default class BalanceApi
{
    url: string = "https://blockchain.info/balance?cors=true&active="
    addressModels: AddressModel[] = []

    constructor() 
    {

    }

    addAddress(address:string) :void
    {
        this.addressModels.push(new AddressModel(address))
        this.url+=address+"|"
    }

    async getStats()
    {
        this.fetchJson(this.url)
        
        this.addressModels.forEach(item => {
            
        });
    }

    async fetchJson(url:string): Promise<JSON>
    {
        let res = await fetch(url);

        return res.json();
    }
}