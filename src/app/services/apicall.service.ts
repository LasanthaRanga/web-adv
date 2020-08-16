import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {

  TOKEN_KEY = 'secret';
  constructor(private http: HttpClient) { }

  call(url, param, func) {
    // console.log("api call");
    this.http.post(url, param).subscribe(result => {
      //   console.log(result);
      func(result);
    }, error => {
      func(error);
    });
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.clear();
  }


}
