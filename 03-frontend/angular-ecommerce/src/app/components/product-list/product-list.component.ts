import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})


export class ProductListComponent implements OnInit {

  products!: Product[];
  currentCategoryId!: number;
  searchMode!: boolean;

  constructor(private productService: ProductService,
                private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
    
  }

  //affichage liste de produit
  listProducts() {
    //prends en compte la recherche par keyword
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    //si on est en searchMode, utilise la methode qui gere la recherche Product
    if (this.searchMode){
      this.handleSearchProducts();
    }

    else{ //sinon methode qui gere la liste de produit
      this.handleListProducts();
    } 

  }

  handleSearchProducts(){
    //check si le keyword tapé est avaible
    const theKeyword: string = this.route.snapshot.paramMap.get("keyword");

    //maintenant on cherche le produit qui utilise des keyword
    this.productService.searchProducts(theKeyword).subscribe(
      data =>{
        this.products = data;
      }
    );
  }

  handleListProducts(){
    //check if l'id parameter est avaible
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
