import { Component, OnInit } from '@angular/core';
import LocalStorageHelper from 'lib/localstorage-helper';

@Component({
  selector: 'app-page-stat-tracker',
  templateUrl: './page-stat-tracker.component.html',
  styleUrls: ['./page-stat-tracker.component.css']
})
export class PageStatTrackerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if (!this.getBitcoinAddressesChecked())
    {
      LocalStorageHelper.SetMainnetBalancesChecked("0");
    }

    if (!this.getTestnetAddressesChecked())
    {
      LocalStorageHelper.SetTestnetBalancesChecked("0");
    }
  }

  getBitcoinAddressesChecked()
  {
    return LocalStorageHelper.GetMainnetBalancesChecked();
  }

  getTestnetAddressesChecked()
  {
    return LocalStorageHelper.GetTestnetBalancesChecked();
  }
}
