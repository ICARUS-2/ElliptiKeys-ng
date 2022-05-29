import { Component, OnInit } from '@angular/core';
import { PriceService } from './../services/price.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  price: object = {}
  priceService: PriceService

  constructor(priceService: PriceService) { 
    this.priceService = priceService;
  }

  async ngOnInit(): Promise<void> {
    //window.localStorage.clear()
    this.price = await this.priceService.GetPrice();

    console.log(this.price)
  }

}
