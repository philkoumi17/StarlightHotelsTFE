import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Hotel } from '../models/hotel.model';
import { SearchHotelModel } from '../models/search-hotel.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { Pays } from '../models/pays.model';
import { HotelDetail } from '../models/hotel-detail.model';
import { Image } from '../models/image.model';
import { CategorieService } from './categorie.service';
import { HotelCategorie } from '../models/hotel-categorie.model';
import { TarifService } from './tarif.service';
import { Tarif } from '../models/tarif.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService
{
  readonly baseURI = 'https://localhost:44315/api';
  list: Hotel[];

  // For searching hotels
  hotelInstance: Hotel[];

  // Observable
  private hotelBehavior = new BehaviorSubject<Hotel[]>(this.hotelInstance);
  hotelData = this.hotelBehavior.asObservable();

  searchInstance: SearchHotelModel = {} as SearchHotelModel;
  searchBehavior = new BehaviorSubject<SearchHotelModel>(this.searchInstance);
  searchData = this.searchBehavior.asObservable();


  dataChange: BehaviorSubject<Hotel[]> = new BehaviorSubject<Hotel[]>([]);
  get data(): Hotel[] {
    return this.dataChange.value;
  }

  constructor(private http: HttpClient,
              private fb: FormBuilder,
              private categorieService?: CategorieService,
              private tarifService?: TarifService) { }

  formModel = this.fb.group({
    nom: ['', [Validators.required]],
    nbEtoiles: [0, [Validators.required]],
    nbChambres: [0, [Validators.required]],
    description: [''],
    adresse: ['', [Validators.required]],
    codePostal: ['', [Validators.required]],
    ville: ['', [Validators.required]],
    paysId: [0, [Validators.required]],
    pays: [null, [Validators.required]],
    telephone: ['', [Validators.required]],
    enPromotion: [false],
    topDestination: [false],
    actif: [false],
    coefficient: [0],
    checkIn: [new Date(), [Validators.required]],
    checkOut: [new Date(), [Validators.required]]
  });

  /** CRUD METHODS */
  getAllHotels(): void {
    this.http.get<Hotel[]>(`${this.baseURI}/Hotel/GetHotels`).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    });
  }

  async getHotels() {
    return await this.http.get<Hotel[]>(`${this.baseURI}/Hotel/GetHotels`).toPromise();
  }

  getCountries(): Observable<Pays[]>
  {
    return this.http.get<Pays[]>(`${this.baseURI}/Hotel/GetCountries`);
  }

  async getCitiesByCountry(paysId: number)
  {
    return await this.http.get<string[]>(this.baseURI + '/Hotel/GetCitiesByCountry/' + paysId).toPromise();
  }

  async getHotelById(hotelId)
  {
    return await this.http.get<Hotel>(this.baseURI + '/Hotel/' + hotelId).toPromise();
  }

  insertHotel()
  {
    let body: Hotel = {
      nom: this.formModel.value.nom,
      nbEtoiles: this.formModel.value.nbEtoiles,
      nbChambres: this.formModel.value.nbChambres,
      description: this.formModel.value.description,
      adresse: this.formModel.value.adresse,
      codePostal: this.formModel.value.codePostal,
      ville: this.formModel.value.ville,
      paysId: this.formModel.value.paysId,
      telephone: this.formModel.value.telephone,
      enPromotion: this.formModel.value.enPromotion,
      topDestination: this.formModel.value.topDestination,
      actif: this.formModel.value.actif,
      coefficient: this.formModel.value.coefficient,
      checkIn: this.formModel.value.checkIn,
      checkOut: this.formModel.value.checkOut,
    };
    console.log(body);
    console.log(this.baseURI + '/Hotel');
    this.http.post<Hotel>(this.baseURI + '/Hotel', body).subscribe(data => {
      return data;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    });
  }

  updateHotel(hotel: Hotel)
  {
    if (hotel && hotel.id)
    {
      this.http.put<Hotel>(this.baseURI + '/Hotel/' + hotel.id, hotel).subscribe(data => {
        return data;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
    }
  }

  // update hotel
  setHotel(hotel)
  {
    this.hotelBehavior.next(hotel);
  }

  deleteHotel(hotelId: number): Observable<number>
  {
    return this.http.delete<number>(this.baseURI + '/Hotel/id=' + hotelId);
  }

  refreshList()
  {
    this.http.get(this.baseURI + '/Hotel').toPromise().then(res =>
      this.list = res as Hotel[]);
  }

  /**
   * Search for hotels
   */
  async searchHotels(searchHotelModel: SearchHotelModel, isRoomSelection?: boolean)
  {
    this.searchBehavior.next(searchHotelModel);
    if (isRoomSelection) {
      return; //do not search for hotel
    }
    return await this.http.post<Hotel[]>(this.baseURI + '/Hotel/SearchHotels', searchHotelModel).toPromise();
  }

  async getAllHotelDetails(): Promise<Hotel[]> {
    return await this.getAllHotelsAync().then((data) => {
      let hotelList: Hotel[] = data;
      hotelList.forEach(async h => {
        // Get images
        await this.getPictures(h.id).then((img) => {
          h.images = img;
        });

        // Set Stars
        h.stars = [];
        for (let i = 0; i < h.nbEtoiles; i++) {
          h.stars.push(i);
        }

        await this.categorieService.GetHotelCategory(h.id).then(async (res) => {
          let hotelCatList: HotelCategorie[] = res;
          await this.tarifService.getTarifCategorieById(hotelCatList).then((result) => {
            h.tarif = result;
          });
        });
      });
      return hotelList;
    });
  }

  async getAllHotelsAync() {
    return await this.http.get<Hotel[]>(this.baseURI + '/Hotel/GetHotels').toPromise();
  }
  async getAllPromotedHotels()
  {
    return await this.http.get<Hotel[]>(this.baseURI + '/Hotel/GetAllPromotedHotels').toPromise();
  }
  async getAllTopHotels()
  {
    return await this.http.get<Hotel[]>(this.baseURI + '/Hotel/GetAllTopHotels').toPromise();
  }
  getPictures(hotelId: number)
  {
    return this.http.get<Image[]>(this.baseURI + '/Hotel/GetPictures/' + hotelId).toPromise();
  }
  async detailsHotel(hotelId: number)
  {
    return await this.http.get<HotelDetail>(this.baseURI + '/Hotel/detail/' + hotelId).toPromise();
  }
}
