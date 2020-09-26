using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace StarlightHotels.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Column(TypeName = "nvarchar(50)")]
        public string FullName { get; set; }

        [Required]
        [Column("USER_Nom")]
        [Display(Name = "Nom")]
        [StringLength(60)]
        public string Nom { get; set; }

        [Required]
        [Column("USER_Prenom")]
        [Display(Name = "Prenom")]
        [StringLength(60)]
        public string Prenom { get; set; }

        [Required]
        [Column("USER_DateNaissance")]
        [Display(Name = "Date de naissance")]
        [DataType(DataType.Date)]
        public DateTime DateNaissance { get; set; }

        [Required]
        [Column("USER_Sexe")]
        [Display(Name = "Sexe")]
        [StringLength(1)]
        public string Sexe { get; set; }

        [Required]
        [Column("USER_Rue")]
        [Display(Name = "Rue")]
        [DataType(DataType.MultilineText)]
        [StringLength(100)]
        public string Rue { get; set; }

        [Required]
        [Column("USER_Numero")]
        [Display(Name = "Numéro de rue")]
        [StringLength(100)]
        public string NumeroRue { get; set; }

        [Required]
        [Column("USER_CodePostal")]
        [Display(Name = "Code postal")]
        [DataType(DataType.PostalCode)]
        [StringLength(20)]
        public string CodePostal { get; set; }

        [Required]
        [Column("USER_Ville")]
        [Display(Name = "Ville")]
        [StringLength(60)]
        public string Ville { get; set; }

        // Relation with the country entity
        [Column("USER_PAYS_Id")]
        [Display(Name = "Pays")]
        public int PaysId { get; set; }
        public PaysModel Pays { get; set; }

        public List<ReservationModel> Reservations { get; set; }
    }
}