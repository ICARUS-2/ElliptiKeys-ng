import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import TransactionViewModel from 'models/transaction-view-model';
import  TransactionApi from './../../../../lib/transaction-api';

@Component({
  selector: 'app-explorer-transaction',
  templateUrl: './explorer-transaction.component.html',
  styleUrls: ['./explorer-transaction.component.css']
})
export class ExplorerTransactionComponent implements OnInit {
  isTestnet: boolean = false;
  key: string = ""
  transaction: TransactionViewModel[] = [];

  constructor(private activeRoute: ActivatedRoute, private router: Router, private title: Title) 
  {
    activeRoute.params.subscribe( (d)=> 
    {
      if (d["id"])
        this.key = d["id"]

    })
    this.isTestnet = window.location.href.includes("/testnet");

    title.setTitle("Transaction: " + this.key)
  }

  async ngOnInit(): Promise<void> {
    let transactionApi = new TransactionApi()

    let result = await transactionApi.getSingleTransactionData(this.key, this.isTestnet);

    if (result == undefined)
      this.router.navigate(["/not-found"], {skipLocationChange: true} )
    else
      this.transaction.push(new TransactionViewModel(result))
  }

}
