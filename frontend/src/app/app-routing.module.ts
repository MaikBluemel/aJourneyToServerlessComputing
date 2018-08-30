import {RouterModule, Routes} from '@angular/router';
import {OffersComponent} from './offers/offers.component';
import {OrdersComponent} from './orders/orders.component';
import {NgModule} from '@angular/core';


const routes: Routes = [
  {
    path: '',
    component: OffersComponent
  },
  {
    path: 'orders',
    component: OrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
