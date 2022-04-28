import { Component, OnInit } from '@angular/core';
import PageHelper from 'lib/page-helper';
import KeyRowModel from './../../../models/key-row-model';
import { Title } from '@angular/platform-browser';
import BalanceApi from './../../../lib/balance-api';

@Component({
  selector: 'app-keyspage',
  templateUrl: './keyspage.component.html',
  styleUrls: ['./keyspage.component.css']
})

export class KeyspageComponent implements OnInit {

  pageNumber:BigInt = BigInt("0");
  maxPageNumber: BigInt = BigInt("0");
  isLoading: Boolean = true;

  keys: KeyRowModel[] = []

  balanceApi: BalanceApi = new BalanceApi();

  constructor(private titleService:Title) { }

  async ngOnInit() {

    try
    {
      this.pageNumber = BigInt(window.location.href.split('bitcoin/')[1])
    }
    catch(err)
    {
      window.location.href = "/not-found"
    }

    console.log(this.pageNumber)

    this.maxPageNumber = BigInt(PageHelper.GetMaxPage())

    if (this.pageNumber == BigInt('1'))
      this.titleService.setTitle("First page of Bitcoin keys")
    else if (this.pageNumber == this.maxPageNumber)
      this.titleService.setTitle("Last page of Bitcoin keys")
    else
      this.titleService.setTitle(`Bitcoin keys page ${this.pageNumber} of ${this.maxPageNumber}`)

    if (this.pageNumber > this.maxPageNumber)
      window.location.href = "/too-far"

      this.keys = PageHelper.GetKeysForPage(this.pageNumber)

      setTimeout(this.enableBtns, PageHelper.DELAY)

    this.balanceApi = new BalanceApi();

    for(let key of this.keys)
    {
      this.balanceApi.addAddress(key.legacy);
      this.balanceApi.addAddress(key.legacyCompressed);
      this.balanceApi.addAddress(key.segwit);
      this.balanceApi.addAddress(key.bech32);
    }

    await this.balanceApi.doApiRequest();

    console.log(this.balanceApi.addressModels)
    
    for(let k of this.keys)
    {
      k.stats= this.balanceApi.getStatsForKeyRow(k).getFormat()
    }
  }

  enableBtns()
  {
    this.isLoading = false;

    let arr = Array.from(document.getElementsByClassName('pageBtns') as HTMLCollectionOf<HTMLElement>)

    for(let i = 0; i < arr.length; i++)
    {
      let element = arr[i];

      element.style.display = "block"
    }

    let loadingDivs = Array.from(document.getElementsByClassName('loadingDiv') as HTMLCollectionOf<HTMLElement>)
  
    for(let i = 0; i < arr.length; i++)
    {
      let element = loadingDivs[i];

      element.style.display = "none"
    }
  }


}
