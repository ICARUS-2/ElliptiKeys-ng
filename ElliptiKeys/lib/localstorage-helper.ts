export default class LocalStorageHelper
{
    static PRIVATE_KEY_SEARCH_QUERY: string = "elliptikeys_PrivateKeySearchQuery";
    static LAST_PRICE_API_CALL: string = "elliptikeys_LastPriceApiCall"
    static LAST_RECORDED_PRICE: string = "elliptikeys_LastRecordedPrice"
    static MAINNET_BALANCES_CHECKED: string = "elliptikeys_MainnetBalancesChecked";
    static TESTNET_BALANCES_CHECKED: string = "elliptikeys_TestnetBalancesChecked";

    static SITE_NAME: string="elliptikeys_Lang"
    static getLang() : string | null
    {
        return window.localStorage.getItem(this.SITE_NAME)
    }

    static setLang(val: string)
    {
        window.localStorage.setItem(this.SITE_NAME, val)
    }

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

    //balances checked
    static GetMainnetBalancesChecked()
    {
        return window.localStorage.getItem(LocalStorageHelper.MAINNET_BALANCES_CHECKED);
    }

    static SetMainnetBalancesChecked(val: string)
    {
        window.localStorage.setItem(LocalStorageHelper.MAINNET_BALANCES_CHECKED, val)
    }

    static GetTestnetBalancesChecked()
    {
        return window.localStorage.getItem(LocalStorageHelper.TESTNET_BALANCES_CHECKED);
    }

    static SetTestnetBalancesChecked(val: string)
    {
        window.localStorage.setItem(LocalStorageHelper.TESTNET_BALANCES_CHECKED, val)
    }

    static ResetBalancesChecked()
    {
        this.SetMainnetBalancesChecked("0");
        this.SetTestnetBalancesChecked("0");
    }
}