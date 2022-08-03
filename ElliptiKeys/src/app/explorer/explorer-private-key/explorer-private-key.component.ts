import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import KeysHelper from './../../../../lib/keys-helper';
import Keys from 'lib/keys/Keys';
import { URLS } from './../../../../lib/urls';
import { ADDRESS_TYPES } from 'lib/address-types';
import { WIF_TYPES } from './../../../../lib/wif-types';
import PageHelper from './../../../../lib/page-helper';
import LocalStorageHelper from './../../../../lib/localstorage-helper';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-explorer-private-key',
  templateUrl: './explorer-private-key.component.html',
  styleUrls: ['./explorer-private-key.component.css']
})
export class ExplorerPrivateKeyComponent implements OnInit, OnDestroy {

  key: string = "";
  isTestnet: Boolean = false;
  isCompressed: Boolean = false;

  oppositeKeyFormat: Boolean = false;
  legacyAddress: string = "";
  segwitAddress: string = "";
  bech32Address: string = "";

  langSub: Subscription;

  constructor(
    private activeRoute: ActivatedRoute, 
    private router: Router, 
    private title: Title,
    private translateService: TranslateService
    ) 
    {
      activeRoute.params.subscribe( (d)=> 
      {
        if (d["id"])
          this.key = d["id"]

        this.isTestnet = KeysHelper.IsPrivateKeyTestnet(this.key)
        let isUrlTestnet = window.location.href.includes("/testnet");

        //If URL does not match the requested address, navigate away.
        if (this.isTestnet != isUrlTestnet)
          this.router.navigate(["/not-found"], {skipLocationChange: true})
      })

      this.setTitle();

      this.langSub = this.translateService.onLangChange.subscribe( () =>
        {
          this.setTitle();
        } )
    }

  ngOnInit(): void {

    if (Keys.ValidatePrivateKey(this.key))
    {
      this.isCompressed = KeysHelper.IsPrivateKeyCompressed(this.key)

      if (!this.isCompressed)
      {
        this.legacyAddress = this.isTestnet ? Keys.TestnetPrivateKeyToLegacyAddress(this.key) : Keys.PrivateKeyToLegacyAddress(this.key);
        this.oppositeKeyFormat = this.isTestnet ? Keys.CompressTestnetWIF(this.key) : Keys.CompressWIF(this.key);
      }
      else
      {
        this.oppositeKeyFormat = this.isTestnet ? Keys.DecompressTestnetWIF(this.key) : Keys.DecompressWIF(this.key)
        this.legacyAddress = this.isTestnet ? Keys.TestnetCompressedPrivateKeyToLegacyAddress(this.key) : Keys.CompressedPrivateKeyToLegacyAddress(this.key);
        this.segwitAddress = this.isTestnet ? Keys.TestnetCompressedPrivateKeyToSegwitAddress(this.key) : Keys.CompressedPrivateKeyToSegwitAddress(this.key);
        this.bech32Address = this.isTestnet ? Keys.TestnetCompressedPrivateKeyToBech32Address(this.key) : Keys.CompressedPrivateKeyToBech32Address(this.key)
      }

    }
    else
    {
      this.router.navigate(["/not-found"], {skipLocationChange: true})
    }

  }

  ngOnDestroy(): void {
    this.langSub.unsubscribe();
  }

  getAddressExplorerUrl(addressType: string)
  {
      switch(addressType)
      {
          case ADDRESS_TYPES.legacy:
              return this.isTestnet ? URLS.BASE_TESTNET_EXPLORER_URL+this.legacyAddress : URLS.BASE_EXPLORER_URL+this.legacyAddress;

          case ADDRESS_TYPES.segwit:
              return this.isTestnet ? URLS.BASE_TESTNET_EXPLORER_URL+this.segwitAddress : URLS.BASE_EXPLORER_URL+this.segwitAddress;

          case ADDRESS_TYPES.bech32:
              return this.isTestnet ? URLS.BASE_TESTNET_EXPLORER_URL+this.bech32Address : URLS.BASE_EXPLORER_URL+this.bech32Address;
      
          default:
              return "#";
      }       
  }

  getWifExplorerUrl()
  {
    return this.isTestnet ? URLS.BASE_TESTNET_WIF_EXPLORER_URL+this.oppositeKeyFormat : URLS.BASE_WIF_EXPLORER_URL+this.oppositeKeyFormat;
  }

  handleOpenPageButtonClick()
  {
    let query = this.isTestnet ? Keys.DecompressTestnetWIF(this.key) : Keys.DecompressWIF(this.key)
    LocalStorageHelper.SetPrivateKeySearchQuery(query)
  }

  getOpenPageButtonLink()
  {
    let query = this.isTestnet ? Keys.DecompressTestnetWIF(this.key) : Keys.DecompressWIF(this.key)

    let privateKeyNum:BigInt = Keys.GetNumberFromPrivateKey(query)
    let pageNumber:BigInt = BigInt(PageHelper.CalculatePageNumber(privateKeyNum))

    return this.isTestnet ? "/testnet/"+pageNumber : "/bitcoin/"+pageNumber
    //this.isTestnet ? this.router.navigate(["/testnet/"+pageNumber]) : this.router.navigate(["/bitcoin/"+pageNumber])
  }
  
  setTitle()
  {
    this.translateService.get("explorer.privateKey.title").subscribe( str =>
      {
        this.title.setTitle(str+this.key)
      } )
  }
}
