import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Keys from 'lib/Keys';
import PageHelper from 'lib/page-helper';

@Component({
  selector: 'app-testnet-random',
  templateUrl: './testnet-random.component.html',
  styleUrls: ['./testnet-random.component.css']
})
export class TestnetRandomComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    let pageNum:BigInt = BigInt(PageHelper.CalculatePageNumber(Keys.GetNumberFromPrivateKey(Keys.GenerateRandomPrivateKey())))

    this.router.navigate(["/testnet/"+pageNum])
  }
}
