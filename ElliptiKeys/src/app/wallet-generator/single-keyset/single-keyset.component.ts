import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ADDRESS_TYPES } from 'lib/address-types';
import Keys from 'lib/keys/Keys';
import { QR_ERROR_CORRECTION } from 'lib/qr-error-correction';
import { AddressTypeSelectorComponent } from '../address-type-selector/address-type-selector.component';
import { QrCodeTypeSelectorComponent } from './../qr-code-type-selector/qr-code-type-selector.component';

@Component({
  selector: 'app-single-keyset',
  templateUrl: './single-keyset.component.html',
  styleUrls: ['./single-keyset.component.css']
})
export class SingleKeysetComponent implements OnInit {

  addressTypes = ADDRESS_TYPES;

  selectedAddressType: string = AddressTypeSelectorComponent.DEFAULT_VALUE;
  qrCodeType: string = QrCodeTypeSelectorComponent.DEFAULT_VALUE;

  address: string = "";
  privateKey: string = "";

  constructor() { 

  }

  ngOnInit(): void 
  {

  }

  makeNewKeyset()
  {
    /*switch(this.selectedAddressType)
    {
      case this.addressTypes.legacy:
        this.privateKey = Keys.GenerateRandomPrivateKey();
        this.address = Keys.PrivateK
    }*/
  }

  addressTypeChanged(value: string)
  {
    this.selectedAddressType = value;
  }

  qrCodeTypeChanged(value: string)
  {
    this.qrCodeType = value;
  }

}
