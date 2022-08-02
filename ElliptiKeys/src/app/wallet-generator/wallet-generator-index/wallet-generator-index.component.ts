import { Component, OnInit } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap/nav/nav.module';
import { OnlineStatusService, OnlineStatusType } from "ngx-online-status";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-wallet-generator-index',
  templateUrl: './wallet-generator-index.component.html',
  styleUrls: ['./wallet-generator-index.component.css']
})
export class WalletGeneratorIndexComponent implements OnInit {
  
  //The current navtab (single address, bulk gen, BIP-39 mnemonic)
  active = 1;

  connectionStatus: OnlineStatusType = this.onlineStatusService.getStatus(); // get initial status

  constructor(private onlineStatusService: OnlineStatusService, private title: Title) {
    this.onlineStatusService.status.subscribe((status: OnlineStatusType) => {
      // use status
      this.connectionStatus = status;
    });


    title.setTitle("ElliptiKeys Wallet Generator")
  }

  ngOnInit(): void {
  }

  handleNetworkAlertCleared()
  {
    let element = document.getElementById("onlineAlert");

    if (element != null)
    {
      element.style.display = "none";
    }
  }
}
