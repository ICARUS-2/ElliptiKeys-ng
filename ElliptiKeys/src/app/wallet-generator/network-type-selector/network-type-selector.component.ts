import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NETWORK_TYPES } from './../../../../lib/network-types';

@Component({
  selector: 'app-network-type-selector',
  templateUrl: './network-type-selector.component.html',
  styleUrls: ['./network-type-selector.component.css']
})
export class NetworkTypeSelectorComponent implements OnInit {
  
  networkFormControl: FormControl;
  networkTypes = NETWORK_TYPES;

  radioName: string = Math.random().toString();

  static DEFAULT_VALUE = NETWORK_TYPES.bitcoin;

  @Output() itemChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor() 
  {
    this.networkFormControl = new FormControl(NetworkTypeSelectorComponent.DEFAULT_VALUE);
  }

  ngOnInit(): void 
  {
  
  }
  
  onRadioButtonChanged()
  {
    this.itemChanged.emit(this.networkFormControl.value)
  }
}
