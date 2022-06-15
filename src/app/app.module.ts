import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { HttpClientModule } from '@angular/common/http';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user-list/user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DvdListComponent } from './dvd-list/dvd-list.component';
import { DvdComponent } from './dvd-list/dvd/dvd.component';
import { DVDManagementComponent } from './dvd-management/dvd-management.component';
import { RentComponent } from './rent/rent.component';
import { DvdinfoComponent } from './dvdinfo/dvdinfo.component';
import { RentedComponent } from './rented/rented.component';

@NgModule({
  declarations: [
    AppComponent,
    UserManagementComponent,
    UserListComponent,
    UserComponent,
    DvdListComponent,
    DvdComponent,
    DVDManagementComponent,
    RentComponent,
    DvdinfoComponent,
    RentedComponent,
  ],
  imports: [
        BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
