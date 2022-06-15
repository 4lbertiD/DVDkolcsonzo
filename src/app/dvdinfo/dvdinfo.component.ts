import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DVD } from '../models/dvd';
import { DVDService } from '../services/dvd.service';
import { RentService } from '../services/rent.service';

@Component({
  selector: 'app-dvdinfo',
  templateUrl: './dvdinfo.component.html',
  styleUrls: ['./dvdinfo.component.css']
})
export class DvdinfoComponent implements OnInit {
  dvd!: DVD

  constructor(
    private dvdService: DVDService,
    private rentService: RentService,
    private activatedRoute : ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    const id = this.activatedRoute.snapshot.queryParams.id;

    this.dvd = await this.dvdService.get(id);

    console.log(this.dvd)
  }

  async back() {
    this.dvd = await this.dvdService.back(this.dvd.id);
    this.router.navigateByUrl('/dvdlist');
  }

}
