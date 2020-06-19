using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StarlightHotels.API.Models
{
    [Table("ReservationChambre")]
    public class ChambreReservee
    {
        public int ChNum { get; set; }
        public Chambre Chambre { get; set; }

        public int IdRes { get; set; }
        public Reservation Reservation { get; set; }

        [Display(Name = "RESCH_NbAdultes")]
        public int NbAdultes { get; set; }

        [Display(Name = "RESCH_NbEnfants")]
        public int NbEnfants { get; set; }

        [Display(Name = "RESCH_DateArrivee")]
        [DataType(DataType.Date)]
        public DateTime DateArrivee { get; set; }

        [Display(Name = "RESCH_DateDepart")]
        [DataType(DataType.Date)]
        public DateTime DateDepart { get; set; }

        [Display(Name = "RESCH_LitSup")]
        public bool LitSupplementaire { get; set; }

        [Display(Name = "RESCH_MontantTotal")]
        public decimal MontantTotal { get; set; }
    }
}