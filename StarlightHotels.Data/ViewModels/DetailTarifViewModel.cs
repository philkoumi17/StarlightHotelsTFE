using System;
using System.Collections.Generic;
using System.Text;

namespace StarlightHotels.Models.ViewModels
{
    public class DetailTarifViewModel
    {
        public DateTime DateJour { get; set; }

        public decimal PrixChambre { get; set; }

        public decimal PrixFormunle { get; set; }

        public decimal MontantJour { get; set; }
    }
}