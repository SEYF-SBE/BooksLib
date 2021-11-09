import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm !: FormGroup
  errorMessage !: string;

  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.signUpForm = this.formBuilder.group({
      email : ['', [Validators.email, Validators.required]],
      password : ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit(){
    const email = this.signUpForm.get('email')?.value;
    const password = this.signUpForm.get('password')?.value;

    this.authService.creatNewUser(email, password).then(
      () => {
        //this.router.navigate(['/books']);
        this.router.navigate(['verify-email-address']);
      },(error) => {
        this.errorMessage = error;
      }
    );
  }

}
