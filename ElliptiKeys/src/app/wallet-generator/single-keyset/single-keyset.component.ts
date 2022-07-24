import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ADDRESS_TYPES } from 'lib/address-types';
import Keys from 'lib/keys/Keys';
import { QR_ERROR_CORRECTION } from 'lib/qr-error-correction';
import { AddressTypeSelectorComponent } from '../address-type-selector/address-type-selector.component';
import { QrCodeTypeSelectorComponent } from './../qr-code-type-selector/qr-code-type-selector.component';
import { NETWORK_TYPES } from './../../../../lib/network-types';
import { NetworkTypeSelectorComponent } from './../network-type-selector/network-type-selector.component';
import { QRCodeErrorCorrectionLevel } from 'angularx-qrcode';
import SingleAddressModel from './../../../../models/single-address-model';

@Component({
  selector: 'app-single-keyset',
  templateUrl: './single-keyset.component.html',
  styleUrls: ['./single-keyset.component.css']
})
export class SingleKeysetComponent implements OnInit {

  addressTypes = ADDRESS_TYPES;

  networkType: string = NetworkTypeSelectorComponent.DEFAULT_VALUE;
  selectedAddressType: string = AddressTypeSelectorComponent.DEFAULT_VALUE;
  qrCodeType: string = QrCodeTypeSelectorComponent.DEFAULT_VALUE;

  address: string = "";
  privateKey: string = "";  

  ngOnInit(): void 
  {
    this.makeNewKeyset();
  }

  getQrCodeType() : QRCodeErrorCorrectionLevel
  {
    return this.qrCodeType as QRCodeErrorCorrectionLevel;
  }

  makeNewKeyset()
  {
    let isTestnet: boolean = this.networkType == NETWORK_TYPES.testnet;

    let model = SingleAddressModel.create(isTestnet, this.selectedAddressType);

    this.address = model.address;
    this.privateKey = model.privateKey;
  }

  networkTypeChanged(value: string)
  {
    this.networkType = value;
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
