import { Component, OnInit } from '@angular/core';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
  selector: 'app-oder-history',
  templateUrl: './oder-history.component.html',
  styleUrls: ['./oder-history.component.css']
})
export class OderHistoryComponent implements OnInit {


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
