import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import VanillaTilt from 'vanilla-tilt';
import { Order } from '../models/Order.model';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';

import { FormControl } from '@angular/forms'; //
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { Router } from '@angular/router';


declare var $: any;

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],

  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class CheckoutComponent implements OnInit {


  orderSent: boolean = false;
  submitted: boolean = false;

  tempInitMonth = new Date().getMonth() + 1;
  tempInitYear = new Date().getFullYear();
  dateYM: string = this.tempInitMonth + "/" + this.tempInitYear;

  tempMonth!: number | null;
  tempYear!: number | null;

  constructor(public cart: CartService, public orderService: OrderService,
    public order: Order, public router: Router) { }

  ngOnInit(): void {

    VanillaTilt.init(document.querySelector(".card-pay") as HTMLElement, { max: 25, speed: 400 });
    VanillaTilt.init(document.querySelector(".card") as HTMLElement, { max: 25, speed: 400 });

  }


  submitOrder(form: NgForm) {

    this.submitted = true;
    if (form.controls.name.valid && form.controls.telephone.valid && form.controls.address.valid && form.controls.city
      && form.controls.zip.valid && form.controls.nameCard.valid && form.controls.cardNumber.valid
      && (form.controls.expireDate.invalid)) {
      this.order.expireDate = this.dateYM; //////////
      this.orderService.saveOrderInRTDB(this.order);
      this.order.clear();
      this.orderSent = true;
      this.submitted = false;
      this.router.navigate(['/submittedOrder']);
    } else {
      $(('#myModal') as any).modal('show');
    }
  }



  chosenYearHandler(normalizedYear: Moment) {
    console.log("normalizedYear: ", normalizedYear.toDate());
  }


  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {

    this.tempMonth = normalizedMonth.month() + 1;
    this.tempYear = normalizedMonth.year();
    this.dateYM = this.tempMonth + "/" + this.tempYear;
    datepicker.close();
  }

  addSpace() {
    let el = document.getElementById('tentacles');
    if (el) {
      el.addEventListener('input', function (e: Event) {
        (<HTMLInputElement>e.target).value = (<HTMLInputElement>e.target).value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
      });
    }
  }

}
