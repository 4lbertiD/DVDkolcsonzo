import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  
  users!: User[];
  searchQuery!: string;

  constructor(private userService: UserService) { }

 async ngOnInit(): Promise<void> {
    this.users = await this.userService.loadUser();
  }

  async search() {
   this.users = await this.userService.filterProducts(this.searchQuery);
   console.log(this.users);
  }
}

