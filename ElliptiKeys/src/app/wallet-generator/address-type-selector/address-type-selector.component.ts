import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ADDRESS_TYPES } from 'lib/address-types';

@Component({
  selector: 'app-address-type-selector',
  templateUrl: './address-type-selector.component.html',
  styleUrls: ['./address-type-selector.component.css']
})
export class AddressTypeSelectorComponent implements OnInit {
  
  addressFormControl: FormControl;
  addressTypes = ADDRESS_TYPES;

  static DEFAULT_VALUE = ADDRESS_TYPES.segwit;
  
  @Output() itemChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor() 
  {
    this.addressFormControl = new FormControl(AddressTypeSelectorComponent.DEFAULT_VALUE)
  }

  ngOnInit(): void {
  }

  onRadioButtonChanged()
  {
    this.itemChanged.emit(this.addressFormControl.value)
  }

}
