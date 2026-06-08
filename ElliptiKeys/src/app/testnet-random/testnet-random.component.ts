import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import PageHelper from '../../../lib/page-helper';
import Keys from '../../../lib/keys/Keys';

@Component({
    selector: 'app-testnet-random',
    templateUrl: './testnet-random.component.html',
    styleUrls: ['./testnet-random.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class TestnetRandomComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    let pageNum:BigInt = BigInt(PageHelper.CalculatePageNumber(Keys.GetNumberFromPrivateKey(Keys.GenerateRandomPrivateKey())))

    this.router.navigate(["/testnet/"+pageNum])
  }
}
