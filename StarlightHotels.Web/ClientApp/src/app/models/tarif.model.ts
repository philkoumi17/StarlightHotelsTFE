import { Categorie } from "./categorie.model";
import { Saison } from "./saison.model";

export class Tarif
{
  id?: number;
  prix: number;
  categorieId?: number;
  categorie?: Categorie;
  saisonId?: number;
  saison?: Saison;
}
