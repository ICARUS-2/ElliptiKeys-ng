import { Component, OnInit } from '@angular/core';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap/nav/nav.module';

@Component({
  selector: 'app-wallet-generator-index',
  templateUrl: './wallet-generator-index.component.html',
  styleUrls: ['./wallet-generator-index.component.css']
})
export class WalletGeneratorIndexComponent implements OnInit {
  active = 1;
  constructor() { 

  }

  ngOnInit(): void {
  }

}
