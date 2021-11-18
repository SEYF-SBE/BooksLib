import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  isAuthInCart: boolean = false;

  constructor(public cart: CartService, private router: Router,  private authService: AuthService) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user){
          this.isAuthInCart = true;
        }else{
          this.isAuthInCart = false;
        }
      }
    );
  }

  onValidCart(){

    if(this.isAuthInCart){
      this.router.navigate(['/checkout']);
    }else{
      this.router.navigate(['/checkoutConnect']);
    }
    
  }

}
