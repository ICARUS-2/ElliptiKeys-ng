import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import PageHelper from './../../../lib/page-helper';
import { Router } from '@angular/router';
import Keys from '../../../lib/keys/Keys';

@Component({
    selector: 'app-random',
    templateUrl: './random.component.html',
    styleUrls: ['./random.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class RandomComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    let pageNum:BigInt = BigInt(PageHelper.CalculatePageNumber(Keys.GetNumberFromPrivateKey(Keys.GenerateRandomPrivateKey())))

    this.router.navigate(["/bitcoin/"+pageNum])
  }

}
