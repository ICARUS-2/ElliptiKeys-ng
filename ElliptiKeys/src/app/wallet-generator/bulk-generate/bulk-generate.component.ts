import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ADDRESS_TYPES } from 'lib/dictionaries/address-types';
import { NETWORK_TYPES } from 'lib/dictionaries/network-types';
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
  maxGen: number;

  addressTypes = ADDRESS_TYPES;

  networkType: string = NetworkTypeSelectorComponent.DEFAULT_VALUE;
  selectedAddressType: string = AddressTypeSelectorComponent.DEFAULT_VALUE;

  isCurrentlyGenerating: boolean = false;

  qtyToGenerate: number = 10;

  displayedKeys: SingleAddressModel[] = [];

  countErrorMessage: string = "";

  constructor() { 
    this.maxGen = BulkGenerateComponent.MAX_GEN;
  }

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

  bulkGenerate()
  {
    if (this.qtyToGenerate == null || this.qtyToGenerate > BulkGenerateComponent.MAX_GEN || this.qtyToGenerate <=0)
    {
      this.countErrorMessage = "Quantity must be a number between 0 and "+ BulkGenerateComponent.MAX_GEN;
      return;
    }
    
    try
    {

      let isTestnet: boolean = this.networkType == NETWORK_TYPES.testnet;

      this.isCurrentlyGenerating = true;


      if (typeof Worker !== 'undefined') {
        // Create a new
        const worker = new Worker(new URL('./bg.worker', import.meta.url));
        
        worker.onmessage = ({ data }) => {
          
          this.displayedKeys = data.map( (e: any) => 
          {
            let model = new SingleAddressModel();
            model.address = e.address;
            model.privateKey = e.privateKey;

            return model;
          }
          )

          this.isCurrentlyGenerating = false;
        };

        //Send the parameters to the web worker
        worker.postMessage({ isTestnet: isTestnet, selectedAddressType : this.selectedAddressType, qtyToGenerate : this.qtyToGenerate });
      } else {
        alert("Your browser does not support this operation (Web Worker not found)")
      }

      
      /*
      for(let i = 0; i < this.qtyToGenerate; i++)
      {
        tempArr.push( SingleAddressModel.create(isTestnet, this.selectedAddressType) )
      }
      */

    }
    catch(err)
    {
      alert("An error occurred while generating the keys")
      this.isCurrentlyGenerating = true;
    }
  }

  getIsTestnet() : boolean
  {
    return this.networkType == NETWORK_TYPES.testnet;
  }
}
