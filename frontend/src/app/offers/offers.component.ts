import {Component, OnInit} from '@angular/core';
import {OffersService} from './offers.service';
import {OfferDto} from './offer.model';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {faShoppingCart, faTrash} from '@fortawesome/free-solid-svg-icons';
import {ShoppingCardItem} from './shoppingCardItem.model';
import {OrdersService} from '../orders/orders.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  faShoppingCart = faShoppingCart;
  faTrash = faTrash;

  constructor(private offerservice: OffersService, private orderService: OrdersService, private fb: FormBuilder) {
  }

  offers: OfferDto[];
  shoppingForm: FormGroup;
  shoppingBasket: ShoppingCardItem[] = [];

  ngOnInit() {
    this.offerservice.getOffers().subscribe(resp => {
      this.offers = resp.body as OfferDto[];
      this.createForm();
    });
  }

  private createForm() {
    const formItems = this.fb.array(this.offers.map(offerDto => this.fb.group({
      amount: 1,
      offer: this.fb.group({
        id: offerDto.id,
        name: offerDto.name,
        price: offerDto.price,
        type: offerDto.type
      })
    })));

    this.shoppingForm = this.fb.group({
      name: '',
      phone: '',
      shoppingCard: formItems
    });
  }

  get shoppingCard() {
      return this.shoppingForm.get('shoppingCard').value;
  }

  get shoppingCardArray() {
    return (<FormArray>this.shoppingForm.get('shoppingCard')).controls;
  }

  private addToShoppingCard(index: number) {
    if (index > -1) {
      this.shoppingBasket.push(this.shoppingCard[index]);
    }
  }

  private isOnShoppingCard(index: number): boolean {
    if (index  > -1) {
      return !!this.shoppingBasket.find(shoppingItem => shoppingItem.offer.id === this.shoppingCard[index].offer.id);
    } else {
      return false;
    }
  }

  private removeFromnShoppingCard(offerId: string) {
    if (!!offerId) {
      const index = this.shoppingBasket.findIndex(value => value.offer.id === offerId);
      if (index > -1) {
        this.shoppingBasket.splice(index, 1);
      }
    }
  }

  private placeOrder() {
    this.orderService.postOrder({
      customer: {
        name: this.shoppingForm.get('name').value,
        phone: this.shoppingForm.get('phone').value
      },
      shoppingCard: this.shoppingBasket
    }).subscribe(value => console.log('Placed order! => ' + value));
  }

}
