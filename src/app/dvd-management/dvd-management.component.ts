import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DVDService } from '../services/dvd.service';

@Component({
  selector: 'app-dvd-management',
  templateUrl: './dvd-management.component.html',
  styleUrls: ['./dvd-management.component.css']
})
export class DVDManagementComponent implements OnInit {

    dvdForm: FormGroup = this.formBuilder.group({
      id: [],
      title: ['', Validators.required],
      acq_date: ['', Validators.required],
      status: ['', [Validators.required]],
    });
  
    constructor(
      private dvdService: DVDService,
      private formBuilder: FormBuilder,
      private router: Router,
      private activatedRoute : ActivatedRoute ){}
  
    async ngOnInit(): Promise<void> {

      const id = this.activatedRoute.snapshot.queryParams.id;

      if (id) {
        const user = await this.dvdService.get(id);
        this.dvdForm.setValue(user);
      }
     

    }
    get id() {
      return this.dvdForm.controls['id'];
    }
    get title() {
      return this.dvdForm.controls['title'];
    }

    get acq_date() {
      return this.dvdForm.controls['acq_date'];
    }
    get status() {
      return this.dvdForm.controls['status'];
    }
         
    async addDVD(){
      const dvd = this.dvdForm.value;
     await this.dvdService.addDVD(dvd);
      this.router.navigateByUrl('/dvdlist');
      
    }
  }

