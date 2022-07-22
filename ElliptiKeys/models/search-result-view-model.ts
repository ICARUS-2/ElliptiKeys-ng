export default class SearchResultViewModel
{
    static SEARCH_TYPE = { address: "Address", transaction: "Transaction", block: "Block", privateKey: "WIF Private Key"}    
    static NETWORK_TYPE = { bitcoin: "Bitcoin", testnet: "Testnet" }
    
    link: string = "";
    searchType: string = "";
    networkType: string = "";
    text: string = "";

    getImgSrc()
    {
        if (this.networkType == SearchResultViewModel.NETWORK_TYPE.bitcoin)
        {
            return "../../../assets/bitcoin-logo.webp"
        }

        if (this.networkType == SearchResultViewModel.NETWORK_TYPE.testnet)
        {
            return "../../../assets/bitcoin-testnet-logo.webp"
        }

        return "";
    }
}