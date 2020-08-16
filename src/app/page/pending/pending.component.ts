import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ApicallService } from 'src/app/services/apicall.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {
  urlAttach = environment.apiUrl + 'addUp/';
  urlAdv = environment.apiUrl + 'add/';
  pendingList = [];
  constructor(private sanitizer: DomSanitizer, private apiCall: ApicallService, private http: HttpClient,) { }

  ngOnInit() {
    this.getPendingList();
  }

  getPendingList() {
    this.apiCall.call(this.urlAdv + 'getPending', {}, data => {
      console.log(data);
      this.pendingList = data;
      // console.log(this.pendingList);
      this.loadAttach();
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


    console.log(this.pendingList);
  }


}
