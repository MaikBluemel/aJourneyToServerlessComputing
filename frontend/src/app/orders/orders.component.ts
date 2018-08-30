import { Component, OnInit } from '@angular/core';
import {OrdersService} from './orders.service';
import {OfferDto} from '../offers/offer.model';
import {OrderInputDto} from './order.model';
import {faCheck, faPlay} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  faCheck = faCheck;
  faPlay = faPlay;

  constructor(private orderService: OrdersService) { }


  newOrders: OrderInputDto[];
  inProcessOrders: OrderInputDto[];
  doneOrders: OrderInputDto[];

  ngOnInit() {
    this.updateOrders();
  }

  setOrderToDone(orderId: string) {
    this.orderService.setOrderDone(orderId).subscribe(resp => {
      console.log(resp);
      this.updateOrders();
    });
  }

  setOrderToInProcess(orderId: string) {
    this.orderService.setOrderInProcess(orderId).subscribe(resp => {
      console.log(resp);
      this.updateOrders();
    });
  }

  updateOrders() {
    this.orderService.getDoneOrders().subscribe(resp => this.doneOrders = resp.body as OrderInputDto[]);
    this.orderService.getNewOrders().subscribe(resp => this.newOrders = resp.body as OrderInputDto[]);
    this.orderService.getOrdersInProcess().subscribe(resp => this.inProcessOrders = resp.body as OrderInputDto[]);
  }
}
