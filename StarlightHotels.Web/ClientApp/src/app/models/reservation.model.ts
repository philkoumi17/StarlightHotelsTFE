import { EtatModel } from "./etat.model";
import { UserModel } from "./user.model";

export class Reservation
{
  id?: number;
  user?: UserModel;
  dateReservation: Date;
  etatId?: number;
}
