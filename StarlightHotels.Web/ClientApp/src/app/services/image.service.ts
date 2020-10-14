import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Image } from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  readonly baseURI = 'https://localhost:44315/api';
  list: Image[];
  dataChange: BehaviorSubject<Image[]> = new BehaviorSubject<Image[]>([]);

  constructor(private http: HttpClient) { }

  get data(): Image[] {
    return this.dataChange.value;
  }

  /* CRUD METHODS */
  getAllImages(): void {
    this.http.get<Image[]>(`${this.baseURI}/Image/GetImages`).subscribe(
      data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  async getImageById(imageId)
  {
    return await this.http.get<Image>(this.baseURI + '/Image/' + imageId).toPromise();
  }
}
