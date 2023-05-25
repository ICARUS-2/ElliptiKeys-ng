import { Component, OnInit, OnDestroy } from '@angular/core';
import SearchResultViewModel from '../../../../models/search-result-view-model';
import Keys from 'lib/keys/Keys';
import KeysHelper from './../../../../lib/keys-helper';
import { URLS } from '../../../../lib/dictionaries/urls';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-explorer-index',
  templateUrl: './explorer-index.component.html',
  styleUrls: ['./explorer-index.component.css']
})
export class ExplorerIndexComponent implements OnInit, OnDestroy {
  TRANSACTION_HASH_LENGTH = 64;

  searchResults: SearchResultViewModel[] = [];
  searchResultHeader: string = "";

  didSearch: boolean = false;

  searchQuery: string = "";

  languageSubscription: Subscription

  constructor(private title: Title, private translate: TranslateService) 
  {
    this.setTitle();

    this.languageSubscription = translate.onLangChange.subscribe( () =>
    {
      let savedSearchState: boolean = this.didSearch;

      this.onSubmitSearch();
      this.setTitle();
      this.didSearch = savedSearchState;
    } )
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
  }

  onSubmitSearch()
  {
    this.didSearch = true;

    this.searchResults = [];

    try
    {
      //Check if user searched for an address
      if(Keys.ValidateBitcoinAddress(this.searchQuery))
      {
        let model = new SearchResultViewModel();

        model.text = this.searchQuery;
        model.searchType = this.translate.instant("explorer.index.searchType.address")
        if (KeysHelper.IsAddressTestnet(this.searchQuery))
        {
          model.networkType = SearchResultViewModel.NETWORK_TYPE.testnet;
          model.link = URLS.BASE_TESTNET_EXPLORER_URL+this.searchQuery;
        }
        else
        {
          model.networkType = SearchResultViewModel.NETWORK_TYPE.bitcoin;
          model.link = URLS.BASE_EXPLORER_URL+this.searchQuery;
        }

        this.searchResults.push(model);
        this.updateSearchHeader();
        return;
      }
    }
    catch(err)
    {
      //Could not parse as a valid BTC address
    }

    try
    {
      //Check if user searched for a private key
      if (Keys.ValidatePrivateKey(this.searchQuery))
      {
        let model = new SearchResultViewModel();

        model.text = this.searchQuery;
        model.searchType = this.translate.instant("explorer.index.searchType.privateKey");

        if (Keys.ValidatePrivateKey(this.searchQuery))
        {
          if (KeysHelper.IsPrivateKeyTestnet(this.searchQuery))
          {
            model.networkType = SearchResultViewModel.NETWORK_TYPE.testnet;
            model.link = URLS.BASE_TESTNET_WIF_EXPLORER_URL+this.searchQuery;
          }
          else
          {
            model.networkType = SearchResultViewModel.NETWORK_TYPE.bitcoin;
            model.link = URLS.BASE_WIF_EXPLORER_URL+this.searchQuery;
          }

          this.searchResults.push(model)
          this.updateSearchHeader();
          return;
        }
      }
    }
    catch(err)
    {
      //Could not parse as valid private key
    }


    //Check if user searched for a block number
    let queryAsNumber = Number(this.searchQuery)
    if (!isNaN(queryAsNumber))
    {
      if (queryAsNumber > 0)
      {
        let mModel = new SearchResultViewModel();
        let tModel = new SearchResultViewModel();

        mModel.networkType = SearchResultViewModel.NETWORK_TYPE.bitcoin;
        tModel.networkType = SearchResultViewModel.NETWORK_TYPE.testnet;

        mModel.text = this.searchQuery;
        tModel.text = this.searchQuery;

        mModel.link = URLS.BASE_BLOCK_EXPLORER_URL+this.searchQuery;
        tModel.link = URLS.BASE_TESTNET_BLOCK_EXPLORER_URL+this.searchQuery;

        mModel.searchType = this.translate.instant("explorer.index.searchType.block");
        tModel.searchType = this.translate.instant("explorer.index.searchType.block");

        this.searchResults.push(mModel);
        this.searchResults.push(tModel);
      }
    }

    if (this.searchQuery.length == this.TRANSACTION_HASH_LENGTH && this.searchQuery.toLowerCase() == this.searchQuery)
    {
      let mModel = new SearchResultViewModel();
      let tModel = new SearchResultViewModel();

      mModel.networkType = SearchResultViewModel.NETWORK_TYPE.bitcoin;
      tModel.networkType = SearchResultViewModel.NETWORK_TYPE.testnet;

      mModel.text = this.searchQuery;
      tModel.text = this.searchQuery;

      mModel.link = URLS.BASE_TRANSACTION_EXPLORER_URL+this.searchQuery;
      tModel.link = URLS.BASE_TESTNET_TRANSACTION_EXPLORER_URL+this.searchQuery;

      mModel.searchType = this.translate.instant("explorer.index.searchType.transaction");
      tModel.searchType = this.translate.instant("explorer.index.searchType.transaction");

      this.searchResults.push(mModel);
      this.searchResults.push(tModel);
    }

    this.updateSearchHeader();
  }

  updateSearchHeader()
  {
    this.searchResults.length == 0 ? this.searchResultHeader = this.translate.instant("explorer.index.noSearchResults")+ " \""+this.searchQuery+"\"" : this.searchResultHeader = this.searchResults.length + " " + this.translate.instant("explorer.index.possibleSearchResults") + " \"" + this.searchQuery + "\"";
  }

  setTitle()
  {
    this.translate.get( "explorer.index.title" ).subscribe( str =>
    {
      this.title.setTitle(str);
    } )
  }
}
