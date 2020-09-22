import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTreeModule, } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { ImageCropperModule } from 'ngx-image-cropper';

import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { CategoryComponent } from './page/category/category.component';
import { NewpostComponent } from './page/newpost/newpost.component';
import { ManageComponent } from './page/manage/manage.component';
import { UsersComponent } from './page/users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ProfileComponent } from './page/profile/profile.component';
import { UploadComponent } from './page/upload/upload.component';
import { PendingComponent } from './page/pending/pending.component';
import { SelectComponent } from './page/select/select.component';
// import { NgImageSliderModule } from 'ng-image-slider';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';


import { SliderModule } from 'angular-image-slider';
import { MainNavAdminComponent } from './main-nav-admin/main-nav-admin.component';
import { HomecatComponent } from './page/homecat/homecat.component';
import { NavigationComponent } from './navigation/navigation.component';

export function tokenGet() {
  return localStorage.getItem('secret');
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CategoryComponent,
    NewpostComponent,
    ManageComponent,
    UsersComponent,
    ProfileComponent,
    UploadComponent,
    PendingComponent,
    SelectComponent,
    MainNavAdminComponent,
    HomecatComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatTreeModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCarouselModule.forRoot(),
    MatProgressBarModule,

    NgxMatSelectSearchModule,
    ImageCropperModule,

    HttpClientModule,
    BrowserAnimationsModule,

    FormsModule,
    ReactiveFormsModule,
    // NgImageSliderModule,
    SliderModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGet,
        allowedDomains: ['https://apiadv.codetechasia.com/'],
        disallowedRoutes: ['http://example.com/examplebadroute/'],
      },
    }),
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
