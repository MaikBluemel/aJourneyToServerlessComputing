import {CustomerDto} from '../customer/customer.model';
import {ShoppingCardItem} from '../offers/shoppingCardItem.model';
import {OfferDto} from '../offers/offer.model';

export interface OrderOutputDto {
  customer: CustomerDto;
  shoppingCard: ShoppingCardItem[];
}

export interface OrderInputDto {
  orderID: string;
  status: string;
  name: string;
  phone: string;
  created_on: string;
  offers: ShoppingCardItem[];
}
