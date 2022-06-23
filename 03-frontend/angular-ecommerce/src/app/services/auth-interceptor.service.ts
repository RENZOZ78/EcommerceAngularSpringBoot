import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { format } from 'path';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   return from(this.handleAcess(request, next));
    
  }
  private async handleAcess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    throw new Error('Method not implemented.');
  }
}
