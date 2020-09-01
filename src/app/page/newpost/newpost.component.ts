import { Component, OnInit } from '@angular/core';
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
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})
export class NewpostComponent implements OnInit {

  url = environment.apiUrl + 'city/';
  urlUser = environment.apiUrl + 'users/';
  urlCat = environment.apiUrl + 'cat/';
  urlAdv = environment.apiUrl + 'add/';


  hide = true;
  myControl = new FormControl();
  options: User[] = [];
  filteredOptions: Observable<User[]>;
  selectedUser;

  myCityControl = new FormControl();
  citys: User[] = [];
  filteredcitys: Observable<User[]>;
  selectedcitys;


  catArray;
  cat1;
  cat1Array;
  cat2;
  cat2Array;
  cat3;
  cat3Array;
  cat4;
  cat4Array;
  cat5;
  cat5Array;
  cat6;
  cat6Array;

  lastSelected;
  ename;
  sname;


  distric;
  city;
  category;
  company;
  owner;
  adl1;
  adl2;
  adl3;
  des;
  companyS;
  ownerS;
  desS;
  phone;
  mobile;
  imo;
  fb;
  yt;
  web;
  user;
  uid;

  constructor(private apicall: ApicallService, private router: Router) {

    this.apicall.call(this.urlUser + 'getDistric', {}, data => {
      const ar = [];
      data.forEach(el => {
        ar.push({ id: el.iddistric, name: el.distric_english });
      });
      this.options = ar;
      console.log(this.options);
    });

  }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('user'));
    this.uid = this.user.uid;
    console.log(this.user);
    console.log(this.uid);

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

    this.cat1 = null;
    this.cat1Array = null;
    this.cat2 = null;
    this.cat2Array = null;
    this.cat3 = null;
    this.cat3Array = null;
    this.cat4 = null;
    this.cat4Array = null;
    this.cat5 = null;
    this.cat5Array = null;
    this.cat6 = null;
    this.cat6Array = null;
    this.apicall.call(this.urlCat + 'getAll', {}, data => {
      console.log(data);
      this.catArray = data;
    });


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
    const ar = [];
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


  change0() {
    this.lastSelected = this.cat1;
    console.log(this.lastSelected);

    this.cat2 = null;
    this.cat2Array = null;
    this.cat3 = null;
    this.cat3Array = null;
    this.cat4 = null;
    this.cat4Array = null;
    this.cat5 = null;
    this.cat5Array = null;
    this.cat6 = null;
    this.cat6Array = null;
    if (this.cat1.child.length > 0) {
      this.cat1Array = this.cat1.child;
    } else {
      this.cat1Array = null;
    }

  }

  change1() {
    this.lastSelected = this.cat2;
    console.log(this.lastSelected);
    this.cat3 = null;
    this.cat3Array = null;
    this.cat4 = null;
    this.cat4Array = null;
    this.cat5 = null;
    this.cat5Array = null;
    this.cat6 = null;
    this.cat6Array = null;
    if (this.cat2.child.length > 0) {
      this.cat2Array = this.cat2.child;
    } else {
      this.cat2Array = null;
    }
  }

  change2() {

    this.lastSelected = this.cat3;
    console.log(this.lastSelected);

    this.cat4 = null;
    this.cat4Array = null;
    this.cat5 = null;
    this.cat5Array = null;
    this.cat6 = null;
    this.cat6Array = null;
    if (this.cat3.child.length > 0) {
      this.cat3Array = this.cat3.child;

    } else {
      this.cat3Array = null;
    }
  }

  change3() {

    this.lastSelected = this.cat4;
    console.log(this.lastSelected);

    this.cat5 = null;
    this.cat5Array = null;
    this.cat6 = null;
    this.cat6Array = null;
    if (this.cat4.child.length > 0) {
      this.cat4Array = this.cat4.child;

    } else {
      this.cat4Array = null;
    }
  }

  change4() {
    this.lastSelected = this.cat5;
    console.log(this.lastSelected);
    this.cat6 = null;
    this.cat6Array = null;
    if (this.cat5.child.length > 0) {
      this.cat5Array = this.cat5.child;

    } else {
      this.cat5Array = null;
    }
  }


  change5() {
    this.lastSelected = this.cat6;
    console.log(this.lastSelected);
  }


  saveData() {
    const obj = {
      lastSelected: this.lastSelected.id,
      distric: this.selectedUser,
      city: this.selectedcitys,
      company: this.company,
      owner: this.owner,
      adl1: this.adl1,
      adl2: this.adl2,
      adl3: this.adl3,
      des: this.des,
      companyS: this.companyS,
      ownerS: this.ownerS,
      desS: this.desS,
      phone: this.phone,
      mobile: this.mobile,
      imo: this.imo,
      fb: this.fb,
      yt: this.yt,
      web: this.web,
      user: this.user.uid
    };

   // console.log(obj);

    this.apicall.call(this.urlAdv + 'newPost', obj, data => {
      console.log(data);
      this.router.navigate(['upload', data.idAdv]);
    });
  }


}
