import { Component, Input, OnInit } from '@angular/core';
import { AutoGenService } from '../services/auto-gen/auto-gen.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-auto-gen',
  templateUrl: './auto-gen.component.html',
  styleUrls: ['./auto-gen.component.css']
})
export class AutoGenComponent implements OnInit {

  @Input() isTestnet: boolean = false;

  autoGenService: AutoGenService;

  constructor(ags: AutoGenService) 
  {
    this.autoGenService = ags;
  }

  ngOnInit(): void 
  {
  }

  toggleAutoGen()
  {
    this.autoGenService.toggleAutoGen(this.isTestnet)
  }
}
