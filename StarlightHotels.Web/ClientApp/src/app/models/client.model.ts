import { Pays } from "./pays.model";

export class Client
{
  id?: number;
  nom: string;
  prenom: string;
  dateNaissance: Date;
  sexe: string;
  email: string;
  rue: string;
  numero: string;
  codePostal: string;
  ville: string;
  paysId?: number;
  pays?: Pays;
}
