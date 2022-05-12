import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from '../common/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  //configureation de l'url d'achat
  private purchaseUrl = 'http://localhost:8080/api/checkout/purchase';


  constructor(private httpClient: HttpClient) { }

  //methode placOrder qui passe par un achat, et qui retourne un point d'achat
  placeOrder(purchase: Purchase): Observable<any>{
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase);
  }
}
