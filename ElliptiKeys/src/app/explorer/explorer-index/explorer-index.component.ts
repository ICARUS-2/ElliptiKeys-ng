import { Component, OnInit } from '@angular/core';
import SearchResultViewModel from '../../../../models/search-result-view-model';
import Keys from './../../../../lib/Keys';
import KeysHelper from './../../../../lib/keys-helper';
import { URLS } from './../../../../lib/urls';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-explorer-index',
  templateUrl: './explorer-index.component.html',
  styleUrls: ['./explorer-index.component.css']
})
export class ExplorerIndexComponent implements OnInit {
  TRANSACTION_HASH_LENGTH = 64;

  searchResults: SearchResultViewModel[] = [];
  searchResultHeader: string = "";

  constructor(private title: Title) 
  {
    title.setTitle("ElliptiKeys Block Explorer")
  }

  ngOnInit(): void {
  }

  onSubmitSearch(searchForm: HTMLFormElement)
  {
    this.searchResults = [];

    let searchQuery:string = searchForm["searchQuery"].value;

    try
    {
      //Check if user searched for an address
      if(Keys.ValidateBitcoinAddress(searchQuery))
      {
        let model = new SearchResultViewModel();

        model.text = searchQuery;
        model.searchType = SearchResultViewModel.SEARCH_TYPE.address;
        if (KeysHelper.IsAddressTestnet(searchQuery))
        {
          model.networkType = SearchResultViewModel.NETWORK_TYPE.testnet;
          model.link = URLS.BASE_TESTNET_EXPLORER_URL+searchQuery;
        }
        else
        {
          model.networkType = SearchResultViewModel.NETWORK_TYPE.bitcoin;
          model.link = URLS.BASE_EXPLORER_URL+searchQuery;
        }

        this.searchResults.push(model);
        this.updateSearchHeader(searchQuery);
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
      if (Keys.ValidatePrivateKey(searchQuery))
      {
        let model = new SearchResultViewModel();

        model.text = searchQuery;
        model.searchType = SearchResultViewModel.SEARCH_TYPE.privateKey;

        if (Keys.ValidatePrivateKey(searchQuery))
        {
          if (KeysHelper.IsPrivateKeyTestnet(searchQuery))
          {
            model.networkType = SearchResultViewModel.NETWORK_TYPE.testnet;
            model.link = URLS.BASE_TESTNET_WIF_EXPLORER_URL+searchQuery;
          }
          else
          {
            model.networkType = SearchResultViewModel.NETWORK_TYPE.bitcoin;
            model.link = URLS.BASE_WIF_EXPLORER_URL+searchQuery;
          }

          this.searchResults.push(model)
          this.updateSearchHeader(searchQuery);
          return;
        }
      }
    }
    catch(err)
    {
      //Could not parse as valid private key
    }


    //Check if user searched for a block number
    let queryAsNumber = Number(searchQuery)
    if (!isNaN(queryAsNumber))
    {
      if (queryAsNumber > 0)
      {
        let mModel = new SearchResultViewModel();
        let tModel = new SearchResultViewModel();

        mModel.networkType = SearchResultViewModel.NETWORK_TYPE.bitcoin;
        tModel.networkType = SearchResultViewModel.NETWORK_TYPE.testnet;

        mModel.text = searchQuery;
        tModel.text = searchQuery;

        mModel.link = URLS.BASE_BLOCK_EXPLORER_URL+searchQuery;
        tModel.link = URLS.BASE_TESTNET_BLOCK_EXPLORER_URL+searchQuery;

        mModel.searchType = SearchResultViewModel.SEARCH_TYPE.block;
        tModel.searchType = SearchResultViewModel.SEARCH_TYPE.block;

        this.searchResults.push(mModel);
        this.searchResults.push(tModel);
      }
    }

    if (searchQuery.length == this.TRANSACTION_HASH_LENGTH && searchQuery.toLowerCase() == searchQuery)
    {
      let mModel = new SearchResultViewModel();
      let tModel = new SearchResultViewModel();

      mModel.networkType = SearchResultViewModel.NETWORK_TYPE.bitcoin;
      tModel.networkType = SearchResultViewModel.NETWORK_TYPE.testnet;

      mModel.text = searchQuery;
      tModel.text = searchQuery;

      mModel.link = URLS.BASE_TRANSACTION_EXPLORER_URL+searchQuery;
      tModel.link = URLS.BASE_TESTNET_TRANSACTION_EXPLORER_URL+searchQuery;

      mModel.searchType = SearchResultViewModel.SEARCH_TYPE.transaction;
      tModel.searchType = SearchResultViewModel.SEARCH_TYPE.transaction;

      this.searchResults.push(mModel);
      this.searchResults.push(tModel);
    }

    this.updateSearchHeader(searchQuery);
  }

  updateSearchHeader(searchQuery: string)
  {
    this.searchResults.length == 0 ? this.searchResultHeader = "No search results for \""+searchQuery+"\"" : this.searchResultHeader = this.searchResults.length + " possible results for \"" + searchQuery + "\"";
  }
}
