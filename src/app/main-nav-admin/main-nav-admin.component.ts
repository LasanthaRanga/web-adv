import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApicallService } from 'src/app/services/apicall.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main-nav-admin',
  templateUrl: './main-nav-admin.component.html',
  styleUrls: ['./main-nav-admin.component.css']
})
export class MainNavAdminComponent {

  urlCat = environment.apiUrl + 'cat/';

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


  user;
  uid;

  links;

  login = [
    {
      title: 'Category',
      url: '/category',
      icon: 'list'
    },
    {
      title: 'New Post',
      url: '/newpost',
      icon: 'launch'
    },
    {
      title: 'Pending',
      url: '/pending',
      icon: 'hourglass_top'
    },
    {
      title: 'Home',
      url: '/homecat',
      icon: 'home'
    },
  ];

  notLogin = [
    {
      title: 'Home',
      url: '/homecat',
      icon: 'home'
    },
    {
      title: 'Register',
      url: '/register',
      icon: 'how_to_reg'
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'login'
    }
  ];


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private apicall: ApicallService, private router: Router) {

    this.user = JSON.parse(localStorage.getItem('user'));
    // this.uid = this.user.uid;

    if (this.user) {
      this.links = this.login;
    } else {
      this.links = this.notLogin;
    }

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

  change0() {
    this.lastSelected = this.cat1;
    console.log(this.lastSelected);
    this.navigate();
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
    this.navigate();
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


  navigate() {
    this.router.navigate(['/home', this.lastSelected.id]);
  }


}
