using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StarlightHotels.Models
{
    [Table("ReservationChambre")]
    public class ChambreReserveeModel
    {
        [Key]
        [Column("RESCH_Id")]
        [Display(Name = "RESCH_Id")]
        public int IdResCh { get; set; }

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

        // Relation with the arrangement entity
        [Column("RESCH_FOR_Id")]
        [Display(Name = "Formule")]
        public int FormuleId { get; set; }
        public FormuleModel Formule { get; set; }

        // Relation with the room entity
        [Column("RESCH_CH_Num")]
        [Display(Name = "Chambre")]
        public int ChambreId { get; set; }
        public ChambreModel Chambre { get; set; }

        // Relation with the booking entity
        [Column("RES_Id")]
        [Display(Name = "Réservation")]
        public int ReservationId { get; set; }
        public ReservationModel Reservation { get; set; }

        public List<ChambreReserveeServiceModel> ChambreReserveeServices { get; set; }
    }
}