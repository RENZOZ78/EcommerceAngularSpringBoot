import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import {  OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
// import { format } from 'path';
import { from, lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   return from(this.handleAcess(request, next));    
  }

  private async handleAcess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
   
    //rajouter  un access token pour un point securisé
    const securedEndpoints = ['http://localhost:8080/api/orders'];

    if (securedEndpoints.some(url => request.urlWithParams.includes(url))) {

      //Recuperer l'access token
      const accessToken = await this.oktaAuth.getAccessToken();

      //copier la requete et ajouter la nouvelle entete avec le jeton
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + accessToken,
        }
      });
    }

    // return next.handle(request).toPromise(); 
    //toPromise est deprecié
    return await lastValueFrom(next.handle(request));


  }
}
