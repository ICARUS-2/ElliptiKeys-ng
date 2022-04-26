import { Component, OnInit } from '@angular/core';
import { Form, FormsModule } from '@angular/forms';
import Keys from '../../../lib/Keys.js';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSubmitSearch(keySearch : HTMLFormElement) : void{    
    let searchQuery:string = keySearch["searchQuery"].value;
    let privateKeyNum:BigInt = Keys.GetNumberFromPrivateKey(searchQuery)

    let pageNumber = Keys.CalculatePageNumber(privateKeyNum)

    console.log(pageNumber)
  }
}
