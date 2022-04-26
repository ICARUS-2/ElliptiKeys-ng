import { Component, OnInit } from '@angular/core';
import PageHelper from 'lib/page-helper';
import KeyRowModel from './../../../models/key-row-model';

@Component({
  selector: 'app-keyspage',
  templateUrl: './keyspage.component.html',
  styleUrls: ['./keyspage.component.css']
})

export class KeyspageComponent implements OnInit {

  pageNumber:BigInt = BigInt("0");
  maxPageNumber: BigInt = BigInt("0");

  keys: KeyRowModel[] = []

  constructor() { }

  ngOnInit(): void {
    this.pageNumber = BigInt(window.location.href.split('bitcoin/')[1])
    this.maxPageNumber = BigInt(PageHelper.GetMaxPage())

    if (this.pageNumber > this.maxPageNumber)
      window.location.href = "/too-far"

      this.keys = PageHelper.GetKeysForPage(this.pageNumber)
  }


}
