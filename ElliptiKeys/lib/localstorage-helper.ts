import { AUTO_GEN_STOP_YELLOW } from "./dictionaries/autogen-stop-types";
import { KEY_STATUS_DISPLAY_TYPES } from "./dictionaries/key-status-display-types";
import { AUTO_GEN_PAGE_SELECTION_TYPES } from "./dictionaries/page-selection-types";

export default class LocalStorageHelper
{
    //searching
    static PRIVATE_KEY_SEARCH_QUERY: string = "elliptikeys_PrivateKeySearchQuery";

    //price api
    static LAST_PRICE_API_CALL: string = "elliptikeys_LastPriceApiCall"
    static LAST_RECORDED_PRICE: string = "elliptikeys_LastRecordedPrice"

    //user stats
    static MAINNET_BALANCES_CHECKED: string = "elliptikeys_MainnetBalancesChecked";
    static TESTNET_BALANCES_CHECKED: string = "elliptikeys_TestnetBalancesChecked";

    //user configuration
    static HIDE_UNUSED_KEYS: string = "elliptikeys_HideUnusedKeys";
    static STOP_AUTO_GEN_YELLOW_GREEN = "elliptikeys_StopAutoGenYellowGreen";
    static AUTO_GEN_PAGE_SELECTION = "elliptikeys_AutoGenPageSelection";
    static KEY_STATUS_DISPLAY_TYPE = "elliptikeys_KeyStatusDisplayType"

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
        if(!window.localStorage.getItem(LocalStorageHelper.MAINNET_BALANCES_CHECKED))
            this.SetMainnetBalancesChecked("0");

        return window.localStorage.getItem(LocalStorageHelper.MAINNET_BALANCES_CHECKED);
    }

    static SetMainnetBalancesChecked(val: string)
    {
        window.localStorage.setItem(LocalStorageHelper.MAINNET_BALANCES_CHECKED, val)
    }

    static AddToMainnetBalancesChecked(val: number)
    {
        let stat = Number(this.GetMainnetBalancesChecked());

        stat+= val;

        this.SetMainnetBalancesChecked(stat.toString())
    }


    static GetTestnetBalancesChecked()
    {
        if (!window.localStorage.getItem(LocalStorageHelper.TESTNET_BALANCES_CHECKED))
            this.SetTestnetBalancesChecked("0");

        return window.localStorage.getItem(LocalStorageHelper.TESTNET_BALANCES_CHECKED);
    }

    static SetTestnetBalancesChecked(val: string)
    {
        window.localStorage.setItem(LocalStorageHelper.TESTNET_BALANCES_CHECKED, val)
    }

    static AddToTestnetBalancesChecked(val: number)
    {
        let stat = Number(this.GetTestnetBalancesChecked());

        stat+= val;

        this.SetTestnetBalancesChecked(stat.toString())
    }

    static ResetBalancesChecked()
    {
        this.SetMainnetBalancesChecked("0");
        this.SetTestnetBalancesChecked("0");
    }

    //Settings
    //Hiding unused keys
    static GetHideUnusedKeys() : boolean
    {
        return window.localStorage.getItem(this.HIDE_UNUSED_KEYS) == "true";
    } 

    static SetHideUnusedKeys(setting: boolean) : void 
    {
        window.localStorage.setItem(this.HIDE_UNUSED_KEYS, setting.toString());
    }

    //Auto-Gen stop settings
    static GetStopAutoGenOnYellow() : string
    {
        let res = window.localStorage.getItem(this.STOP_AUTO_GEN_YELLOW_GREEN);

        if (!res)
        {
            res = AUTO_GEN_STOP_YELLOW.yes;
            LocalStorageHelper.SetStopAutoGenOnYellowGreen(res);
        }

        return res;
    }

    static SetStopAutoGenOnYellowGreen(setting: string) : void
    {
        window.localStorage.setItem(this.STOP_AUTO_GEN_YELLOW_GREEN, setting.toString());
    }

    //Auto-Gen page selection
    static GetAutoGenPageSelectionType() : string
    {
        let storedVal = window.localStorage.getItem(this.AUTO_GEN_PAGE_SELECTION);

        if (!storedVal)
        {
            storedVal = AUTO_GEN_PAGE_SELECTION_TYPES.random;
            LocalStorageHelper.SetAutoGenPageSelectionType(storedVal);
        }
        
        return storedVal;
    }

    static SetAutoGenPageSelectionType(setting: string) : void 
    {
        window.localStorage.setItem(this.AUTO_GEN_PAGE_SELECTION, setting);
    }

    static GetKeyStatusDisplayType() : string 
    {
        let val = window.localStorage.getItem(this.KEY_STATUS_DISPLAY_TYPE);

        if (!val)
        {
            val = KEY_STATUS_DISPLAY_TYPES.sevenSegment;
            LocalStorageHelper.SetKeyStatusDisplayType(val);
        }

        return val;
    }

    static SetKeyStatusDisplayType(val: string) : void 
    {
        window.localStorage.setItem(this.KEY_STATUS_DISPLAY_TYPE, val);
    }
}