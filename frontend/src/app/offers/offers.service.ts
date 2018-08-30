import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { OfferDto} from './offer.model';
import {Observable} from 'rxjs';

@Injectable()
export class OffersService {

  public API_URL = environment.apiPrefix + '/' + environment.stage + '/offers';

  constructor(private http: HttpClient) {}

  public getOffers(): Observable<HttpResponse<OfferDto[]>> {

    return this.http.get<OfferDto[]>(this.API_URL, {observe: 'response', });
  }
}
