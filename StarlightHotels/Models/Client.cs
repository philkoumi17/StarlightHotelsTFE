using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using StarlightHotels.API.Models;

namespace StarmaniaHotels.API.Models
{
    [Table("Client")]
    public class Client
    {
        [Key]
        [Display(Name = "CL_Id")]
        public int Id { get; set; }

        [Required]
        [Display(Name = "CL_Nom")]
        [StringLength(60)]
        public string Nom { get; set; }

        [Required]
        [Display(Name = "CL_Prenom")]
        [StringLength(60)]
        public string Prenom { get; set; }

        [Required]
        [Display(Name = "CL_DateNaissance")]
        [DataType(DataType.Date)]
        public DateTime DateNaissance { get; set; }

        [Required]
        [Display(Name = "CL_Sexe")]
        [StringLength(1)]
        public string Sexe { get; set; }

        [Required]
        [Display(Name = "CL_Email")]
        [DataType(DataType.EmailAddress)]
        [StringLength(60)]
        public string Email { get; set; }

        [Required]
        [Display(Name = "CL_Rue")]
        [DataType(DataType.MultilineText)]
        [StringLength(100)]
        public string Rue { get; set; }

        [Required]
        [Display(Name = "CL_Numero")]
        [StringLength(100)]
        public string NumeroRue { get; set; }

        [Required]
        [Display(Name = "CL_CodePostal")]
        [DataType(DataType.PostalCode)]
        [StringLength(20)]
        public string CodePostal { get; set; }

        [Required]
        [Display(Name = "CL_Ville")]
        [StringLength(60)]
        public string Ville { get; set; }

        // Relation avec l'entité Pays
        [Display(Name = "CL_Pays_Id")]
        public int PaysId { get; set; }
        public Pays Pays { get; set; }

        public int AppUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }

        public Reservation Reservation { get; set; }
    }
}