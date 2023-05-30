import { Component, OnDestroy, OnInit } from '@angular/core';
import PageHelper from 'lib/page-helper';
import KeyRowViewModel from './../../../models/key-row-model';
import { Title } from '@angular/platform-browser';
import BalanceApi from './../../../lib/balance-api';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoGenService } from '../services/auto-gen/auto-gen.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import LocalStorageHelper from 'lib/localstorage-helper';

@Component({
  selector: 'app-keyspage',
  templateUrl: './keyspage.component.html',
  styleUrls: ['./keyspage.component.css']
})

export class KeyspageComponent implements OnInit, OnDestroy {

  pageNumber:BigInt = BigInt("0");
  maxPageNumber: BigInt = BigInt("0");
  isLoading: Boolean = true;

  isTestnet: boolean = false;

  keys: KeyRowViewModel[] = [];
  unusedKeyCount: number = 0;

  balanceApi: BalanceApi = new BalanceApi(false);

  autoGenService: AutoGenService;

  version: string = "";

  routeSub: Subscription | undefined;
  langSub: Subscription | undefined;

  redCounter = 0;
  yellowCounter = 0;
  greenCounter = 0;

  constructor(
    private titleService:Title, 
    private router: Router, 
    private activeRoute: ActivatedRoute,
    private translateService: TranslateService,
    autoGenService: AutoGenService) 
    {
      this.autoGenService = autoGenService;
    }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
    this.routeSub?.unsubscribe();
  }

  async ngOnInit() {
    
    this.routeSub = this.activeRoute.data.subscribe( (data) =>
    {
      if (data["isTestnet"])
      {
        this.isTestnet = data["isTestnet"]
      }
    } )

    this.setTitle();

    this.langSub = this.translateService.onLangChange.subscribe( () =>
    {
      this.setTitle();
    } )

    try
    { 
      let param = this.isTestnet ? "testnet/" : "bitcoin/"
      this.version = this.isTestnet ? "Testnet" : "Bitcoin"  

      this.pageNumber = BigInt(window.location.href.split(param)[1])
    }
    catch(err)
    {
      this.router.navigate(['/not-found'])
    }

    this.maxPageNumber = BigInt(PageHelper.GetMaxPage())

    this.setTitle();

    if (this.pageNumber > this.maxPageNumber)
      this.router.navigate(["/too-far"])

      this.keys = PageHelper.GetKeysForPage(this.pageNumber, this.isTestnet)

      setTimeout( () => {this.isLoading = false} , PageHelper.DELAY)

    this.balanceApi = new BalanceApi(this.isTestnet);

    for(let key of this.keys)
    {
      this.balanceApi.addAddress(key.legacy);
      this.balanceApi.addAddress(key.legacyCompressed);
      this.balanceApi.addAddress(key.segwit);
      this.balanceApi.addAddress(key.bech32);
    }

    await this.balanceApi.doApiRequest();

    //console.log(this.balanceApi.addressModels)

    this.keys.forEach( (k) =>
    {
      this.setUpKeyRow(k)
    } );

    if (this.autoGenService.autoModeActive)
    {
      this.autoGenService.navigateAfterDelay(this.isTestnet, this.pageNumber);
    }

    if (!this.balanceApi.errorCallingApi)
    {
      this.isTestnet ? LocalStorageHelper.AddToTestnetBalancesChecked(this.balanceApi.addressModels.length) : LocalStorageHelper.AddToMainnetBalancesChecked(this.balanceApi.addressModels.length)
    }
  }

  setUpKeyRow(k: KeyRowViewModel)
  {
    let stats = this.balanceApi.getStatsForKeyRow(k);

    setTimeout( () =>
    {
      k.stats= stats.getFormat();

      //Sets the border color for that entry
      if (stats.totalBalance > 0)
      {
        k.setBorderColor("lime");
        this.autoGenService.cancel();
      }
      else if (stats.totalTx > 0)
      {
        k.setBorderColor("yellow");
        if (this.autoGenService.doesStopOnYellow())
        {
          this.autoGenService.cancel();
        }
      }
      else
      {
        if (LocalStorageHelper.GetHideUnusedKeys())
        {
          k.display = "none";
          this.unusedKeyCount++;
        }

        k.setBorderColor("red")
      }

      //sets the color for the individual addresses and increments respective counters
      let legacyModel = this.balanceApi.getAddressModel(k.legacy);
      let compressedLegacyModel = this.balanceApi.getAddressModel(k.legacyCompressed);
      let segwitModel = this.balanceApi.getAddressModel(k.segwit);
      let bech32Model = this.balanceApi.getAddressModel(k.bech32);

      if (legacyModel.balance > 0)
      {
        k.legacyColor = "lime";
        this.greenCounter++;
      }
      else if (legacyModel.transactions > 0)
      {
        k.legacyColor = "yellow"
        this.yellowCounter++;
      }
      else
      {
        this.redCounter++;
      }

      if (compressedLegacyModel.balance > 0)
      {
        k.legacyCompressedColor = "lime";
        this.greenCounter++;
      }
      else if (compressedLegacyModel.transactions > 0)
      {
        k.legacyCompressedColor = "yellow";
        this.yellowCounter++;
      }
      else
      {
        this.redCounter++;
      }

      if (segwitModel.balance > 0)
      {
        k.segwitColor = "lime";
        this.greenCounter++;
      }
      else if (segwitModel.transactions > 0)
      {
        k.segwitColor = "yellow";
        this.yellowCounter++;
      }
      else
      {
        this.redCounter++;
      }

      if (bech32Model.balance > 0)
      {
        k.bech32Color = "lime";
        this.greenCounter++;
      }
      else if (bech32Model.transactions > 0)
      {
        k.bech32Color = "yellow";
        this.yellowCounter++;
      }
      else
      {
        this.redCounter++;
      }

    }, this.getRandomDelay())
  }

  getRandomDelay(min: number = 0, max: number = PageHelper.DELAY) {
    return Math.random() * (max - min) + min;
  }

  isAutoGenning()
  {
    return this.autoGenService.autoModeActive;
  }
  
  setTitle()
  {
    if (this.pageNumber == BigInt('1'))
    {

      this.translateService.get("keyspage.firstPageTitle").subscribe( str =>
        {
          this.titleService.setTitle(str.replace("{version}", this.version))
        } );

    }
    else if (this.pageNumber == this.maxPageNumber)
    {

      this.translateService.get("keyspage.lastPageTitle").subscribe( str =>
      {
        this.titleService.setTitle(str.replace("{version}", this.version))
      });
       
    }
    else
    {
      
      this.translateService.get("keyspage.title").subscribe( str =>
        {
          this.titleService.setTitle(str
            .replace("{version}", this.version)
            .replace("{page}", this.pageNumber)
            .replace("{maxPage}", this.maxPageNumber))
        } )

    }
  }

  getSwitchNetworkLink()
  {
    let link = "/{network}/"+this.pageNumber;
    let oppositeVersion = this.isTestnet ? "bitcoin": "testnet"
    
    return link.replace("{network}", oppositeVersion);
  }

  handleNetworkSwitchButtonClick()
  {
    this.autoGenService.cancel();
    this.router.navigate([this.getSwitchNetworkLink()]);
  }

  shouldHideUnusedKeys() : boolean
  {
    return LocalStorageHelper.GetHideUnusedKeys();
  }

  isEmptyPage() : boolean
  {
    return this.unusedKeyCount == this.keys.length;
  }
}
