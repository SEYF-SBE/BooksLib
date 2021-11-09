import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})

export class ForgotPasswordComponent implements OnInit {


	fgtPwForm !: FormGroup;

  constructor(
	public authService: AuthService,
	public router: Router, 
	private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
	  this.fgtPwForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]]});
  }

  forgotPassword(){
	  const email = this.fgtPwForm.get('email')?.value;
	  this.authService.ForgotPassword(email);
	  this.router.navigate(['/auth/signin']);
  }

}