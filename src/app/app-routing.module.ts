import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { CategoryComponent } from './page/category/category.component';
import { NewpostComponent } from './page/newpost/newpost.component';
import { ManageComponent } from './page/manage/manage.component';
import { UsersComponent } from './page/users/users.component';
import { ProfileComponent } from './page/profile/profile.component';
import { UploadComponent } from './page/upload/upload.component';
import { PendingComponent } from './page/pending/pending.component';
import { SelectComponent } from './page/select/select.component';
import { HomecatComponent } from './page/homecat/homecat.component';
const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'homecat', component: HomecatComponent },
  { path: 'home', component: HomeComponent },
  { path: 'home/:id', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'newpost', component: NewpostComponent },
  { path: 'manage', component: ManageComponent },
  { path: 'users', component: UsersComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'upload/:id', component: UploadComponent },
  { path: 'pending', component: PendingComponent },
  { path: 'select/:id', component: SelectComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
