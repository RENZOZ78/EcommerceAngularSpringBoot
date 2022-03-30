import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import{map} from 'rxjs/operators';
import {Product} from "../common/product";
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService { 

  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProductList(theCategoryId: number): Observable<Product[]> {
      // // @TODO : need to build URL based on category id ... will come to this!
      //need to build url based on category id
      const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

      return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
        map(response  => response._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {

      // const categoryUrl = `${this.categoryUrl}/search/`

      // const headers = new Headers();
      // headers.append('Access-Control-Allow-Headers', 'Content-Type');
      // headers.append('Access-Control-Allow-Methods', 'GET');
      // headers.append('Access-Control-Allow-Origin', '*');


      return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl ).pipe(
        map(response  => response._embedded.productCategory)
    );
  }
}

interface GetResponseProducts{
  _embedded: {
    products: Product[];
  }
}

interface GetResponseProductCategory{
  _embedded: {
    productCategory: ProductCategory[];
  }
}

  

