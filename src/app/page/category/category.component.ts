import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApicallService } from 'src/app/services/apicall.service';
import { Router } from '@angular/router';
import { MatTreeModule } from '@angular/material/tree';
import * as allert from '../../allert';

import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

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
  ename;
  sname;
  constructor(private router: Router, private apicall: ApicallService) {

  }

  ngOnInit() {
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

  createCat() {

    console.log(this.lastSelected);

    let obj = {};

    if (this.lastSelected) {
      obj = {
        parent_id: this.lastSelected.id,
        step: this.lastSelected.step + 1,
        sname: this.sname,
        ename: this.ename
      };
    } else {
      obj = {
        parent_id: 0,
        step: 0,
        sname: this.sname,
        ename: this.ename
      };
    }

    if (this.ename) {
      this.apicall.call(this.urlCat + 'addCat', obj, data => {
        this.sname = null;
        this.ename = null;
        this.change0();
        this.apicall.call(this.urlCat + 'getAll', {}, dataa => {
          console.log(dataa);
          this.catArray = dataa;
        });
      });
    }
  }





}
