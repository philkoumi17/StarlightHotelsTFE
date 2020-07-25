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
  id: number;
  nom: string;
  nbEtoiles: number;
  nbChambres: number;
  description: string;
  adresse: string;
  codePostal: string;
  ville: string;
  pays: Pays;
  telephone: string;
  enPromotion: boolean;
  topDestination: boolean;
  actif: boolean;
  coefficient: boolean;
  checkIn: string;
  checkOut: string;
  Hotel: Hotel;

  constructor(private service: HotelService, private dialogRef: MatDialogRef<HotelComponent>, @Inject(MAT_DIALOG_DATA) data)
  {
    this.id = data.Id;
  }

  ngOnInit(): void {
    this.service.getHotels().subscribe(result => {  
      this.Hotel = result.find(a => a.id == this.id);  
      this.nom = this.Hotel.nom;  
      this.nbEtoiles = this.Hotel.nbEtoiles;  
      this.nbChambres = this.Hotel.nbChambres;
      this.description = this.Hotel.description;
      this.adresse = this.Hotel.adresse;
      this.codePostal = this.Hotel.codePostal;
      this.ville = this.Hotel.ville;  
      this.pays = this.Hotel.pays;
      this.telephone = this.Hotel.telephone;
      this.enPromotion = this.Hotel.enPromotion;
      this.topDestination = this.Hotel.topDestination;
      this.actif = this.Hotel.actif;
      this.coefficient = this.Hotel.coefficient;
      this.checkIn = this.Hotel.checkIn;
      this.checkOut = this.Hotel.checkOut;
    })  
  }
  
  close()
  {  
    this.dialogRef.close();  
  } 
}