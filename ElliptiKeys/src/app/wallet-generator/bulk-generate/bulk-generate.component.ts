import { Component, OnInit } from '@angular/core';
import { ADDRESS_TYPES } from 'lib/address-types';
import { AddressTypeSelectorComponent } from '../address-type-selector/address-type-selector.component';
import { NetworkTypeSelectorComponent } from '../network-type-selector/network-type-selector.component';

@Component({
  selector: 'app-bulk-generate',
  templateUrl: './bulk-generate.component.html',
  styleUrls: ['./bulk-generate.component.css']
})
export class BulkGenerateComponent implements OnInit {

  addressTypes = ADDRESS_TYPES;

  networkType: string = NetworkTypeSelectorComponent.DEFAULT_VALUE;
  selectedAddressType: string = AddressTypeSelectorComponent.DEFAULT_VALUE;

  constructor() { }

  ngOnInit(): void {
  }

}
