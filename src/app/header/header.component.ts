import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import firebase from "firebase/compat/app";
import "firebase/compat/auth"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean = false;

  constructor(private authService: AuthService) { }

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
}
