import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { KEY_STATUS_DISPLAY_TYPES } from 'lib/dictionaries/key-status-display-types';
import LocalStorageHelper from 'lib/localstorage-helper';

@Component({
  selector: 'app-key-status-display-type',
  templateUrl: './key-status-display-type.component.html',
  styleUrls: ['./key-status-display-type.component.css']
})
export class KeyStatusDisplayTypeComponent implements OnInit {

  formName: string = Math.random().toString();
  keyStatusDisplayType: FormControl;
  types = KEY_STATUS_DISPLAY_TYPES;

  constructor() 
  {
    this.keyStatusDisplayType = new FormControl(LocalStorageHelper.GetKeyStatusDisplayType());
  }

  ngOnInit(): void {
  }

  onKeyStatusDisplayTypeRadioButtonChanged(event: any) : void 
  {
    let val: string = event.target.value;
    
    LocalStorageHelper.SetKeyStatusDisplayType(val);
  }

}
