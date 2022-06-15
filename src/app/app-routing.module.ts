import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DvdListComponent } from './dvd-list/dvd-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { DVDManagementComponent } from './dvd-management/dvd-management.component';
import { RentComponent } from './rent/rent.component';
import { DvdinfoComponent } from './dvdinfo/dvdinfo.component';
import { RentedComponent } from './rented/rented.component';


const routes: Routes = [
  {
    path: 'users',
    component: UserManagementComponent
  },
  {
    path: 'userlist',
    component: UserListComponent
  },
  {
    path: 'dvdlist',
    component: DvdListComponent
  },
  {
    path: 'dvds',
    component: DVDManagementComponent
  },
  {
    path: 'rents',
    component: RentComponent
  },
  {
    path: 'dvdinfo',
    component: DvdinfoComponent
  },
  {
    path: 'rented',
    component: RentedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
