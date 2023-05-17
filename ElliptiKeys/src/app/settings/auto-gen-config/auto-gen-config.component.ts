import { Component, OnInit } from '@angular/core';
import { AutoGenService } from 'src/app/services/auto-gen/auto-gen.service';

@Component({
  selector: 'app-auto-gen-config',
  templateUrl: './auto-gen-config.component.html',
  styleUrls: ['./auto-gen-config.component.css']
})
export class AutoGenConfigComponent implements OnInit {

  autoGenService: AutoGenService;
  formName: string = Math.random().toString();

  constructor(ags: AutoGenService) 
  { 
    this.autoGenService = ags
  }

  ngOnInit(): void {
  }

}
