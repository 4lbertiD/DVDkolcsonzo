import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DVD } from 'src/app/models/dvd';

@Component({
  selector: 'app-dvd',
  templateUrl: './dvd.component.html',
  styleUrls: ['./dvd.component.css']
})
export class DvdComponent implements OnInit {
  
  @Input()
  dvd!: DVD;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  edit(id: string){
    this.router.navigate(['/dvds'],{queryParams: {id: id}})
  }

  info(id: string) {
    this.router.navigate(['/dvdinfo'], {queryParams: {id: id}})
  }

}
