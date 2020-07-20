import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Hotel } from "../../models/hotel.model";
import { SelectionModel } from '@angular/cdk/collections';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { HotelService } from "../../services/hotel.service";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styles: [
  ]
})
export class HotelComponent implements OnInit {
  TotalRow: number;
  displayedColumns: string[] = ['Nom', 'NbEtoiles', 'NbChambres', 'Description', 'Adresse', 'CodePostal', 'Ville', 'Pays', 'Telephone', 'EnPromotion', 'TopDestination', 'Actif', 'Coefficient'];
  dataSource = new MatTableDataSource<Hotel>();
  selection = new SelectionModel<HotelComponent>(true, [])

  constructor(private service: HotelService, private dialog: MatDialog) { }

  ngOnInit() {
    this.LoadData();
  }

  LoadData()
  {  
    this.service.getHotels().subscribe(result => {  
      this.dataSource = new MatTableDataSource(result);  
    })
  }

  openDialog(data)
  {  
    debugger;  
    const dialogConfig = new MatDialogConfig();  
    dialogConfig.disableClose = true;  
    dialogConfig.autoFocus = true;  
    dialogConfig.position = {  
        'top': '100px',  
        'left': '500px'  
    };  
    dialogConfig.width = '500px';  
    dialogConfig.height = '500px';  
    dialogConfig.data = {  
        Id: data.Id  
    };  
    this.dialog.open(HotelDetailComponent, dialogConfig);  
  }  
}