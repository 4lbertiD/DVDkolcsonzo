import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { firstValueFrom, lastValueFrom, } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  storage!: User[];

  constructor(private http: HttpClient) { }
  @Output() event = new EventEmitter();

  async loadUser() {
    return lastValueFrom(this.http.get<User[]>("api/users"))
  
  }
   async addUser(user: User) {
    return lastValueFrom(this.http.post<User[]>("api/users", user))
  }

  async filterProducts(query: string) {
		return firstValueFrom(this.http.get<User[]>("api/users", {
		  params: {
			search: query
		  }
		}));
	}
  async get(id: string) {
    return firstValueFrom(this.http.get<User>("/api/users/" + id))
  }
  async delete(id: string) {
    return firstValueFrom(this.http.delete<any>(`/api/users/${id}`));
  }
  }

  
