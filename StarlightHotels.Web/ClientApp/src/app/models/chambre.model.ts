import { Hotel } from './hotel.model';
import { Categorie } from './categorie.model';

export class Chambre
{
  id?: number;
  disponibilite?: boolean;
  hotelId?: number;
  hotel?: Hotel;
  categorieId?: number;
  categorie: Categorie;
}
