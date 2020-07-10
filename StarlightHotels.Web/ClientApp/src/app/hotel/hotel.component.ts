import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styles: [
  ]
})
export class HotelComponent implements OnInit {

  constructor() { }

  displayedColumns: string[] = ['name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  ngOnInit() {
    
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}