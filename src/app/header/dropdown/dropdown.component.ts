import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  websiteList: any = ['Se connecter', 'Créer un compte'];

  form = new FormGroup({
    website: new FormControl('', Validators.required)
  });

  get f(){
    return this.form.controls;
  }

  changeWebsite(e:any) {

    if(e.target.value === 'Se connecter'){
      this.router.navigate(['auth/signin']);
      console.log(e.target.value);
    }else{
      this.router.navigate(['auth/signup']);
    }
  }

}
