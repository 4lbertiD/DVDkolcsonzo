import { Component, OnInit } from '@angular/core';
import { DVD } from '../models/dvd';
import { DVDService } from '../services/dvd.service';
import { RentService } from '../services/rent.service';

@Component({
  selector: 'app-rented',
  templateUrl: './rented.component.html',
  styleUrls: ['./rented.component.css']
})
export class RentedComponent implements OnInit {
  dvds!: DVD[];

  constructor(private rentService: RentService,
    private dvdService: DVDService) { }

  async ngOnInit(): Promise<void> {
    this.dvds = await this.dvdService.getRented();
  }

  getDelayDate(dvd: DVD) {
    const outdate = new Date(dvd.rents.out_date)
    const today = new Date();

    var one_day=1000*60*60*24;
  
    var date1_ms = outdate.getTime();
    var date2_ms = today.getTime();
  
    var difference_ms = date2_ms - date1_ms;
  
    return Math.round(difference_ms/one_day - 7); 
  }

}
