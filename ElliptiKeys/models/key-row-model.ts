import Keys from "lib/keys/Keys";
import LocalStorageHelper from "lib/localstorage-helper"
import { ADDRESS_TYPES } from './../lib/address-types';
import { WIF_TYPES } from './../lib/wif-types';
import { URLS } from './../lib/urls';

export default class KeyRowViewModel
{
    BORDER_WIDTH = 4

    privateKey: string = "5xxx"
    privateKeyCompressed: string="Lxxx"
    legacy: string = "1xxx"
    legacyCompressed: string = "1xxx"
    segwit: string = "3xxx"
    bech32: string = "bc1qxxx"
    stats: string = "? BTC (? tx)"

    borderColor: string = `${this.BORDER_WIDTH}px solid gray`
    privateKeyTextColor: string = "white"
    legacyColor: string = "white";
    legacyCompressedColor: string = "white";
    segwitColor: string = "white";
    bech32Color: string = "white";
    display: string = "normal";

    isTestnet: Boolean = false;

    constructor(num : BigInt, isTestnet : Boolean)
    {
        this.isTestnet = isTestnet;
        this.privateKey = isTestnet ? Keys.GenerateTestnetPrivateKeyFromNumber(num) : Keys.GeneratePrivateKeyFromNumber(num);
        this.privateKeyCompressed = isTestnet ? Keys.GenerateCompressedTestnetPrivateKeyFromNumber(num) : Keys.GenerateCompressedPrivateKeyFromNumber(num);
        this.legacy = isTestnet ? Keys.TestnetPrivateKeyToLegacyAddress(this.privateKey) : Keys.PrivateKeyToLegacyAddress(this.privateKey)
        this.legacyCompressed = isTestnet ? Keys.TestnetCompressedPrivateKeyToLegacyAddress(this.privateKeyCompressed) : Keys.CompressedPrivateKeyToLegacyAddress(this.privateKeyCompressed);
        this.segwit = isTestnet ? Keys.TestnetCompressedPrivateKeyToSegwitAddress(this.privateKeyCompressed) : Keys.CompressedPrivateKeyToSegwitAddress(this.privateKeyCompressed);
        this.bech32 = isTestnet ? Keys.TestnetCompressedPrivateKeyToBech32Address(this.privateKeyCompressed) : Keys.CompressedPrivateKeyToBech32Address(this.privateKeyCompressed);

        let key = LocalStorageHelper.GetPrivateKeySearchQuery()
        if (key)
        {
            if (key == this.privateKey || key == this.privateKeyCompressed)
            {
                this.setSearchBorderColor();
                LocalStorageHelper.ClearPrivateKeySearchQuery();
            }
        }
    }

    setBorderColor(color: string = "red")
    {
        this.borderColor = `${this.BORDER_WIDTH}px solid ${color}`
    }

    setSearchBorderColor(color: string = "cyan")
    {
        this.privateKeyTextColor = color;
    }

    getAddressExplorerUrl(addressType: string)
    {
        switch(addressType)
        {
            case ADDRESS_TYPES.legacy:
                return this.isTestnet ? URLS.BASE_TESTNET_EXPLORER_URL+this.legacy : URLS.BASE_EXPLORER_URL+this.legacy;

            case ADDRESS_TYPES.legacyCompressed:
                return this.isTestnet ? URLS.BASE_TESTNET_EXPLORER_URL+this.legacyCompressed : URLS.BASE_EXPLORER_URL+this.legacyCompressed;

            case ADDRESS_TYPES.segwit:
                return this.isTestnet ? URLS.BASE_TESTNET_EXPLORER_URL+this.segwit : URLS.BASE_EXPLORER_URL+this.segwit;

            case ADDRESS_TYPES.bech32:
                return this.isTestnet ? URLS.BASE_TESTNET_EXPLORER_URL+this.bech32 : URLS.BASE_EXPLORER_URL+this.bech32;
        
            default:
                return "#";
        }       
    }

    getWifExplorerUrl(keyType: string)
    {
        switch(keyType)
        {
            case WIF_TYPES.compressed:
                return this.isTestnet ? URLS.BASE_TESTNET_WIF_EXPLORER_URL+this.privateKeyCompressed : URLS.BASE_WIF_EXPLORER_URL+this.privateKeyCompressed;

            case WIF_TYPES.uncompressed:
                return this.isTestnet ? URLS.BASE_TESTNET_WIF_EXPLORER_URL+this.privateKey : URLS.BASE_WIF_EXPLORER_URL+this.privateKey;

            default: 
                return "#";
        }
    }
}