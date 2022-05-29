export default class LocalStorageHelper
{
    static PRIVATE_KEY_SEARCH_QUERY: string = "elliptikeys_PrivateKeySearchQuery";
    static LAST_PRICE_API_CALL: string = "elliptikeys_LastPriceApiCall"
    static LAST_RECORDED_PRICE: string = "elliptikeys_LastRecordedPrice"

    //private key search
    static SetPrivateKeySearchQuery(privateKey : string)
    {
        window.localStorage.setItem(LocalStorageHelper.PRIVATE_KEY_SEARCH_QUERY, privateKey)
    }

    static GetPrivateKeySearchQuery()
    {
        return window.localStorage.getItem(LocalStorageHelper.PRIVATE_KEY_SEARCH_QUERY)
    }

    static ClearPrivateKeySearchQuery()
    {
        return window.localStorage.removeItem(LocalStorageHelper.PRIVATE_KEY_SEARCH_QUERY)
    }
    
    //price API
    static GetLastPriceApiCall()
    {
        return window.localStorage.getItem(LocalStorageHelper.LAST_PRICE_API_CALL)
    }

    static SetLastPriceApiCall(date: Number)
    {
        window.localStorage.setItem(LocalStorageHelper.LAST_PRICE_API_CALL, date.toString())
    }

    //cached price
    static GetLastRecordedPrice()
    {
        let price = window.localStorage.getItem(LocalStorageHelper.LAST_RECORDED_PRICE);
    
        if (price)
        {
            return JSON.parse(price)
        }
        return null
    }

    static SetLastRecordedPrice(price: object)
    {
        window.localStorage.setItem(LocalStorageHelper.LAST_RECORDED_PRICE, JSON.stringify(price))
    }
}