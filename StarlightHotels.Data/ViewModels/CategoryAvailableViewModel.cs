using StarlightHotels.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace StarlightHotels.Core.ViewModels
{
    public class CategoryAvailableViewModel
    {
        public int Quantite { get; set; }

        public int CategorieId { get; set; }

        public string Categorie { get; set; }

        public int LitsDisponibles { get; set; }

        public int MaxPers { get; set; }

        public int Prix { get; set; }

        public string Description { get; set; }

        public string Photo { get; set; }

        public decimal SousTotal { get; set; }

        public int QuantiteDisponible { get; set; }

        public List<ChambreReserveeModel> DetailsChambres { get; set; }
    }
}