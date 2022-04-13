import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  totalPrice: number = 0.00;
  totalQuantity: number = 0;
  

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }

  //methode qui s'abonne aux events de cartServices
  updateCartStatus() {
    //s'abonner a l'evenement total prix du panier
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    //s'abonner a l'evenement quantité total du panier
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

  }

}
