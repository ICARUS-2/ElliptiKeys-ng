import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap/nav/nav.module';
import { OnlineStatusService, OnlineStatusType } from "ngx-online-status";
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wallet-generator-index',
  templateUrl: './wallet-generator-index.component.html',
  styleUrls: ['./wallet-generator-index.component.css']
})
export class WalletGeneratorIndexComponent implements OnInit, OnDestroy {
  
  //The current navtab (single address, bulk gen, BIP-39 mnemonic)
  active = 1;

  connectionStatus: OnlineStatusType = this.onlineStatusService.getStatus(); // get initial status

  langSub: Subscription;

  constructor(
    private onlineStatusService: OnlineStatusService, 
    private title: Title,
    private translateService: TranslateService
    ) 
  {
    this.onlineStatusService.status.subscribe((status: OnlineStatusType) => {
      // use status
      this.connectionStatus = status;
    });

    this.setTitle()

    this.langSub = this.translateService.onLangChange.subscribe( ()=>
    {
      this.setTitle();
    } )
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.langSub.unsubscribe();
  }

  handleNetworkAlertCleared()
  {
    let element = document.getElementById("onlineAlert");

    if (element != null)
    {
      element.style.display = "none";
    }
  }

  setTitle()
  {
    this.translateService.get("walletGenerator.index.title").subscribe( str =>
    {
      this.title.setTitle(str);
    } )
  }
}
