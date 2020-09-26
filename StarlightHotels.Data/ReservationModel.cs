using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StarlightHotels.Models
{
    [Table("Reservation")]
    public class ReservationModel
    {
        [Key]
        [Column("RES_Id")]
        [Display(Name = "Id")]
        public int IdRes { get; set; }

        // Relation with the user entity
        [Column("AppUser_Id")]
        [Display(Name = "Utilisateur")]
        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }

        [Column("RES_DateReservation")]
        [Display(Name = "Date de la réservation")]
        [DataType(DataType.DateTime)]
        public DateTime DateReservation { get; set; }

        [Column("RES_Montant")]
        [Display(Name = "Prix total")]
        [DataType(DataType.Currency)]
        public decimal Montant { get; set; }

        // Relation with the status entity
        [Column("RES_ETAT_Id")]
        [Display(Name = "Etat")]
        public int EtatId { get; set; }
        public EtatModel Etat { get; set; }

        // Relation with the invoice entity
        public FactureModel Facture { get; set; }

        public List<ChambreReserveeModel> ChambreReservees { get; set; }
        public List<ParticipantReservationModel> ParticipantReservations { get; set; }
    }
}