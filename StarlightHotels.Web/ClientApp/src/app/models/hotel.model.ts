import { Pays } from "./pays.model";

export class Hotel
{
    Id: number;
    Nom: string;
    NbEtoiles: number;
    NbChambres: number;
    Description: string;
    Adresse: string;
    CodePostal: string;
    Ville: string;
    Pays: Pays;
    Telephone: string;
    EnPromotion: boolean;
    TopDestination: boolean;
    Actif: boolean;
    Coefficient: boolean;
}