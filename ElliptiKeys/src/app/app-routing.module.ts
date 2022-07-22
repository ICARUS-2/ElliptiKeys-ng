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

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'bitcoin/:id', component: KeyspageComponent, data: {isTestnet: false}}, 
  {path: 'testnet/:id', component: KeyspageComponent, data: {isTestnet: true}},
  {path: 'too-far', component:TooFarComponent},
  {path: 'random', component:RandomComponent},
  {path: 'testnet-random', component: TestnetRandomComponent},
  {path: 'about', component:AboutComponent},
  {path: 'donate', component: DonateComponent},

  {path: 'explorer', component: ExplorerIndexComponent},
  {path: 'explorer/bitcoin/address/:id', component: ExplorerAddressComponent},
  {path: 'explorer/testnet/address/:id', component: ExplorerAddressComponent},
  {path: 'explorer/bitcoin/wif/:id', component: ExplorerPrivateKeyComponent},
  {path: 'explorer/testnet/wif/:id', component: ExplorerPrivateKeyComponent},
  {path: 'explorer/bitcoin/transaction/:id', component: ExplorerTransactionComponent},
  {path: 'explorer/testnet/transaction/:id', component: ExplorerTransactionComponent},
  {path: 'explorer/bitcoin/block/:id', component: ExplorerBlockComponent},
  {path: 'explorer/testnet/block/:id', component: ExplorerBlockComponent},

  {path: '**', component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: "enabled"})],
exports: [RouterModule]
})
export class AppRoutingModule { }
