import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm !: FormGroup;
  errorMessage: string = "";
  validationStrUpper!:string;
  validationStrSp!: string;
  validationStrLow!: string;
  regix = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  regLower = new RegExp("^(?=.*[a-z]).{1,}");
  regUpper = RegExp("^(?=.*[A-Z]).{1,}");
  regSpChar = new RegExp("^(?=.*[!@#\$%\^&\*]).{1,}");
  lengthPw!: boolean;

  constructor(private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signUpForm = this.formBuilder.group({
      displayName: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z!@#$%^&*]{8,}/)]]
    });
  }

  onSubmit() {
    const email = this.signUpForm.get('email')?.value;
    const password = this.signUpForm.get('password')?.value;
    const displayName = this.signUpForm.get('displayName')?.value;

    this.lengthPw = false;
    this.validationStrUpper = "";
    this.validationStrLow = "";
    this.validationStrSp = "";

    if ((this.regix.test(password) === false)) {
      if(password.length < 8){
        this.lengthPw = true;
      }
      if(this.regUpper.test(password) === false){
        this.validationStrUpper = "uppercase";
      }
      if(this.regLower.test(password) === false){
        this.validationStrLow = "lowcase";
      }
      if(this.regSpChar.test(password) === false){
        this.validationStrSp = "spcharcase";
      }
      $(('#myModal') as any).modal('show');

    } else {
      this.authService.creatNewUser(email, password, displayName).then(
        (result) => {
          //this.router.navigate(['/books']);          
        }, (error) => {
          this.errorMessage = error;
          this.router.navigate(['auth/signup']);
        }
      );
    }
  }
}

