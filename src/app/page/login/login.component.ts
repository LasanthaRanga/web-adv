import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApicallService } from 'src/app/services/apicall.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as allert from '../../allert';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  urlUser = environment.apiUrl + 'users/';
  hide = true;
  email;
  pword;
  mg;
  TOKEN_KEY = 'secret';

  user;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private apicall: ApicallService, private helper: JwtHelperService) {
    this.mg = new allert.Globle();
  }

  ngOnInit() {
  }

  register() {
    this.router.navigate(['/register']);
  }

  login() {
    console.log(this.email);
    console.log(this.pword);
    this.apicall.call(this.urlUser + 'login', { email: this.email, pword: this.pword }, data => {
      console.log(data);
      if (data.status == 401) {
        this.mg.message('warning', 'email name or password is wrong');
      } else if (data.status == 500) {
        this.mg.message('warning', 'email name or password is wrong');
      } else if (data.message == 'Auth Successfull') {
        this.user = this.helper.decodeToken(data['token']);
        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem(this.TOKEN_KEY, data['token']);
        
        console.log(localStorage.getItem('user'));
        this.mg.message('success', 'Login Successful');
   
        window.location.href = '/';
        
      }

    });
  }

  getAllUsers() {
    this.apicall.call(this.urlUser + 'getAllUsers', {}, data => {

      console.log(data);
    });
  }


}
