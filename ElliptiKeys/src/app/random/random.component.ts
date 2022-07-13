import { Component, OnInit } from '@angular/core';
import Keys from 'lib/Keys';
import PageHelper from './../../../lib/page-helper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css']
})
export class RandomComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    let pageNum:BigInt = BigInt(PageHelper.CalculatePageNumber(Keys.GetNumberFromPrivateKey(Keys.GenerateRandomPrivateKey())))

    this.router.navigate(["/bitcoin/"+pageNum])
  }

}
