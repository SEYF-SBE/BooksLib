import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signIpForm !: FormGroup;
  errorMessage !: string;

  constructor(private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signIpForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {
    const email = this.signIpForm.get('email')?.value;
    const password = this.signIpForm.get('password')?.value;

    this.authService.SignInUser(email, password).then(
      (resolve) => {
        this.router.navigate(['/books']);
      }, (error) => {
        this.errorMessage = error;
      }
    );
  }

  onSubmitGoogle(){
    this.authService.GoogleAuth().then(
      (result) => {
        this.router.navigate(['/books']);
    }, (error) => {
      alert(error.message);
    });
    //this.router.navigate(['/books']);
  }

}
