import { Component, OnInit } from '@angular/core';
import Keys from 'lib/keys/Keys';
import { MnemonicWordCountSelectorComponent } from './../mnemonic-word-count-selector/mnemonic-word-count-selector.component';
import { QR_ERROR_CORRECTION } from 'lib/dictionaries/qr-error-correction';

@Component({
    selector: 'app-mnemonic',
    templateUrl: './mnemonic.component.html',
    styleUrls: ['./mnemonic.component.css'],
    standalone: false
})
export class MnemonicComponent implements OnInit {

  wordCount: number = MnemonicWordCountSelectorComponent.WORD_COUNTS[0];
  qrEc: string = QR_ERROR_CORRECTION.high;
  

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

  getQrCodeType() : QR_ERROR_CORRECTION
  {
    return this.qrEc as QR_ERROR_CORRECTION;
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
