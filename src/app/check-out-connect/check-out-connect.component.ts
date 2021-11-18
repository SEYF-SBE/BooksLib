import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import VanillaTilt from 'vanilla-tilt';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-check-out-connect',
  templateUrl: './check-out-connect.component.html',
  styleUrls: ['./check-out-connect.component.scss']
})
export class CheckOutConnectComponent implements OnInit {

  signInForm !: FormGroup;
  signUpForm!: FormGroup;

  constructor(public cart: CartService, private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    VanillaTilt.init(document.querySelector(".cardStyle") as HTMLElement, { max: 25, speed: 400 });
    //VanillaTilt.init(document.querySelectorAll(".cardStyle") ) ;

    this.initForm();

    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton!.addEventListener('click', () => {
      container!.classList.add("right-panel-active");
    });

    signInButton!.addEventListener('click', () => {
      container!.classList.remove("right-panel-active");
    });
  }

  initForm() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });

    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmitSingIn() {
    const email = this.signInForm.get('email')?.value;
    const password = this.signInForm.get('password')?.value;

    this.authService.SignInUser(email, password).then(
      () => {
        this.router.navigate(['/checkout']);
      }, (error) => {
        //this.errorMessage = error;
      }
    );
  }

}
