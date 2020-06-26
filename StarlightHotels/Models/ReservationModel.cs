using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StarlightHotels.API.Models
{
    [Table("Reservation")]
    public class ReservationModel
    {
        [Key]
        [Display(Name = "RES_Id")]
        public int IdRes { get; set; }

        // Relation avec l'entité Client
        public int ClientId { get; set; }
        public ClientModel Client { get; set; }

        // Relation avec l'entité Participant
        public int PartId { get; set; }
        public ParticipantModel Participant { get; set; }

        [Display(Name = "RES_DateReservation")]
        [DataType(DataType.Date)]
        public DateTime DateReservation { get; set; }

        [Display(Name = "RES_Montant")]
        public decimal Montant { get; set; }

        // Relation avec l'entité Etat
        public int EtatId { get; set; }
        public EtatModel Etat { get; set; }

        public FactureModel Facture { get; set; }

        public ICollection<ChambreReserveeModel> ChambreReservees { get; set; }
    }
}