import { Component, OnInit, Inject } from '@angular/core';
import { Pays } from 'src/app/models/pays.model';
import { Hotel } from 'src/app/models/hotel.model';
import { HotelService } from 'src/app/services/hotel.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotelComponent } from '../hotel.component';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styles: [
  ]
})

export class HotelDetailComponent implements OnInit {
  // Hotel's info
  Id: number;
  Nom: string;
  NbEtoiles: number;
  NbChambres: number;
  Description: string;
  Adresse: string;
  CodePostal: string;
  Ville: string;
  Pays: Pays;
  Telephone: string;
  EnPromotion: boolean;
  TopDestination: boolean;
  Actif: boolean;
  Coefficient: boolean;
  Hotel: Hotel;

  constructor(private service: HotelService, private dialogRef: MatDialogRef<HotelComponent>, @Inject(MAT_DIALOG_DATA) data)
  {
    this.Id = data.Id;
  }

  ngOnInit(): void {
    this.service.getHotels().subscribe(result => {  
      this.Hotel = result.find(a => a.Id == this.Id);  
      this.Nom = this.Hotel.Nom;  
      this.NbEtoiles = this.Hotel.NbEtoiles;  
      this.NbChambres = this.Hotel.NbChambres;
      this.Description = this.Hotel.Description;
      this.Adresse = this.Hotel.Adresse;
      this.CodePostal = this.Hotel.CodePostal;
      this.Ville = this.Hotel.Ville;  
      this.Pays = this.Hotel.Pays;
      this.Telephone = this.Hotel.Telephone;
      this.EnPromotion = this.Hotel.EnPromotion;
      this.TopDestination = this.Hotel.TopDestination;
      this.Actif = this.Hotel.Actif;
      this.Coefficient = this.Hotel.Coefficient;
    })  
  }
  
  close()
  {  
    this.dialogRef.close();  
  } 
}