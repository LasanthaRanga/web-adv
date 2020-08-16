import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ApicallService } from 'src/app/services/apicall.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})



export class SelectComponent implements OnInit {

  urlAttach = environment.apiUrl + 'addUp/';
  urlAdv = environment.apiUrl + 'add/';
  imageUrl = environment.imagePath;
  images;
  id;
  adv;
  priority;
  day;

  user; uid;
  imageObject: Array<object> = [

    // , {
    //   image: 'https://material.angular.io/assets/img/examples/shiba2.jpg', // Support base64 image
    //   thumbImage: 'https://material.angular.io/assets/img/examples/shiba2.jpg', // Support base64 image
    //   title: 'Image title', // Optional: You can use this key if want to show image with title
    //   alt: 'Image alt' // Optional: You can use this key if want to show image with alt
    // }

  ];

  w = 500;
  h = 300;

  public innerWidth: any;


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.w = innerWidth - 100;
    this.h = this.w / 4 * 3;
  }


  constructor(
    private aroute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private apiCall: ApicallService) { }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user) {
      this.uid = this.user.uid;
    }


    console.log(this.user);

    this.id = this.aroute.snapshot.paramMap.get('id');
    console.log(this.id);
    this.innerWidth = window.innerWidth;
    this.w = innerWidth - 100;
    this.h = this.w / 3 * 2;

    this.loadAttach();
    this.getData();
    // this.getUploads();
  }

  getData() {
    this.apiCall.call(this.urlAdv + 'getAddData', { idadv: this.id }, result => {
      this.adv = result[0];
      console.log(this.adv);
    });
  }

  getUploads() {
    this.http.get(this.urlAttach + 'getUploadList/' + this.id).subscribe(data => {
      this.images = data;
      console.log(this.images);
      this.images.forEach(i => {
        this.imageObject.push({
          image: this.imageUrl + i.image_path,
          thumbImage: this.imageUrl + i.image_path,
          // alt: 'alt of image',
          // title: 'title of image'

        });
      });
    });
  }

  loadAttach() {
    this.http.get(this.urlAttach + 'getUploadList/' + this.id).subscribe(data => {
      const array = JSON.parse(JSON.stringify(data));
      for (let i = 0; i < array.length; i++) {
        this.http.get(this.urlAttach + array[i].image_path, {
          responseType: 'blob'
        }).subscribe(blob => {
          const reader = new FileReader();
          // console.log(blob);
          reader.addEventListener('loadend', (e) => {
            const result = (<any>e.srcElement).result;
            const url = this.sanitizer.bypassSecurityTrustUrl(result);
            this.imageObject.push({
              image: result,
              thumbImage: result,
            });
          });
          reader.readAsDataURL(blob);
        });
      }
    });

    //  console.log(this.imageObject);
  }



  active() {
    const pipe = new DatePipe('en-US');
    const date = pipe.transform(this.day, 'yyyy-MM-dd');

    if (date != null && this.priority > 0) {
      console.log(date + " -- " + this.priority);
      this.apiCall.call(this.urlAdv + 'setActiveAdv', { idadv: this.id, exd: date, priority: this.priority }, result => {
        // this.adv = result[0];
        console.log(result);
        this.router.navigate(['/pending']);
      });

    } else {
      console.log('"error"');
    }


  }

}
