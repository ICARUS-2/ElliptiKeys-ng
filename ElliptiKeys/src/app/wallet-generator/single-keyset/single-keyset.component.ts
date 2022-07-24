import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ADDRESS_TYPES } from 'lib/address-types';
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

  constructor() { 

  }

  ngOnInit(): void {

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
