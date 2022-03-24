import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  //templateUrl: './product-list-table.component.html',
  // templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products!: Product[];
  currentCategoryId!: number;

  constructor(private productService: ProductService,
                private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
    this.listProducts();
  }
  listProducts() {

    //check if l'id parameter est avainble
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      //get the "id" param string /convertir le string a un nombre uen utilisant +
    this.currentCategoryId =  Number(this.route.snapshot.paramMap.get('id'));
    console.log('categorie personnalisée '+ this.currentCategoryId);
    }

    else{
      //si l'id de categ n'est pas avaible... on met la categ 1 par default
      this.currentCategoryId = 3;
      console.log('default categorie'+this.currentCategoryId);
    }

    //now get the products for the given category id1
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data =>{
        this.products = data;
      }
    )
  }

}
