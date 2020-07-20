﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StarlightHotels.API.Models
{
    [Table(name:"Facture")]
    public class FactureModel
    {
        [Key]
        [Column("FAC_Id")]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Required]
        [Column("FAC_Date")]
        [Display(Name = "Date de la facture")]
        [DataType(DataType.Date)]
        public DateTime DateFacture { get; set; }

        [Required]
        [Column("FAC_MontantTotal")]
        [Display(Name = "Montant Total")]
        public decimal MontantTotal { get; set; }

        [Column("FAC_RES_Id")]
        [Display(Name = "Réservation")]
        public int ResId { get; set; }
        public ReservationModel Reservation { get; set; }
    }
}