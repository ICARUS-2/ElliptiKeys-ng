import { Component, OnInit, Input } from '@angular/core';
import KeyRowModel from './../../../models/key-row-model';

@Component({
  selector: 'app-keyrow',
  templateUrl: './keyrow.component.html',
  styleUrls: ['./keyrow.component.css']
})
export class KeyrowComponent implements OnInit {

  @Input() model: KeyRowModel = new KeyRowModel(BigInt('1'));

  constructor() { }

  ngOnInit(): void {
  }

}