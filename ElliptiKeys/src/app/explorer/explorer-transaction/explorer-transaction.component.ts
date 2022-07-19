import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import KeysHelper from 'lib/keys-helper';

@Component({
  selector: 'app-explorer-transaction',
  templateUrl: './explorer-transaction.component.html',
  styleUrls: ['./explorer-transaction.component.css']
})
export class ExplorerTransactionComponent implements OnInit {
  isTestnet: boolean = false;
  key: string = ""

  constructor(private activeRoute: ActivatedRoute, private router: Router, private title: Title) 
  {
    activeRoute.params.subscribe( (d)=> 
    {
      if (d["id"])
        this.key = d["id"]

    })

    title.setTitle("Transaction: " + this.key)
  }

  ngOnInit(): void {
  }

}
