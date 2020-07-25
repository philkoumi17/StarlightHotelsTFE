using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StarlightHotels.Models
{
    [Table("Participant")]
    public class ParticipantModel
    {
        [Key]
        [Column("PART_Id")]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Required]
        [Column("PART_Nom")]
        [Display(Name = "Nom")]
        [StringLength(60)]
        public string Nom { get; set; }

        [Required]
        [Column("PART_Prenom")]
        [Display(Name = "Prenom")]
        [StringLength(60)]
        public string Prenom { get; set; }

        [Required]
        [Column("PART_DateNaissance")]
        [Display(Name = "Date de naissance")]
        [DataType(DataType.Date)]
        public DateTime DateNaissance { get; set; }

        public ReservationModel Reservation { get; set; }
    }
}