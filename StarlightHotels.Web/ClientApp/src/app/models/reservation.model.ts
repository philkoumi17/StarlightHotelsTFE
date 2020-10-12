import { EtatModel } from "./etat.model";
import { UtilisateurModel } from "./user.model";

export class Reservation
{
  id?: number;
  utilisateur: UtilisateurModel;
  dateReservation: Date;
  etat: EtatModel;
}
