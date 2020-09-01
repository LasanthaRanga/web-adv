import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApicallService } from 'src/app/services/apicall.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-homecat',
  templateUrl: './homecat.component.html',
  styleUrls: ['./homecat.component.css']
})
export class HomecatComponent implements OnInit {
  urlCat = environment.apiUrl + 'cat/';

  maincats = [];


  constructor(private apiCall: ApicallService) { }

  ngOnInit() {
    this.getMainCats();
  }

  getMainCats() {
    this.apiCall.call(this.urlCat + 'getMainCats', {}, data => {
      this.maincats = data;
    });
  }

}
