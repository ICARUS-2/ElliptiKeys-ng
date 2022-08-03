import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Keys from 'lib/keys/Keys';
import KeysHelper from './../../../../lib/keys-helper';
import AddressModel from './../../../../models/address-model';
import { Title } from '@angular/platform-browser';
import TransactionApi from './../../../../lib/transaction-api';
import TransactionViewModel from './../../../../models/transaction-view-model';
import { SatoshiToBitcoinService } from 'src/app/services/satoshi-to-bitcoin/satoshi-to-bitcoin.service';
import { DateFormatterService } from 'src/app/services/date-formatter/date-formatter.service';
import { PriceService } from './../../services/price/price.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-explorer-address',
  templateUrl: './explorer-address.component.html',
  styleUrls: ['./explorer-address.component.css']
})
export class ExplorerAddressComponent implements OnInit, OnDestroy {

  address: string = "";
  addressModel: AddressModel | undefined;
  transactions: TransactionViewModel[] = [];
  isTestnet: Boolean = false;
  errorCallingApi: Boolean = false;

  satoshiService: SatoshiToBitcoinService;
  dateFormatter: DateFormatterService;
  priceService: PriceService;

  transactionApi: TransactionApi = new TransactionApi();

  langSub: Subscription;

  constructor(private activeRoute: ActivatedRoute, 
    private router: Router, 
    private title: Title, 
    satoshiToBtc: SatoshiToBitcoinService,
    dateFormatter: DateFormatterService,
    private translateService: TranslateService,
    priceService: PriceService) 
  {
    activeRoute.params.subscribe( (d)=> 
    {
      if (d["id"])
        this.address = d["id"]

      this.isTestnet = KeysHelper.IsAddressTestnet(this.address)
      let isUrlTestnet = window.location.href.includes("/testnet");

      //If URL does not match the requested address, navigate away.
      if (this.isTestnet != isUrlTestnet)
        router.navigate(['/not-found'], {skipLocationChange: true})
    })

    this.setTitle();

    this.langSub = translateService.onLangChange.subscribe( () =>
    {
      this.setTitle();
    } )

    this.satoshiService = satoshiToBtc;
    this.dateFormatter = dateFormatter;
    this.priceService = priceService;
   }

  async ngOnInit(): Promise<void> {
  
    if (Keys.ValidateBitcoinAddress(this.address))
    {
      try
      {
        let result = await this.transactionApi.getSingleAddressData(this.address);

        this.addressModel = result?.addressModel;

        if (result?.transactionModels)
        {
          this.transactions = result?.transactionModels.map( (t) => new TransactionViewModel(t) )
        }
      }
      catch(err)
      {
        this.errorCallingApi = true;
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

  setTitle()
  {
    this.translateService.get("explorer.address.title").subscribe( str =>
    {
      this.title.setTitle(str+this.address)
    } )

    
  }
}
