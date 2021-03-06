﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StarlightHotels.Core.Entities
{
    [Table("Chambre")]
    public class ChambreModel
    {
        [Column("CH_Num")]
        [Display(Name = "Numéro de chambre")]
        public int ChNum { get; set; }

        [Column("CH_Disponibilite")]
        [Display(Name = "Actif")]
        public bool? Disponible { get; set; }

        [Column("CH_HOTEL_Id")]
        [Display(Name = "Hotel")]
        public int HotelId { get; set; }
        public HotelModel Hotel { get; set; }

        [Column("CH_CAT_Id")]
        [Display(Name = "Categorie")]
        public int CategorieId { get; set; }
        public CategorieModel Categorie { get; set; }

        public List<ChambreReserveeModel> ChambreReservees { get; set; }
    }
}