import { Component, OnInit } from '@angular/core';
import PageHelper from 'lib/page-helper';
import KeyRowModel from './../../../models/key-row-model';
import { Title } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-keyspage',
  templateUrl: './keyspage.component.html',
  styleUrls: ['./keyspage.component.css']
})

export class KeyspageComponent implements OnInit {

  pageNumber:BigInt = BigInt("0");
  maxPageNumber: BigInt = BigInt("0");

  keys: KeyRowModel[] = []

  constructor(private titleService:Title) { }

  ngOnInit(): void {

    try
    {
      this.pageNumber = BigInt(window.location.href.split('bitcoin/')[1])
    }
    catch(err)
    {
      window.location.href = "/not-found"
    }

    console.log(this.pageNumber)

    this.maxPageNumber = BigInt(PageHelper.GetMaxPage())

    if (this.pageNumber == BigInt('1'))
      this.titleService.setTitle("First page of Bitcoin keys")
    else if (this.pageNumber == this.maxPageNumber)
      this.titleService.setTitle("Last page of Bitcoin keys")
    else
      this.titleService.setTitle(`Bitcoin keys page ${this.pageNumber} of ${this.maxPageNumber}`)

    if (this.pageNumber > this.maxPageNumber)
      window.location.href = "/too-far"

    

      this.keys = PageHelper.GetKeysForPage(this.pageNumber)
  }


}
