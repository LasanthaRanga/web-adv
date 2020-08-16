import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ApicallService } from 'src/app/services/apicall.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  urlAttach = environment.apiUrl + 'addUp/';
  urlAdv = environment.apiUrl + 'add/';
  urlCat = environment.apiUrl + 'cat/';
  pendingList = [];
  id;
  isLoading = false;
  cats = [];
  constructor(
    private sanitizer: DomSanitizer,
    private apiCall: ApicallService,
    private http: HttpClient,
    private aRoute: ActivatedRoute
  ) {

    aRoute.params.subscribe(val => {
      this.isLoading = true;
      this.id = this.aRoute.snapshot.paramMap.get('id');
      if (this.id) {
        this.getSubCats();
      }
    });
  }

  ngOnInit() {
    this.isLoading = true;
    this.id = this.aRoute.snapshot.paramMap.get('id');
    if (this.id) {
    } else {
      this.getPendingList();
    }

  }



  getSubCats() {
    this.pendingList = [];
    this.apiCall.call(this.urlCat + 'getAllSubCats', { id: this.id }, data => {
      console.log(data.ids);
      this.apiCall.call(this.urlCat + 'getAddsByCats', { list: data.ids }, dd => {
        console.log(dd);
        this.pendingList = dd;
        
        this.loadAttach();
        this.isLoading = false;
      });
    });
  }

  getPendingList() {
    this.pendingList = [];
    this.apiCall.call(this.urlAdv + 'getActive', {}, data => {
      console.log(data);
      this.pendingList = data;
      this.loadAttach();
      this.isLoading = false;
    });
  }

  loadAttach() {

    const array = this.pendingList;
    for (let i = 0; i < array.length; i++) {
      this.http.get(this.urlAttach + array[i].image_path, {
        responseType: 'blob'
      }).subscribe(d => {
        const imgg = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(d));
        this.pendingList[i].details_other = imgg;

      });
    }
    this.isLoading = false;

    console.log(this.pendingList);
  }
}
