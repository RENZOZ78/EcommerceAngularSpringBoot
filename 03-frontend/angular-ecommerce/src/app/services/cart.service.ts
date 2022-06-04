import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  //session stokage du navigateur web
  //storage: Storage = sessionStorage;

  //stokage local du navigateur
  storage: Storage = localStorage;

  constructor() { 

    //lire les données a partir d'un stockage
    let data = JSON.parse(this.storage.getItem('cartItems'));

    if (data != null) {
      this.cartItems = data;

      //calculer les totaux basées sur les données qui sont lus a partir du stockage
      this.computeCartTotals();

    }
  }

    addToCart(theCartItem: CartItem){
      //check if we already have the item in our cartItems
      let alreadyExistsInCart: boolean = false;
      let existingCartItem: CartItem = undefined;

      if(this.cartItems.length > 0) {
        //find the item in cart based on item id

            //version boucle
        // for (let tempCartItem of this.cartItems){
        //   if (tempCartItem.id === theCartItem.id){
        //     existingCartItem = tempCartItem;
        //     break;
        //   }
        // }
            //version refactor
        existingCartItem = this.cartItems.find( tempCartItem => tempCartItem.id === theCartItem.id);

        //check if we found import {  } from "module";
        alreadyExistsInCart = (existingCartItem != undefined);
      }

      if (alreadyExistsInCart){
        //incrementer la quantité
        existingCartItem.quantity++;
      }
      else{
        //juste rajouter l'item dans l'array
        this.cartItems.push(theCartItem);
      }

      //compute cart total price and total quantity
      this.computeCartTotals();
    }
    computeCartTotals(){

      let totalPriceValue: number = 0;
      let totalQuantityValue: number = 0;

      for (let currentCartItem of this.cartItems) {
        totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
        totalQuantityValue += currentCartItem.quantity;
      }

      // publier les nouvelles valeurs ... tous les abonnés recevront les nouvelles donnée
      this.totalPrice.next(totalPriceValue);
      this.totalQuantity.next(totalQuantityValue);

      //debugguer les objectifs
      this.logCartData(totalPriceValue, totalQuantityValue);

      //persistence des données panier
      this.persistCartItems();
    }

    persistCartItems(){
      this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
    }

    logCartData(totalPriceValue: number, totalQuantityValue: number){

      console.log('Contents of the cart');
      for (let tempCartItem of this.cartItems) {
        const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
        console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`);
      }
      console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
      console.log('----');

    }

    decrementQuantity(theCartItem: CartItem) {
      theCartItem.quantity--;

      if (theCartItem.quantity == 0){
        this.remove(theCartItem);
      }
      else{
        this.computeCartTotals();
      }
    }
  remove(theCartItem: CartItem) {
    
    //chercher l'index de l'item dans le array
    const itemIndex = this.cartItems.findIndex( tempCartItem => tempCartItem.id === theCartItem.id);

    //si retrouvé, supprimer l'item du tableau pour l'index donné
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);

      this.computeCartTotals();
    }
  }


  }
