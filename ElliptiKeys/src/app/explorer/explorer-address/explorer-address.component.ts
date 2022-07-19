import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Keys from './../../../../lib/Keys';
import BalanceApi from './../../../../lib/balance-api';
import KeysHelper from './../../../../lib/keys-helper';
import AddressModel from './../../../../models/address-model';
import { Title } from '@angular/platform-browser';
import TransactionApi from './../../../../lib/transaction-api';

@Component({
  selector: 'app-explorer-address',
  templateUrl: './explorer-address.component.html',
  styleUrls: ['./explorer-address.component.css']
})
export class ExplorerAddressComponent implements OnInit {

  address: string = "";
  addressModel: AddressModel | undefined;
  isTestnet: Boolean = false;
  errorCallingApi: Boolean = false;

  transactionApi: TransactionApi = new TransactionApi();

  constructor(private activeRoute: ActivatedRoute, private router: Router, private title: Title) {
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
   }

  async ngOnInit(): Promise<void> {
  
    if (Keys.ValidateBitcoinAddress(this.address))
    {
      try
      {
        let result = await this.transactionApi.getSingleAddressData(this.address);

        this.addressModel = result?.addressModel;

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

}
