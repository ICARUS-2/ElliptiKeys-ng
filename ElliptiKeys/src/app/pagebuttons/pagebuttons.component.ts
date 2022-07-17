import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import PageHelper from 'lib/page-helper';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pagebuttons',
  templateUrl: './pagebuttons.component.html',
  styleUrls: ['./pagebuttons.component.css']
})
export class PagebuttonsComponent implements OnInit {
  pageNumber: BigInt=BigInt('1')

  firstPage: BigInt = BigInt('1')
  nextPage: BigInt = BigInt('1')
  previousPage: BigInt = BigInt('1')
  lastPage: BigInt = BigInt('1')

  isFirstPage: Boolean = false;
  isLastPage: Boolean = false;
  
  isTestnet: Boolean = false;

  constructor(private router: Router, private activeRoute: ActivatedRoute) { 
    activeRoute.data.subscribe( (d) => 
    {
      if (d["isTestnet"])
        this.isTestnet = d["isTestnet"]
    } )
  }

  ngOnInit(): void {

    if (!this.isTestnet)
      this.pageNumber = BigInt(window.location.href.split('bitcoin/')[1])
    else
      this.pageNumber = BigInt(window.location.href.split('testnet/')[1])

    this.firstPage = BigInt("1");
    this.lastPage = BigInt(PageHelper.GetMaxPage())
    this.nextPage = BigInt(this.pageNumber.toString()) + BigInt('1')
    this.previousPage = BigInt(this.pageNumber.toString()) - BigInt('1')

    this.isFirstPage = this.pageNumber == BigInt('1')
    this.isLastPage = this.pageNumber == PageHelper.GetMaxPage()
  }

  makePageLink(pageNum:BigInt)
  {
    let versionPrefix = this.isTestnet ? "/testnet/" : "/bitcoin/"

    return versionPrefix+pageNum.toString();
  }
}
