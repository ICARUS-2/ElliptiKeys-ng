import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AddressTypeSelectorComponent } from '../address-type-selector/address-type-selector.component';
import { QrCodeTypeSelectorComponent } from './../qr-code-type-selector/qr-code-type-selector.component';
import { NETWORK_TYPES } from '../../../../lib/dictionaries/network-types';
import { NetworkTypeSelectorComponent } from './../network-type-selector/network-type-selector.component';
import SingleAddressModel from './../../../../models/single-address-model';
import { ADDRESS_TYPES } from '../../../../lib/dictionaries/address-types';
import { QR_ERROR_CORRECTION } from '../../../../lib/dictionaries/qr-error-correction';

@Component({
    selector: 'app-single-keyset',
    templateUrl: './single-keyset.component.html',
    styleUrls: ['./single-keyset.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SingleKeysetComponent implements OnInit {

  addressTypes = ADDRESS_TYPES;

  networkType: string = NetworkTypeSelectorComponent.DEFAULT_VALUE;
  selectedAddressType: string = AddressTypeSelectorComponent.DEFAULT_VALUE;
  qrCodeType: string = QrCodeTypeSelectorComponent.DEFAULT_VALUE;

  model: SingleAddressModel = new SingleAddressModel();

  ngOnInit(): void 
  {
    this.makeNewKeyset();
  }

  getQrCodeType() : QR_ERROR_CORRECTION
  {
    return this.qrCodeType as QR_ERROR_CORRECTION;
  }

  makeNewKeyset()
  {
    let isTestnet: boolean = this.networkType == NETWORK_TYPES.testnet;

    this.model = SingleAddressModel.create(isTestnet, this.selectedAddressType);
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

  getIsTestnet() : boolean
  {
    return this.networkType == NETWORK_TYPES.testnet;
  }
}
