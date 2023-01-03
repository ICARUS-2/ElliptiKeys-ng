import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { KeyspageComponent } from './keyspage/keyspage.component';
import { TooFarComponent } from './too-far/too-far.component';
import { RandomComponent } from './random/random.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';
import { DonateComponent } from './donate/donate.component';
import { TestnetRandomComponent } from './testnet-random/testnet-random.component';
import { ExplorerAddressComponent } from './explorer/explorer-address/explorer-address.component';
import { ExplorerTransactionComponent } from './explorer/explorer-transaction/explorer-transaction.component';
import { ExplorerPrivateKeyComponent } from './explorer/explorer-private-key/explorer-private-key.component';
import { ExplorerBlockComponent } from './explorer/explorer-block/explorer-block.component';
import { ExplorerIndexComponent } from './explorer/explorer-index/explorer-index.component';
import { WalletGeneratorIndexComponent } from './wallet-generator/wallet-generator-index/wallet-generator-index.component';
import { SettingsPageComponent } from './settings/settings-page/settings-page.component';

const routes: Routes = [
  {path: '', component: HomepageComponent, data: {routeName: "homepage"}},
  {path: 'bitcoin/:id', component: KeyspageComponent, data: {isTestnet: false, routeName: "keyspageBitcoin"}}, 
  {path: 'testnet/:id', component: KeyspageComponent, data: {isTestnet: true, routeName: "keyspageTestnet"}},
  {path: 'too-far', component:TooFarComponent, data: {routeName: "tooFar"}},
  {path: 'random', component:RandomComponent, data: {routeName: "randomBitcoin"}},
  {path: 'testnet-random', component: TestnetRandomComponent, data: {routeName: "randomTestnet"}},
  
  {path: 'about', component:AboutComponent, data: {routeName: "about"}},
  {path: 'donate', component: DonateComponent, data: {routeName: "donate"}},

  {path: 'explorer', component: ExplorerIndexComponent, data: {routeName: "explorerIndex"}},
  {path: 'explorer/bitcoin/address/:id', component: ExplorerAddressComponent, data: {routeName: "explorerAddressBitcoin"}},
  {path: 'explorer/testnet/address/:id', component: ExplorerAddressComponent, data: {routeName: "explorerAddressTestnet"}},
  {path: 'explorer/bitcoin/wif/:id', component: ExplorerPrivateKeyComponent, data: {routeName: "explorerWifBitcoin"}},
  {path: 'explorer/testnet/wif/:id', component: ExplorerPrivateKeyComponent, data: {routeName: "explorerWifTestnet"}},
  {path: 'explorer/bitcoin/transaction/:id', component: ExplorerTransactionComponent, data: {routeName: "explorerTxBitcoin"}},
  {path: 'explorer/testnet/transaction/:id', component: ExplorerTransactionComponent, data: {routeName: "explorerTxTestnet"}},
  {path: 'explorer/bitcoin/block/:id', component: ExplorerBlockComponent, data: {routeName: "explorerBlockBitcoin"}},
  {path: 'explorer/testnet/block/:id', component: ExplorerBlockComponent, data: {routeName: "explorerBlockTestnet"}},

  {path: 'wallet-generator', component: WalletGeneratorIndexComponent, data: {routeName: "walletGeneratorIndex"}},

  {path: 'settings', component: SettingsPageComponent},

  {path: '**', component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: "enabled"})],
exports: [RouterModule]
})
export class AppRoutingModule { }
