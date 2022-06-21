import { Component, OnInit } from '@angular/core';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {


  orderHistoryList: OrderHistory [] = [];

  //recuperer l'email a partir du navigateur
  storage: Storage = sessionStorage;

  constructor( private orderHistoryService: OrderHistoryService ) { }

  ngOnInit(): void {
    this.handleOrderHistory();
  }
  
  handleOrderHistory() {

    //lire l'email de l'user a partir du stokage du navugateur;
    const theEmail = JSON.parse(this.storage.getItem('userEmail'));

    //maintenant on peut appeler le service d'histoire
    this.orderHistoryService.getOrderHistory(theEmail).subscribe(
      data=>{
        this.orderHistoryList = data._embedded.orders;
      }
    );
  }

}
