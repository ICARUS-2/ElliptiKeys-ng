import { Component, Input, OnInit } from '@angular/core';
import { KEY_STATUS_DISPLAY_TYPES } from 'lib/dictionaries/key-status-display-types';
import LocalStorageHelper from 'lib/localstorage-helper';

@Component({
  selector: 'app-current-page-stats-display',
  templateUrl: './current-page-stats-display.component.html',
  styleUrls: ['./current-page-stats-display.component.css']
})
export class CurrentPageStatsDisplayComponent implements OnInit {

  @Input() redCounter: number = 0;
  @Input() yellowCounter: number = 0;
  @Input() greenCounter: number = 0;

  displayTypes = KEY_STATUS_DISPLAY_TYPES;
  
  constructor() { }

  ngOnInit(): void {
  }

  getCurrentDisplayType() : string
  {
    return LocalStorageHelper.GetKeyStatusDisplayType();
  }

}
