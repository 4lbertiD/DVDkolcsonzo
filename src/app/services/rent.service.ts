import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { firstValueFrom, lastValueFrom, } from 'rxjs';
import { Rent } from '../models/rent';

@Injectable({
  providedIn: 'root'
})
export class RentService {

  storage!: Rent[];

  constructor(private http: HttpClient) { }
  @Output() event = new EventEmitter();

  async addRent(rent: Rent) {
    return lastValueFrom(this.http.post<Rent[]>("api/rents", rent))
  }
  async get(id: string) {
    return firstValueFrom(this.http.get<Rent>("/api/rents/" + id))
  }

  }

  
