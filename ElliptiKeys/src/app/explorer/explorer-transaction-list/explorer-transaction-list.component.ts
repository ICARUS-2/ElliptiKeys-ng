import { Component, Input, OnInit } from '@angular/core';
import { URLS } from 'lib/urls';
import TransactionViewModel from 'models/transaction-view-model';
import { DateFormatterService } from 'src/app/services/date-formatter.service';
import { SatoshiToBitcoinService } from 'src/app/services/satoshi-to-bitcoin.service';

@Component({
  selector: 'app-explorer-transaction-list',
  templateUrl: './explorer-transaction-list.component.html',
  styleUrls: ['./explorer-transaction-list.component.css']
})
export class ExplorerTransactionListComponent implements OnInit {

  @Input() transactions: TransactionViewModel[] = []
  @Input() isTestnet: Boolean = false;

  satoshiService: SatoshiToBitcoinService;
  dateFormatter: DateFormatterService;
  page: number= 1;
  pageSize: number = 5;

  constructor(satoshiToBtc: SatoshiToBitcoinService, dateFormatter: DateFormatterService) 
  {
    this.satoshiService = satoshiToBtc;
    this.dateFormatter = dateFormatter;
   }

  ngOnInit(): void {
  }

  getAddressExplorerLink(addr: string)
  {
    return this.isTestnet ? URLS.BASE_TESTNET_EXPLORER_URL+addr : URLS.BASE_EXPLORER_URL+addr
  }

}
