import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { firstValueFrom, lastValueFrom, } from 'rxjs';
import { DVD } from '../models/dvd';

@Injectable({
  providedIn: 'root'
})
export class DVDService {

  storage!: DVD[];

  constructor(private http: HttpClient) { }
  @Output() event = new EventEmitter();

  async loadDVD() {
    return lastValueFrom(this.http.get<DVD[]>("api/dvds"))
  
  }
   async addDVD(dvd: DVD) {
    return lastValueFrom(this.http.post<DVD[]>("api/dvds", dvd))
  }
  async get(id: string) {
    return firstValueFrom(this.http.get<DVD>("/api/dvds/" + id))
  }
  async filterProducts(query: string) {
		return firstValueFrom(this.http.get<DVD[]>("api/dvds", {
		  params: {
			search: query
		  }
		}));
	}
  async loadFree() {
    return lastValueFrom(this.http.get<DVD[]>("api/dvdsfree"))
  
  }

  async loadRentedBy(id: string) {
    return await firstValueFrom(this.http.get<DVD[]>("api/rented/" + id))
  
  }

  async back(id: string) {
    return firstValueFrom(this.http.delete<DVD>("/api/dvds/" + id))
  }

  async getRented() {
    return firstValueFrom(this.http.get<DVD[]>("/api/dvds_rented/"))
  }
}


  
