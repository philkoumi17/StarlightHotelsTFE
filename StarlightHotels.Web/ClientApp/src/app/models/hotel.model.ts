import { Pays } from './pays.model';

export class Hotel {
  id?: number;
  nom: string;
  nbEtoiles: number;
  nbChambres: number;
  description: string;
  adresse: string;
  codePostal: string;
  ville: string;
  paysId?: number;
  pays?: Pays;
  telephone: string;
  enPromotion: boolean;
  topDestination: boolean;
  actif: boolean;
  coefficient: number;
  checkIn: string;
  checkOut: string;
}
