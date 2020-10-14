import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Theme } from '../models/theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  readonly baseURI = 'https://localhost:44315/api';
  list: Theme[];
  dataChange: BehaviorSubject<Theme[]> = new BehaviorSubject<Theme[]>([]);

  constructor(private http: HttpClient) { }

  get data(): Theme[] {
    return this.dataChange.value;
  }

  /* CRUD METHODS */
  getAllThemes(): void {
    this.http.get<Theme[]>(`${this.baseURI}/Theme/GetThemes`).subscribe(
      data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  async getThemeById(themeId)
  {
    return await this.http.get<Theme>(this.baseURI + '/Theme/' + themeId).toPromise();
  }
}