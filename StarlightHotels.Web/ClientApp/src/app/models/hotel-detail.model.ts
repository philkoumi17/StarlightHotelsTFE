import { Categorie } from './categorie.model';
import { Formule } from './formule.model';
import { Theme } from './theme.model';
import { Service } from './service.model';
import { Hotel } from './hotel.model';

export class HotelDetail {
  hotelInfos: Hotel;
  hotelRooms: Categorie[];
  hotelThemes: Theme[];
  hotelFormules: Formule[];
  hotelServicesFree: Service[];
  hotelServicesNoFree: Service[];
}
