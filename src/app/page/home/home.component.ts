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
  urlUser = environment.apiUrl + 'users/';

  pendingList = [];
  id;
  isLoading = false;
  cats = [];
  districs = [];
  selectedDis;
  cityArray = [];
  selectedCity;


  imageArray = [
    { title: 'Ela Kiri', url: 'https://www.designyourway.net/blog/wp-content/uploads/2018/02/4k-Game-Wallpaper-ultra-high-definition-game-wallpaper-1200x675.jpg' },
    { title: 'dweasdf', url: 'https://www.designyourway.net/blog/wp-content/uploads/2018/02/4k-landscape-background-As-Wallpaper-HD-768x432.jpg' }
  ];


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
    this.getDistict();
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
      // console.log(data.ids);

      if (this.selectedCity && this.selectedCity.idcity > 0) {
        this.apiCall.call(this.urlCat + 'getAddsByCatsAndCity', { list: data.ids, id: this.selectedCity.idcity }, dd => {
          // console.log(dd);
          this.pendingList = dd;

          this.loadAttach();
          this.isLoading = false;
        });

      } else if (this.selectedDis && this.selectedDis.iddistric > 0) {

        this.apiCall.call(this.urlCat + 'getAddsByCatsAndDis', { list: data.ids, id: this.selectedDis.iddistric }, dd => {
          // console.log(dd);
          this.pendingList = dd;

          this.loadAttach();
          this.isLoading = false;
        });

      } else {
        this.apiCall.call(this.urlCat + 'getAddsByCats', { list: data.ids }, dd => {
          //   console.log(dd);
          this.pendingList = dd;

          this.loadAttach();
          this.isLoading = false;
        });
      }


      this.isLoading = false;
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

  getDistict() {
    this.apiCall.call(this.urlUser + 'getDistric', {}, data => {
      this.districs = data;
    });
  }

  disChange() {
    this.selectedCity = null;
    this.apiCall.call(this.urlUser + 'getCitys', { id: this.selectedDis.iddistric }, data => {
      this.cityArray = data;
      console.log(this.cityArray);
      this.getSubCats();
    });
  }



  cityChange() {
    console.log(this.selectedCity);
    this.getSubCats();
  }



}
