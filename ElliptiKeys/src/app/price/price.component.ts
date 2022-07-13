import { Component, OnInit } from '@angular/core';
import { PriceService } from '../services/price.service';
import PriceViewModel from '../../../models/price-view-model';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {

  price: object = {}
  priceModel: PriceViewModel = new PriceViewModel()
  priceService: PriceService
  showPrice: boolean = false;
  constructor(priceService: PriceService, private router: Router) { 
    this.priceService = priceService;
  }

  async ngOnInit(): Promise<void> {

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe( async (event) => {
      this.price = await this.priceService.GetPrice();

      //@ts-ignore
      if (this.price["bitcoin"])
      {
        //@ts-ignore
        if (this.price["bitcoin"]["usd"] && this.price["bitcoin"]["usd_24h_change"])
        {
          this.showPrice = true;
          //@ts-ignore
          this.priceModel.changePercentage = this.price["bitcoin"]["usd_24h_change"].toFixed(2).toString()
          
          //@ts-ignore
          this.priceModel.usdPrice = this.price["bitcoin"]["usd"].toString();
        }
      }
    });
  
  }

}
