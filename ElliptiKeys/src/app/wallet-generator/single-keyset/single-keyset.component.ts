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

    switch(this.selectedAddressType)
    {
      case this.addressTypes.legacy:
        
        if (isTestnet)
        {
          this.privateKey = Keys.GenerateRandomTestnetPrivateKey();
          this.address = Keys.TestnetPrivateKeyToLegacyAddress(this.privateKey);
        }
        else
        {
          this.privateKey = Keys.GenerateRandomPrivateKey();
          this.address = Keys.PrivateKeyToLegacyAddress(this.privateKey)
        }

        break;

      case this.addressTypes.legacyCompressed:
      
        if (isTestnet)
        {
          this.privateKey = Keys.GenerateRandomCompressedTestnetPrivateKey();
          this.address = Keys.TestnetCompressedPrivateKeyToLegacyAddress(this.privateKey);
        }
        else
        {
          this.privateKey = Keys.GenerateRandomCompressedPrivateKey();
          this.address = Keys.CompressedPrivateKeyToLegacyAddress(this.privateKey)
        }

        break;

      case this.addressTypes.segwit:
      
        if (isTestnet)
        {
          this.privateKey = Keys.GenerateRandomCompressedTestnetPrivateKey();
          this.address = Keys.TestnetCompressedPrivateKeyToSegwitAddress(this.privateKey);
        }
        else
        {
          this.privateKey = Keys.GenerateRandomCompressedPrivateKey();
          this.address = Keys.CompressedPrivateKeyToSegwitAddress(this.privateKey)
        }

        break;

      case this.addressTypes.bech32:
      
        if (isTestnet)
        {
          this.privateKey = Keys.GenerateRandomCompressedTestnetPrivateKey();
          this.address = Keys.TestnetCompressedPrivateKeyToBech32Address(this.privateKey);
        }
        else
        {
          this.privateKey = Keys.GenerateRandomCompressedPrivateKey();
          this.address = Keys.CompressedPrivateKeyToBech32Address(this.privateKey)
        }

        break;

    }
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
