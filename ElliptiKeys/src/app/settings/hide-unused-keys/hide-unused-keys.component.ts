import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import LocalStorageHelper from 'lib/localstorage-helper';

@Component({
  selector: 'app-hide-unused-keys',
  templateUrl: './hide-unused-keys.component.html',
  styleUrls: ['./hide-unused-keys.component.css']
})
export class HideUnusedKeysComponent implements OnInit {

  hideUnusedKeysFormControl: FormControl;

  constructor()
  {
    this.hideUnusedKeysFormControl = new FormControl(LocalStorageHelper.GetHideUnusedKeys())

  }

  ngOnInit(): void {
  }

  onHideUnusedComponentRadioButtonChanged(event: any)
  {
    let val: boolean = event.target.value == "true"

    this.hideUnusedKeysFormControl.setValue(val)
    LocalStorageHelper.SetHideUnusedKeys(val)
  }

}
