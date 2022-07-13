import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentInfo } from '../common/payment-info';
import { Purchase } from '../common/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  //configureation de l'url d'achat
  private purchaseUrl = environment.sportmanApiUrl +'/checkout/purchase';
  // private purchaseUrl = 'http://localhost:8080/api/checkout/purchase';

  //configuration de l'url du Payment Intent
  private paymentIntentUrl = environment.sportmanApiUrl + '/checkout/payment-intent';


  constructor(private httpClient: HttpClient) { }

  //methode placOrder qui passe par un achat, et qui retourne un point d'achat
  placeOrder(purchase: Purchase): Observable<any>{
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase);
  }


  createPaymentIntent(paymentInfo: PaymentInfo): Observable<any> {
    return this.httpClient.post<PaymentInfo>(this.paymentIntentUrl, paymentInfo);
  }

}
