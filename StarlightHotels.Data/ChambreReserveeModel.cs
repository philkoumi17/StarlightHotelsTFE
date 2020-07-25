using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StarlightHotels.Models
{
    [Table("ReservationChambre")]
    public class ChambreReserveeModel
    {
        [Column("CH_Num")]
        [Display(Name = "Chambre")]
        public int ChNum { get; set; }
        public ChambreModel Chambre { get; set; }

        [Column("RES_Id")]
        [Display(Name = "Réservation")]
        public int IdRes { get; set; }
        public ReservationModel Reservation { get; set; }

        [Column("RESCH_NbAdultes")]
        [Display(Name = "RESCH_NbAdultes")]
        public int NbAdultes { get; set; }

        [Column("RESCH_NbEnfants")]
        [Display(Name = "Nombre d'enfants")]
        public int NbEnfants { get; set; }

        [Column("RESCH_DateArrivee")]
        [Display(Name = "Date d'arrivée")]
        [DataType(DataType.DateTime)]
        public DateTime DateArrivee { get; set; }

        [Column("RESCH_DateDepart")]
        [Display(Name = "Date de départ")]
        [DataType(DataType.DateTime)]
        public DateTime DateDepart { get; set; }

        [Column("RESCH_LitSup")]
        [Display(Name = "Lit supplémentaire")]
        public bool LitSupplementaire { get; set; }

        [Column("RESCH_MontantTotal")]
        [Display(Name = "Montant total")]
        public decimal MontantTotal { get; set; }
    }
}