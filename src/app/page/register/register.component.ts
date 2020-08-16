import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApicallService } from 'src/app/services/apicall.service';
import { Router } from '@angular/router';

export interface User {
  id: number;
  name: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class RegisterComponent implements OnInit {

  url = environment.apiUrl + 'city/';
  urlUser = environment.apiUrl + 'users/';

  hide = true;
  myControl = new FormControl();
  options: User[] = [];
  filteredOptions: Observable<User[]>;
  selectedUser;

  myCityControl = new FormControl();
  citys: User[] = [];
  filteredcitys: Observable<User[]>;
  selectedcitys;

  fname;
  mobile;
  email;
  pword;
  address;




  constructor(private apicall: ApicallService, private router: Router) {
    this.apicall.call(this.urlUser + 'getDistric', {}, data => {
      let ar = [];
      data.forEach(el => {
        ar.push({ id: el.iddistric, name: el.distric_english });
      });
      this.options = ar;
      console.log(this.options);
    });
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.options.slice())
    );

    this.filteredcitys = this.myCityControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterCity(name) : this.citys.slice())
    );

  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  displayFnCity(user: User): string {
    return user && user.name ? user.name : '';
  }


  selectedUserChange(value) {
    console.log('change');
    console.log(value);

    this.selectedUser = value.id;
    let ar = [];
    this.apicall.call(this.urlUser + 'getCitys', value, data => {
      console.log(data);
      data.forEach(el => {
        ar.push({ id: el.idcity, name: el.city_english });
      });
      this.citys = ar;
      console.log(this.citys);
    });
  }

  selectedCityChange(value) {
    this.selectedcitys = value.id;
    console.log(this.selectedcitys);
  }


  private _filter(name: string): User[] {
    console.log(name);
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterCity(name: string): User[] {
    console.log(name);
    const filterValue = name.toLowerCase();
    return this.citys.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }


  signup() {
    const obj = {
      fname: this.fname,
      mobile: this.mobile,
      email: this.email,
      pword: this.pword,
      address: this.address,
      did: this.selectedUser,
      cid: this.selectedcitys
    };

    this.apicall.call(this.urlUser + 'signUp', obj, data => {
      console.log(data);
      this.router.navigate(['/login']);

    });
    console.log(obj);
  }

}
