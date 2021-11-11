import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean = false;

  //@ViewChild('content') content: any;
  @ViewChild('demoBasic', { static: true }) demoBasic: any;

  constructor(private authService: AuthService,
              public cartService: CartService,
              private router: Router) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user){
          this.isAuth = true;
        }else{
          this.isAuth = false;
        }
      }
    );
  }

  onSignOut(){
    this.authService.signOut();
  }

  /*onCart(itemNumber : number){
    if(itemNumber === 0){
      this.demoBasic.show();
    }else{
      this.router.navigate(['/cart']);
    }
  }*/
}
