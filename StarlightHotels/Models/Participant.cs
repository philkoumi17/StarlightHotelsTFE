using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StarlightHotels.API.Models
{
    [Table("Participant")]
    public class Participant
    {
        [Key]
        [Display(Name = "PART_Id")]
        public int Id { get; set; }

        [Required]
        [Display(Name = "PART_Nom")]
        [StringLength(60)]
        public string Nom { get; set; }

        [Required]
        [Display(Name = "PART_Prenom")]
        [StringLength(60)]
        public string Prenom { get; set; }

        [Required]
        [Display(Name = "PART_DateNaissance")]
        [DataType(DataType.Date)]
        public DateTime DateNaissance { get; set; }

        public Reservation Reservation { get; set; }
    }
}