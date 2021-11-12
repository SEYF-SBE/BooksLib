import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Order } from '../models/Order.model';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  orderSent: boolean = false;
  submitted: boolean = false;
  constructor(public orderService: OrderService,
    public order: Order) { }

  ngOnInit(): void { }

  submitOrder(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.orderService.saveOrderInRTDB(this.order);
      this.order.clear();
      this.orderSent = true;
      this.submitted = false;
    }
  }

}
