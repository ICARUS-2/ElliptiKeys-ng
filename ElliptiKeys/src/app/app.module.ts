import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { KeyspageComponent } from './keyspage/keyspage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooFarComponent } from './too-far/too-far.component';
import { RandomComponent } from './random/random.component';
import { PagebuttonsComponent } from './pagebuttons/pagebuttons.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { DonateComponent } from './donate/donate.component';
import { PriceService } from './services/price/price.service';
import { PriceComponent } from './price/price.component';
import { TestnetRandomComponent } from './testnet-random/testnet-random.component';
import { ExplorerAddressComponent } from './explorer/explorer-address/explorer-address.component';
import { QRCodeModule } from 'angularx-qrcode';
import { ExplorerPrivateKeyComponent } from './explorer/explorer-private-key/explorer-private-key.component';
import { ExplorerTransactionListComponent } from './explorer/explorer-transaction-list/explorer-transaction-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExplorerTransactionComponent } from './explorer/explorer-transaction/explorer-transaction.component';
import { ExplorerBlockComponent } from './explorer/explorer-block/explorer-block.component';
import { ExplorerIndexComponent } from './explorer/explorer-index/explorer-index.component';
import { WalletGeneratorIndexComponent } from './wallet-generator/wallet-generator-index/wallet-generator-index.component';
import { SingleKeysetComponent } from './wallet-generator/single-keyset/single-keyset.component';
import { BulkGenerateComponent } from './wallet-generator/bulk-generate/bulk-generate.component';
import { MnemonicComponent } from './wallet-generator/mnemonic/mnemonic.component';
import { AddressTypeSelectorComponent } from './wallet-generator/address-type-selector/address-type-selector.component';
import { QrCodeTypeSelectorComponent } from './wallet-generator/qr-code-type-selector/qr-code-type-selector.component';
import { NetworkTypeSelectorComponent } from './wallet-generator/network-type-selector/network-type-selector.component';
import { OnlineStatusModule } from 'ngx-online-status';
import { QrCodeWithBorderComponent } from './wallet-generator/qr-code-with-border/qr-code-with-border.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    KeyspageComponent,
    TooFarComponent,
    RandomComponent,
    PagebuttonsComponent,
    NotFoundComponent,
    FooterComponent,
    AboutComponent,
    DonateComponent,
    PriceComponent,
    TestnetRandomComponent,
    ExplorerAddressComponent,
    ExplorerPrivateKeyComponent,
    ExplorerTransactionListComponent,
    ExplorerTransactionComponent,
    ExplorerBlockComponent,
    ExplorerIndexComponent,
    WalletGeneratorIndexComponent,
    SingleKeysetComponent,
    BulkGenerateComponent,
    MnemonicComponent,
    AddressTypeSelectorComponent,
    QrCodeTypeSelectorComponent,
    NetworkTypeSelectorComponent,
    QrCodeWithBorderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    QRCodeModule,
    OnlineStatusModule,
    NgbModule
  ],
  providers: [
    Title,
    PriceService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
