import { Reservation } from './reservation.model';

export class Utilisateur
{
  id?: string;
  userName?: string;
  nom?: string;
  prenom?: string;
  dateNaissance?: Date;
  sexe?: string;
  rue?: string;
  numeroRue?: string;
  codePostal?: string;
  ville?: string;
  paysId?: number;
  email?: string;
  fullName?: string;
  password?: string;
  phoneNumber?: string;
  role?: string;
  reservations?: Reservation[];
}
