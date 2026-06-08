import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import BlockModel from '../../../../models/block-model';
import TransactionViewModel from '../../../../models/transaction-view-model';
import { SatoshiToBitcoinService } from '../../services/satoshi-to-bitcoin/satoshi-to-bitcoin.service';
import { DateFormatterService } from '../../services/date-formatter/date-formatter.service';
import TransactionApi from '../../../../lib/transaction-api';

@Component({
    selector: 'app-explorer-block',
    templateUrl: './explorer-block.component.html',
    styleUrls: ['./explorer-block.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ExplorerBlockComponent implements OnInit, OnDestroy {

  isTestnet: boolean = false;
  blockNum: number = 0;
  blockModel: BlockModel | undefined;
  transactions: TransactionViewModel[] = [];

  satoshiService: SatoshiToBitcoinService;
  dateFormatter: DateFormatterService;

  langSub: Subscription;

  constructor(
    private activeRoute: ActivatedRoute, 
    private router: Router, 
    private title: Title, 
    private translateService: TranslateService,
    dfs: DateFormatterService, 
    ss: SatoshiToBitcoinService) 
  {
    activeRoute.params.subscribe( (d)=> 
    {
      if (d["id"])
        this.blockNum = d["id"]

      this.isTestnet = window.location.href.includes("/testnet");
    })

    this.setTitle();

    this.langSub = translateService.onLangChange.subscribe( () =>
    {
      this.setTitle();
    } )

    this.dateFormatter = dfs;
    this.satoshiService = ss;
  }

  async ngOnInit(): Promise<void> {
    let transactionApi = new TransactionApi();

    this.blockModel = await transactionApi.getSingleBlockData(this.blockNum, this.isTestnet);
    
    if (this.blockModel != undefined)
    {
      this.transactions = this.blockModel?.transactions.map( (t) => new TransactionViewModel(t))
    }
    else
    {
      this.router.navigate(["/not-found"], {skipLocationChange: true})
    }
      
    this.title.setTitle("Block: "+this.blockNum)
  }

  ngOnDestroy(): void {
    this.langSub.unsubscribe();
  }

  setTitle()
  {
    this.translateService.get("explorer.block.title").subscribe( str =>
      {
        this.title.setTitle(str+this.blockNum)
      } )
  }
}
