import { Component, OnInit } from '@angular/core';
import PageHelper from 'lib/page-helper';
import KeyRowModel from './../../../models/key-row-model';
import { Title } from '@angular/platform-browser';
import BalanceApi from './../../../lib/balance-api';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoGenService } from '../services/auto-gen/auto-gen.service';

@Component({
  selector: 'app-keyspage',
  templateUrl: './keyspage.component.html',
  styleUrls: ['./keyspage.component.css']
})

export class KeyspageComponent implements OnInit {

  pageNumber:BigInt = BigInt("0");
  maxPageNumber: BigInt = BigInt("0");
  isLoading: Boolean = true;

  isTestnet: boolean = false;

  keys: KeyRowModel[] = []

  balanceApi: BalanceApi = new BalanceApi(false);

  autoGenService: AutoGenService;

  constructor(
    private titleService:Title, 
    private router: Router, 
    private activeRoute: ActivatedRoute,
    autoGenService: AutoGenService) 
    {
      this.autoGenService = autoGenService;
    }

  async ngOnInit() {
    
    this.activeRoute.data.subscribe( (data) =>
    {
      if (data["isTestnet"])
        this.isTestnet = data["isTestnet"]
    } )

    try
    { 
      let param = this.isTestnet ? "testnet/" : "bitcoin/"
        
      this.pageNumber = BigInt(window.location.href.split(param)[1])
    }
    catch(err)
    {
      this.router.navigate(['/not-found'])
    }

    let version = this.isTestnet ? "Testnet" : "Bitcoin"

    this.maxPageNumber = BigInt(PageHelper.GetMaxPage())

    if (this.pageNumber == BigInt('1'))
      this.titleService.setTitle("First page of " + version + " keys")
    else if (this.pageNumber == this.maxPageNumber)
      this.titleService.setTitle("Last page of" + version + "keys")
    else
      this.titleService.setTitle(version+` keys page ${this.pageNumber} of ${this.maxPageNumber}`)

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
    
    for(let k of this.keys)
    {
      this.setDelayForKey(k)
    }

    if (this.autoGenService.autoModeActive)
    {
      this.autoGenService.navigateAfterDelay(this.isTestnet);
    }
  }

  setDelayForKey(k: KeyRowModel)
  {
    setTimeout( () =>
    {
      let stats = this.balanceApi.getStatsForKeyRow(k)

      k.stats= stats.getFormat();

      //Sets the border color for that entry
      if (stats.totalBalance > 0)
      {
        k.setBorderColor("lime")
        this.autoGenService.cancel();
      }
      else if (stats.totalTx > 0)
      {
        k.setBorderColor("yellow")
        if (this.autoGenService.stopOnYellow)
        {
          this.autoGenService.cancel();
        }
      }
      else
      {
        k.setBorderColor("red")
      }

      //sets the color for the individual addresses
      let legacyModel = this.balanceApi.getAddressModel(k.legacy);
      let compressedLegacyModel = this.balanceApi.getAddressModel(k.legacyCompressed);
      let segwitModel = this.balanceApi.getAddressModel(k.segwit);
      let bech32Model = this.balanceApi.getAddressModel(k.bech32);

      if (legacyModel.balance > 0)
        k.legacyColor = "lime"
      else if (legacyModel.transactions > 0)
        k.legacyColor = "yellow"

        if (compressedLegacyModel.balance > 0)
        k.legacyCompressedColor = "lime"
      else if (compressedLegacyModel.transactions > 0)
        k.legacyCompressedColor = "yellow"

        if (segwitModel.balance > 0)
        k.segwitColor = "lime"
      else if (segwitModel.transactions > 0)
        k.segwitColor = "yellow"

        if (bech32Model.balance > 0)
        k.bech32Color = "lime"
      else if (bech32Model.transactions > 0)
        k.bech32Color = "yellow"

    }, this.getRandomDelay())
  }

  getRandomDelay(min: number = 0, max: number = PageHelper.DELAY) {
    return Math.random() * (max - min) + min;
  }

  isAutoGenning()
  {
    return this.autoGenService.autoModeActive;
  }
}
