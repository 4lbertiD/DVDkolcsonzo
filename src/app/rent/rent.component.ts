import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Rent } from '../models/rent';
import { User } from '../models/user';
import { DVD } from '../models/dvd';
import { DVDService } from '../services/dvd.service';
import { RentService } from '../services/rent.service';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {

    rentForm: FormGroup = this.formBuilder.group({
      id: [],
      out_date: [''],
      back_date: [''],
      dvds: this.formBuilder.array([this.formBuilder.group({
      id: [],
      dvd: []
      })]),
      renter: []
    });

   dvdsFormArray = this.rentForm.get("dvds") as FormArray;

    @Input()
  
    dvds: DVD[] = [];
    rentedDVD: DVD[] = [];
  
    constructor(
      private userService: UserService,
      private formBuilder: FormBuilder,
      private router: Router,
      private activatedRoute : ActivatedRoute,
      private dvdService: DVDService,
      private rentService: RentService){}
  
    async ngOnInit(): Promise<void> {

      const id = this.activatedRoute.snapshot.queryParams.id;

      if (id) {
        const user = await this.userService.get(id);
        this.rentForm.patchValue({
          renter: user
        })
      }
      this.dvds = await this.dvdService.loadFree();
      this.rentedDVD = await this.dvdService.loadRentedBy(id);
      console.log(this.rentedDVD)

    }
   
    compareDVDs(dvd1: DVD, dvd2: DVD): boolean {
      return dvd1 && dvd2 && dvd1.id === dvd2.id
    }
    compareUsers(user1: User, user2: User): boolean {
      return user1 && user2 && user1.id === user2.id
    }
    async addRent(){
      const rent = this.rentForm.value;
     await this.rentService.addRent(rent);
      
    }

    addDVD(){
      this.dvdsFormArray.push(this.formBuilder.group({
        id: [],
        dvd: []
        }))
    }

    removeDVD(i: number){
      this.dvdsFormArray.removeAt(i)
    }
    toGroup(item: AbstractControl) {
      return item as FormGroup;
    } 
    onDVDchange(event: any, group: FormGroup) {
      const idRe = /\/(\d+)\/$/
      if(idRe.exec(event.target.value)) {
        const id = event.target.value.match(idRe)[1] * 1;
        group.patchValue({
          id: id
        });
      } else {
        group.patchValue({
          id: null,
          dvd: ''
        });
      }
    }
    rent () {
      const values = this.rentForm.value;
      const dvds =  []
      for (let i = 0; i < values["dvds"].length; i++){
        if (values["dvds"][i]["dvd"] !== null)
          dvds.push(values["dvds"][i]);
      }
      values["dvds"] = dvds;
      this.rentService.addRent(values);
      this.router.navigateByUrl('/dvdlist');
    }
  }

