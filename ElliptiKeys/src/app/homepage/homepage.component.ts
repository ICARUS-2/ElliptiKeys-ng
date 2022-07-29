import { Component, OnInit } from '@angular/core';
import { Form, FormsModule } from '@angular/forms';
import Keys from 'lib/keys/Keys';
import PageHelper from 'lib/page-helper.js';
import LocalStorageHelper from 'lib/localstorage-helper';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  errorMessage : boolean = false;

  constructor(private router: Router, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle("ElliptiKeys")
  }

  onSubmitSearch(keySearch : HTMLFormElement) : void{    
    
    try
    {
      let searchQuery:string = keySearch["searchQuery"].value;
      
      if (searchQuery.startsWith("K") || searchQuery.startsWith("L"))
        searchQuery = Keys.DecompressWIF(searchQuery)

      if (searchQuery.startsWith("c"))
        searchQuery = Keys.DecompressTestnetWIF(searchQuery)
      
      let privateKeyNum:BigInt = Keys.GetNumberFromPrivateKey(searchQuery)

      let pageNumber:BigInt = BigInt(PageHelper.CalculatePageNumber(privateKeyNum))

      if (!searchQuery.startsWith("5") && !searchQuery.startsWith("L") && !searchQuery.startsWith("K") && !searchQuery.startsWith("c") && !searchQuery.startsWith("9"))
        throw new Error();

      if ( privateKeyNum > Keys.MAX_PRIVATE_KEY)
        throw new Error();

        LocalStorageHelper.SetPrivateKeySearchQuery(searchQuery)

      if (searchQuery.startsWith("5"))
        this.router.navigate(["/bitcoin/"+pageNumber])
      else if (searchQuery.startsWith("9"))
      this.router.navigate(["/testnet/"+pageNumber])
    }
    catch(err)
    {
      this.errorMessage = true;
    }
  }
}
