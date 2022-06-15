import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rent } from 'backend/src/entity/Rent';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  @Input()
  user!: User;

  constructor(private router: Router) { }

 ngOnInit(): void {}


  edit(id: string){
    this.router.navigate(['/users'],{queryParams: {id: id}})
  }
  rent(id: string){
    this.router.navigate(['/rents'],{queryParams: {id: id}})
  }
  }
