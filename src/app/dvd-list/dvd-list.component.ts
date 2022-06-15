import { Component, OnInit } from '@angular/core';
import { DVD } from '../models/dvd';
import { DVDService } from '../services/dvd.service';

@Component({
  selector: 'app-dvd-list',
  templateUrl: './dvd-list.component.html',
  styleUrls: ['./dvd-list.component.css']
})
export class DvdListComponent implements OnInit {

  constructor(private dvdService: DVDService) { }
  
  dvds!: DVD[];
  searchQuery!: string;

 async ngOnInit(): Promise<void> {
    this.dvds = await this.dvdService.loadDVD();
  }
  async search() {
    this.dvds = await this.dvdService.filterProducts(this.searchQuery);
    console.log(this.dvds);
   }
}
