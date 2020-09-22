import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ApicallService } from 'src/app/services/apicall.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { BehaviorSubject, Observable, of as observableOF } from 'rxjs';


export class FileNode {
  id: number;
  child: FileNode[];
  name: string;
  status: any;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nestedTreeControl: NestedTreeControl<FileNode>;
  nestedDataSource: MatTreeNestedDataSource<FileNode>;
  dataChange: BehaviorSubject<FileNode[]> = new BehaviorSubject<FileNode[]>([]);


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
  fiterdCityArray = [];
  filterText;
  selectedCity;
  allCats = [];
  innerWidth;
  catnemu = false;
  catHideButton = false;

  imageArray = [
    { title: 'Ela Kiri', url: 'https://www.designyourway.net/blog/wp-content/uploads/2018/02/4k-Game-Wallpaper-ultra-high-definition-game-wallpaper-1200x675.jpg' },
    { title: 'dweasdf', url: 'https://www.designyourway.net/blog/wp-content/uploads/2018/02/4k-landscape-background-As-Wallpaper-HD-768x432.jpg' }
  ];


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth);
    if (this.innerWidth < 575) {
      this.catnemu = false;
      this.catHideButton = false;
    } else {
      this.catnemu = true;
    }
  }

  constructor(
    private sanitizer: DomSanitizer,
    private apiCall: ApicallService,
    private http: HttpClient,
    private aRoute: ActivatedRoute
  ) {

    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth);
    if (this.innerWidth < 575) {
      this.catnemu = false;
    } else {
      this.catnemu = true;
    }

    this.apiCall.call(this.urlCat + 'getAll', {}, data => {
      this.allCats = data;

      this.dataChange.next(this.allCats);

      this.nestedDataSource = new MatTreeNestedDataSource();

      this.nestedTreeControl = new NestedTreeControl<FileNode>(this._getChildren);

      this.dataChange.subscribe(dataa => this.nestedDataSource.data = dataa);

    });


    aRoute.params.subscribe(val => {
      this.isLoading = true;
      this.id = this.aRoute.snapshot.paramMap.get('id');
      if (this.id) {
        this.getSubCats();
      }
    });
  }

  private _getChildren = (node: FileNode) => { return observableOF(node.child); };

  hasNestedChild = (_: number, nodeData: FileNode) => { return (true); };



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
      this.fiterdCityArray = data;
      console.log(this.cityArray);
      this.getSubCats();
    });
  }



  cityChange() {
    console.log(this.selectedCity);
    this.getSubCats();
  }

  filterItem(event) {

    this.fiterdCityArray = this.cityArray;
    if (!event) {
      return;

    }

    this.fiterdCityArray = this.cityArray.filter(currentGoal => {
      if (currentGoal.city_english && event) {
        if (
          currentGoal.city_english.toLowerCase().indexOf(event.toLowerCase()) > -1
        ) {
          return true;
        }
        return false;
      }
    });
    // console.log(this.fiterdCityArray.length);
    //  this.selectList.nativeElement.size = this.fiterdCityArray.length + 1;
  }

  viewCats() {
    if (this.catnemu) {
      this.catnemu = false;
      this.catHideButton = false;
    } else {
      this.catnemu = true;
      this.catHideButton = true;
    }
  }


}
