import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import TransactionViewModel from 'models/transaction-view-model';
import  TransactionApi from './../../../../lib/transaction-api';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-explorer-transaction',
  templateUrl: './explorer-transaction.component.html',
  styleUrls: ['./explorer-transaction.component.css']
})
export class ExplorerTransactionComponent implements OnInit, OnDestroy {
  isTestnet: boolean = false;
  key: string = ""
  transaction: TransactionViewModel[] = [];
  
  langSub: Subscription;

  constructor(
    private activeRoute: ActivatedRoute, 
    private router: Router, 
    private title: Title,
    private translateService: TranslateService) 
  {
    activeRoute.params.subscribe( (d)=> 
    {
      if (d["id"])
        this.key = d["id"]

    })
    this.isTestnet = window.location.href.includes("/testnet");

    this.setTitle();

    this.langSub = this.translateService.onLangChange.subscribe( () =>
    {
      this.setTitle();
    } )
  }

  async ngOnInit(): Promise<void> {
    let transactionApi = new TransactionApi()

    let result = await transactionApi.getSingleTransactionData(this.key, this.isTestnet);

    if (result == undefined)
      this.router.navigate(["/not-found"], {skipLocationChange: true} )
    else
      this.transaction.push(new TransactionViewModel(result))
  }

  ngOnDestroy(): void {
    this.langSub.unsubscribe();
  }

  setTitle()
  {
    this.translateService.get("explorer.transaction.title").subscribe( str =>
      {
        this.title.setTitle(str+this.key)
      } )
  }
}
