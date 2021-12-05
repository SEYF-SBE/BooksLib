import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import VanillaTilt from 'vanilla-tilt';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

declare var $: any;

@Component({
  selector: 'app-check-out-connect',
  templateUrl: './check-out-connect.component.html',
  styleUrls: ['./check-out-connect.component.scss']
})
export class CheckOutConnectComponent implements OnInit {

  signInForm !: FormGroup;
  signUpForm!: FormGroup;
  errorMessage !: string;

  validationStrUpper!: string;
  validationStrSp!: string;
  validationStrLow!: string;
  regix = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  regLower = new RegExp("^(?=.*[a-z]).{1,}");
  regUpper = RegExp("^(?=.*[A-Z]).{1,}");
  regSpChar = new RegExp("^(?=.*[!@#\$%\^&\*]).{1,}");
  lengthPw!: boolean;


  constructor(public cart: CartService, private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    VanillaTilt.init(document.querySelector(".cardStyle") as HTMLElement, { max: 25, speed: 400 });

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
      displayName: ['', [Validators.required]],
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

  onSubmitSingUp() {

    const email = this.signUpForm.get('email')?.value;
    const password = this.signUpForm.get('password')?.value;
    const displayName = this.signUpForm.get('displayName')?.value;

    this.lengthPw = false;
    this.validationStrUpper = "";
    this.validationStrLow = "";
    this.validationStrSp = "";

    if ((this.regix.test(password) === false)) {
      if (password.length < 8) {
        this.lengthPw = true;
      }
      if (this.regUpper.test(password) === false) {
        this.validationStrUpper = "uppercase";
      }
      if (this.regLower.test(password) === false) {
        this.validationStrLow = "lowcase";
      }
      if (this.regSpChar.test(password) === false) {
        this.validationStrSp = "spcharcase";
      }
      $(('#myModal') as any).modal('show');

    } else {

      this.authService.creatNewUser(email, password, displayName).then(
        (result) => {

        }, (error) => {
          this.errorMessage = error;
          this.router.navigate(['auth/signup']);
        }
      );
    }
  }


  onGoogleConnection() {
    this.authService.GoogleAuth().then(
      (result) => {
        this.router.navigate(['/checkout']);
      }, (error) => {
        alert(error.message);
      });
  }

}
