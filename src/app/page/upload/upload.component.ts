import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ApicallService } from 'src/app/services/apicall.service';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @ViewChild(ImageCropperComponent, { static: false }) angularCropper: ImageCropperComponent;
  id;

  assignid = '';
  selectedFile: File = null;
  urlAttach = environment.apiUrl + 'addUp/';
  imageUrl = environment.imagePath;
  upProgrus = 0;
  isLoading = false;
  comment = '';
  url = '';
  attach = [];

  images;
  imageList = [];

  w = 300;
  h = 0;

  imageChangedEvent;
  croppedImage;
  uploadBlob;

  imageObject: Array<object> = [];

  constructor(
    private aroute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private apiCall: ApicallService) {
    // this.route.params.subscribe(params => this.assignid = params.id);
    // console.log(this.assignid);

  }

  ngOnInit() {
    this.id = this.aroute.snapshot.paramMap.get('id');
    console.log(this.id);
    // this.loadUploaded();
    this.loadAttach();
    this.h = this.w / 4 * 3;
  }


  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]); // read file as data url


    reader.onload = (imgsrc: any) => { // called once readAsDataURL is completed
      this.url = imgsrc.target.result;
      //this.url = reader.result;
    };

    // console.log(event);
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    // this.imageChangedEvent = event;
    //  console.log(this.imageChangedEvent);
  }
  imageCropped(image: string) {
    this.croppedImage = image;
    // this.croppedImage = image;
    //  console.log(this.croppedImage);
  }

  imageLoaded() {
    // show cropper
  }

  loadImageFailed() {
    // show message
  }



  onUpload() {
    this.isLoading = true;
    const fd = new FormData();

    fd.append('idAdv', this.id);

    if (this.croppedImage != null) {
      fd.append('attach', this.croppedImage, this.croppedImage.name);
    }

    this.http.post(this.urlAttach + 'upload', fd, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(events => {
      if (events.type === HttpEventType.UploadProgress) {
        this.upProgrus = Math.round(events.loaded / events.total * 100);
        if (this.upProgrus === 100) {
          this.isLoading = false;
          this.croppedImage = null;
          this.imageChangedEvent = null;
          this.loadAttach();
          // this.getUploads();
        }
      } else if (events.type === HttpEventType.Response) {
        console.log(events);
      }
    });
  }


  upload() {
    this.isLoading = true;


    const fd = new FormData();
    fd.append('idAdv', this.id);

    console.log(this.croppedImage);
    fetch(this.croppedImage.base64)
      .then(res => res.blob())
      .then(res => {

        this.uploadBlob = new File([res], +'_' + this.id + '_adv.png', { type: 'image/png' });

        fd.append('attach', this.uploadBlob, this.uploadBlob.name);
        this.http.post(this.urlAttach + 'upload', fd, {
          reportProgress: true,
          observe: 'events'
        }).subscribe(events => {
          if (events.type === HttpEventType.UploadProgress) {
            this.upProgrus = Math.round(events.loaded / events.total * 100);
            if (this.upProgrus === 100) {
              this.isLoading = false;
              this.croppedImage = null;
              this.imageChangedEvent = null;
              this.loadAttach();
            }
          } else if (events.type === HttpEventType.Response) {
            console.log('upload completed image path is');
            console.log(events.body);
          }
        });
      });

  }




  loadAttach() {
    console.log("  uploads  ");
    this.http.get(this.urlAttach + 'getUploadList/' + this.id).subscribe(data => {
      // console.log(data);
      const array = JSON.parse(JSON.stringify(data));
      for (let i = 0; i < array.length; i++) {
        this.http.get(this.urlAttach + array[i].image_path, {
          responseType: 'blob'
        }).subscribe(blob => {
          const reader = new FileReader();
          //  console.log(blob);
          reader.addEventListener('loadend', (e) => {
            const result = (<any>e.srcElement).result;
            const url = this.sanitizer.bypassSecurityTrustUrl(result);
            this.imageObject.push({
              image: result,
              thumbImage: result,
            });

            console.log(this.imageObject);

          });
          reader.readAsDataURL(blob);
        });
      }
    });
  }



}
