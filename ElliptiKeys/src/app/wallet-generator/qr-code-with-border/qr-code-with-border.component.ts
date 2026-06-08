import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-qr-code-with-border',
    templateUrl: './qr-code-with-border.component.html',
    styleUrls: ['./qr-code-with-border.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class QrCodeWithBorderComponent implements OnInit {

  @Input() headerText: string = "";
  @Input() qrData: string = ""
  @Input() borderColor: string = "";
  @Input() errorCorrectionLevel: any

  constructor() { }

  ngOnInit(): void {
  }

}
