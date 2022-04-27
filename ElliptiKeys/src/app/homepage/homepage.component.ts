import { Component, OnInit } from '@angular/core';
import { Form, FormsModule } from '@angular/forms';
import Keys from '../../../lib/Keys.js';
import PageHelper from 'lib/page-helper.js';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  errorMessage : string = "";

  constructor() { }

  ngOnInit(): void {
  }

  onSubmitSearch(keySearch : HTMLFormElement) : void{    
    
    try
    {
      let searchQuery:string = keySearch["searchQuery"].value;
      let privateKeyNum:BigInt = Keys.GetNumberFromPrivateKey(searchQuery)

      let pageNumber:BigInt = BigInt(PageHelper.CalculatePageNumber(privateKeyNum))

      if (!searchQuery.startsWith("5") && !searchQuery.startsWith("L") && !searchQuery.startsWith("K"))
        throw new Error();

      if ( privateKeyNum > Keys.MAX_PRIVATE_KEY)
        throw new Error();

        window.location.href = "/bitcoin/"+pageNumber
    }
    catch(err)
    {
      this.errorMessage = "That's not a valid private key"
    }
  }
}
