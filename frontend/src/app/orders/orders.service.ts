import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpResponse} from '../../../node_modules/@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {OrderInputDto, OrderOutputDto} from './order.model';
import {catchError} from 'rxjs/operators';
import {OfferDto} from '../offers/offer.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  public API_URL = environment.apiPrefix + '/' + environment.stage + '/orders';

  constructor(private http: HttpClient) {
  }

  public postOrder(orderOutput: OrderOutputDto): Observable<any> {
    return this.http.post(this.API_URL, orderOutput, {observe: 'response'}).pipe(
      catchError(this.handleError)
    );
  }

  public getNewOrders(): Observable<HttpResponse<OrderInputDto[]>> {
    return this.getOrders(this.API_URL + '?status=NEW');
  }

  public getDoneOrders(): Observable<HttpResponse<OrderInputDto[]>> {
    return this.getOrders(this.API_URL + '?status=DONE');
  }

  public getOrdersInProcess(): Observable<HttpResponse<OrderInputDto[]>> {
    return this.getOrders(this.API_URL + '?status=IN_PROCESS');
  }

  private getOrders(targetUrl: string): Observable<HttpResponse<OrderInputDto[]>> {
    return this.http.get<OrderInputDto[]>(targetUrl, {observe: 'response', });
  }

  public setOrderInProcess(orderId: string): Observable<HttpResponse<OrderInputDto[]>> {
    return this.updateOrder(this.API_URL + '/' + orderId, 'IN_PROCESS');
  }
  public setOrderDone(orderId: string): Observable<HttpResponse<OrderInputDto[]>> {
    return this.updateOrder(this.API_URL + '/' + orderId, 'DONE');
  }

  private updateOrder(targetUrl: string, status: string): Observable<HttpResponse<OrderInputDto[]>> {
    return this.http.put<OrderInputDto[]>(targetUrl, {'status': status}, {observe: 'response', });
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}


