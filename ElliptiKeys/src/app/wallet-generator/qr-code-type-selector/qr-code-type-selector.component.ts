
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { QR_ERROR_CORRECTION } from 'lib/dictionaries/qr-error-correction';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-qr-code-type-selector',
  templateUrl: './qr-code-type-selector.component.html',
  styleUrls: ['./qr-code-type-selector.component.css']
})
export class QrCodeTypeSelectorComponent implements OnInit {

  qrFormControl: FormControl;
  qrCodeTypes = QR_ERROR_CORRECTION;
  
  radioName: string = Math.random().toString();

  @Output() itemChanged: EventEmitter<string> = new EventEmitter<string>();

  static DEFAULT_VALUE = QR_ERROR_CORRECTION.high;

  constructor() 
  {
    this.qrFormControl = new FormControl(QrCodeTypeSelectorComponent.DEFAULT_VALUE);
  }

  ngOnInit(): void 
  {
    
  }

  onRadioButtonChanged()
  {
    this.itemChanged.emit(this.qrFormControl.value)
  }

}
