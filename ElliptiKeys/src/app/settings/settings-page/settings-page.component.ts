import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import LocalStorageHelper from 'lib/localstorage-helper';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {

  hideUnusedKeysFormControl: FormControl;

  constructor() 
  {
    this.hideUnusedKeysFormControl = new FormControl(LocalStorageHelper.GetHideUnusedKeys())
  }

  ngOnInit(): void {
  }

  onHideUnusedComponentRadioButtonChanged(event: any)
  {
    let val = event.target.value == "true"

    console.log(val)

    this.hideUnusedKeysFormControl.setValue(val)
    LocalStorageHelper.SetHideUnusedKeys(val)
  }
}
