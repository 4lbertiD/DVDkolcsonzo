import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

    userForm: FormGroup = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      address: ['', Validators.required],
      tel: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      uid: ['', Validators.required],
      deleted: [0]
    });
  
    constructor(
      private userService: UserService,
      private formBuilder: FormBuilder,
      private router: Router,
      private activatedRoute : ActivatedRoute ){}
  
    async ngOnInit(): Promise<void> {

      const id = this.activatedRoute.snapshot.queryParams.id;

      if (id) {
        const user = await this.userService.get(id);
        this.userForm.setValue(user);
      }

    }
    get id() {
      return this.userForm.controls['id'];
    }
    get name() {
      return this.userForm.controls['name'];
    }

    get address() {
      return this.userForm.controls['address'];
    }
    get tel() {
      return this.userForm.controls['tel'];
    }
    
    get uid() {
      return this.userForm.controls['uid'];
    }
    get deleted() {
      return this.userForm.controls['deleted'];
    }
         
    async addUser(){
      const user = this.userForm.value;
     await this.userService.addUser(user);
      this.router.navigateByUrl('/userlist');
      
    }
  }

