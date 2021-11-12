import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Order } from '../models/Order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private basePath: string = '/orders';
  orders: AngularFireList<Order>; //  list of objects
  orderRef!: AngularFireObject<any>;
  order!: Observable<any>;

  constructor(private db: AngularFireDatabase) { 
    this.orders = this.db.list(this.basePath);
  }

  //to create a book in realtime deleteBook
  saveOrderInRTDB(order: Order) {
    return this.orders.push(order);
  }
}
