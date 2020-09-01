import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApicallService } from 'src/app/services/apicall.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-homecat',
  templateUrl: './homecat.component.html',
  styleUrls: ['./homecat.component.css']
})
export class HomecatComponent implements OnInit {
  urlCat = environment.apiUrl + 'cat/';
  urlAttach = environment.apiUrl + 'catUp/';
  maincats = [];


  constructor(private apiCall: ApicallService, private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getMainCats();
  }

  getMainCats() {
    this.apiCall.call(this.urlCat + 'getMainCats', {}, data => {
      this.maincats = data;
      console.log(this.maincats);
      this.loadAttach();
    });
  }

  loadAttach() {

    const array = this.maincats;
    for (let i = 0; i < array.length; i++) {
      this.http.get(this.urlAttach + array[i].imagePath, {
        responseType: 'blob'
      }).subscribe(d => {
        const imgg = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(d));
        this.maincats[i].description = imgg;

      });
    }
    // this.isLoading = false;

    console.log(this.maincats);
  }

}
