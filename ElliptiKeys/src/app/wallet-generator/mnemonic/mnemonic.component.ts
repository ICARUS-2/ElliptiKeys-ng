import { Component, OnInit } from '@angular/core';
import { QRCodeErrorCorrectionLevel } from 'angularx-qrcode';
import Keys from 'lib/keys/Keys';
import { MnemonicWordCountSelectorComponent } from './../mnemonic-word-count-selector/mnemonic-word-count-selector.component';
import { QrCodeTypeSelectorComponent } from './../qr-code-type-selector/qr-code-type-selector.component';

@Component({
  selector: 'app-mnemonic',
  templateUrl: './mnemonic.component.html',
  styleUrls: ['./mnemonic.component.css']
})
export class MnemonicComponent implements OnInit {

  wordCount: number = MnemonicWordCountSelectorComponent.WORD_COUNTS[0];
  qrEc: string = QrCodeTypeSelectorComponent.DEFAULT_VALUE;

  words: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  makeNewMnemonic()
  {
    this.words = Keys.GenerateRandomBip39Mnemonic(this.wordCount);
  }
  
  onWordCountChanged(value: number)
  {
    this.wordCount = value
  }

  onQrTypeChanged(value: string)
  {
    this.qrEc = value;
  }

  getQrCodeType() : QRCodeErrorCorrectionLevel
  {
    return this.qrEc as QRCodeErrorCorrectionLevel;
  }

  getQrCodeData()
  {
    if (this.words.length == 0)
      return "";

    let data = "";

    this.words.forEach( w =>
      {
        data += w + " "
      } )

    //Removes the last space
    return data.slice(0, -1);
  }
}
