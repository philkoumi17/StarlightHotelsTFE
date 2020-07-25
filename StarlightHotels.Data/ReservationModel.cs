using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StarlightHotels.Models
{
    [Table("Reservation")]
    public class ReservationModel
    {
        [Key]
        [Column("RES_Id")]
        [Display(Name = "Id")]
        public int IdRes { get; set; }

        // Relation avec l'entité Client
        [Column("RES_CLI_Id")]
        [Display(Name = "Client")]
        public int ClientId { get; set; }
        public ClientModel Client { get; set; }

        // Relation avec l'entité Participant
        [Column("RES_PART_Id")]
        [Display(Name = "Participant")]
        public int PartId { get; set; }
        public ParticipantModel Participant { get; set; }

        [Column("RES_DateReservation")]
        [Display(Name = "Date de la réservation")]
        [DataType(DataType.DateTime)]
        public DateTime DateReservation { get; set; }

        [Column("RES_Montant")]
        [Display(Name = "Prix total")]
        [DataType(DataType.Currency)]
        public decimal Montant { get; set; }

        // Relation avec l'entité Etat
        [Column("RES_ETAT_Id")]
        [Display(Name = "Etat")]
        public int EtatId { get; set; }
        public EtatModel Etat { get; set; }

        public FactureModel Facture { get; set; }

        public ICollection<ChambreReserveeModel> ChambreReservees { get; set; }
    }
}