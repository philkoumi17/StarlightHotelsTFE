using System;
using System.Collections.Generic;
using System.Text;

namespace StarlightHotels.Core.ViewModels
{
    public class DetailTarifViewModel
    {
        public DateTime DateJour { get; set; }

        public decimal PrixChambre { get; set; }

        public decimal PrixFormule { get; set; }

        public decimal MontantJour { get; set; }
    }
}