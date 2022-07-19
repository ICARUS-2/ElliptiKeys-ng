import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Keys from './../../../../lib/Keys';
import BalanceApi from './../../../../lib/balance-api';
import KeysHelper from './../../../../lib/keys-helper';
import AddressModel from './../../../../models/address-model';
import { Title } from '@angular/platform-browser';
import TransactionApi from './../../../../lib/transaction-api';
import TransactionViewModel from './../../../../models/transaction-view-model';
import { SatoshiToBitcoinService } from 'src/app/services/satoshi-to-bitcoin.service';
import { URLS } from './../../../../lib/urls';

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

  transactionApi: TransactionApi = new TransactionApi();

  constructor(private activeRoute: ActivatedRoute, private router: Router, private title: Title, satoshiToBtc: SatoshiToBitcoinService) {
    activeRoute.params.subscribe( (d)=> 
    {
      if (d["id"])
        this.address = d["id"]

      this.isTestnet = KeysHelper.IsAddressTestnet(this.address)
      let isUrlTestnet = window.location.href.includes("/testnet");


      //If URL does not match the requested address, navigate away.
      if (this.isTestnet != isUrlTestnet)
        router.navigate(['/not-found'])
    })

    title.setTitle("Address: " + this.address)
    this.satoshiService = satoshiToBtc;
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
          console.log(this.transactions)
        }
      }
      catch(err)
      {
        this.errorCallingApi = true;
      }
    }
    else
    {
      this.router.navigate(["/not-found"])
    }

  }

  getAddressExplorerLink(addr: string)
  {
    return this.isTestnet ? URLS.BASE_TESTNET_EXPLORER_URL+addr : URLS.BASE_EXPLORER_URL+addr
  }

}
