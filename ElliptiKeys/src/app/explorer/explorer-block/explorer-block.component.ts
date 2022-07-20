import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import KeysHelper from 'lib/keys-helper';
import TransactionApi from 'lib/transaction-api';
import BlockModel from 'models/block-model';
import { DateFormatterService } from 'src/app/services/date-formatter.service';
import TransactionViewModel  from 'models/transaction-view-model';
import { SatoshiToBitcoinService } from 'src/app/services/satoshi-to-bitcoin.service';

@Component({
  selector: 'app-explorer-block',
  templateUrl: './explorer-block.component.html',
  styleUrls: ['./explorer-block.component.css']
})
export class ExplorerBlockComponent implements OnInit {

  isTestnet: boolean = false;
  blockNum: number = 0;
  blockModel: BlockModel | undefined;
  transactions: TransactionViewModel[] = [];

  satoshiService: SatoshiToBitcoinService;
  dateFormatter: DateFormatterService;

  constructor(private activeRoute: ActivatedRoute, private router: Router, private title: Title, dfs: DateFormatterService, ss: SatoshiToBitcoinService) 
  {
    activeRoute.params.subscribe( (d)=> 
    {
      if (d["id"])
        this.blockNum = d["id"]

      this.isTestnet = window.location.href.includes("/testnet");
    })

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

}
