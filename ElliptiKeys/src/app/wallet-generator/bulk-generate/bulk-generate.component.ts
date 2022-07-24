import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ADDRESS_TYPES } from 'lib/address-types';
import { NETWORK_TYPES } from 'lib/network-types';
import { AddressTypeSelectorComponent } from '../address-type-selector/address-type-selector.component';
import { NetworkTypeSelectorComponent } from '../network-type-selector/network-type-selector.component';
import SingleAddressModel from './../../../../models/single-address-model';

@Component({
  selector: 'app-bulk-generate',
  templateUrl: './bulk-generate.component.html',
  styleUrls: ['./bulk-generate.component.css']
})
export class BulkGenerateComponent implements OnInit {

  static MAX_GEN = 20000;

  addressTypes = ADDRESS_TYPES;

  networkType: string = NetworkTypeSelectorComponent.DEFAULT_VALUE;
  selectedAddressType: string = AddressTypeSelectorComponent.DEFAULT_VALUE;

  isCurrentlyGenerating: boolean = false;

  qtyToGenerate: number = 10;

  displayedKeys: SingleAddressModel[] = [];

  countErrorMessage: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  networkTypeChanged(value: string)
  {
    this.networkType = value;
  }

  addressTypeChanged(value: string)
  {
    this.selectedAddressType = value;
  }

  async bulkGenerate()
  {
    if (this.qtyToGenerate == null || this.qtyToGenerate > BulkGenerateComponent.MAX_GEN || this.qtyToGenerate <=0)
    {
      this.countErrorMessage = "Quantity must be a number between 0 and "+ BulkGenerateComponent.MAX_GEN;
      return;
    }
    
    let isTestnet: boolean = this.networkType == NETWORK_TYPES.testnet;

    let tempArr: SingleAddressModel[] = []

    this.isCurrentlyGenerating = true;

    for(let i = 0; i < this.qtyToGenerate; i++)
    {
      tempArr.push( SingleAddressModel.create(isTestnet, this.selectedAddressType) )
    }

    this.isCurrentlyGenerating = false;

    this.displayedKeys = tempArr;
  }

}
