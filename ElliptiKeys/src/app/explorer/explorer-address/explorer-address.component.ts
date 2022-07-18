import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Keys from './../../../../lib/Keys';
import BalanceApi from './../../../../lib/balance-api';
import AddressHelper from './../../../../lib/address-helper';
import AddressModel from './../../../../models/address-model';

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

  //@ts-ignore
  balanceApi: BalanceApi;

  constructor(private activeRoute: ActivatedRoute, private router: Router) {
    activeRoute.params.subscribe( (d)=> 
    {
      if (d["id"])
        this.address = d["id"]

      this.isTestnet = AddressHelper.IsAddressTestnet(this.address)
      let isUrlTestnet = window.location.href.includes("/testnet");

      //If URL does not match the requested address, navigate away.
      if (this.isTestnet != isUrlTestnet)
        router.navigate(['/not-found'])
    })
   }

  async ngOnInit(): Promise<void> {
  
    if (Keys.ValidateBitcoinAddress(this.address))
    {
      this.balanceApi = new BalanceApi(this.isTestnet);
      this.balanceApi.addAddress(this.address);

      try
      {
        await this.balanceApi.doApiRequest();

        this.addressModel = this.balanceApi.getAddressModel(this.address)

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
