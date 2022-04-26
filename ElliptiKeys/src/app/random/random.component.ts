import { Component, OnInit } from '@angular/core';
import Keys from 'lib/Keys';
import PageHelper from './../../../lib/page-helper';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css']
})
export class RandomComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let pageNum:BigInt = BigInt(PageHelper.CalculatePageNumber(Keys.GetNumberFromPrivateKey(Keys.GenerateRandomPrivateKey())))

    window.location.href = "/bitcoin/"+pageNum
  }

}
