import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-explorer-address',
  templateUrl: './explorer-address.component.html',
  styleUrls: ['./explorer-address.component.css']
})
export class ExplorerAddressComponent implements OnInit {

  address: string = "";
  addressModel: AddressModel | undefined;
  transactions: TransactionViewModel[] = [];
  isTestnet: Boolean = false;
  errorCallingApi: Boolean = false;

  satoshiService: SatoshiToBitcoinService;
  dateFormatter: DateFormatterService;
  priceService: PriceService;

  transactionApi: TransactionApi = new TransactionApi();

  constructor(private activeRoute: ActivatedRoute, 
    private router: Router, 
    private title: Title, 
    satoshiToBtc: SatoshiToBitcoinService,
    dateFormatter: DateFormatterService,
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

    title.setTitle("Address: " + this.address)
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
}
