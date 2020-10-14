import { Etat } from "./etat.model";
import { Utilisateur } from "./user.model";

export class Reservation
{
  id?: number;
  utilisateur: Utilisateur;
  dateReservation: Date;
  etat: Etat;
}
