using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using StarlightHotels.API.Models;

namespace StarlightHotels.API.Models
{
    [Table("Client")]
    public class ClientModel
    {
        [Key]
        [Column("CL_Id")]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Required]
        [Column("CL_Nom")]
        [Display(Name = "Nom")]
        [StringLength(60)]
        public string Nom { get; set; }

        [Required]
        [Column("CL_Prenom")]
        [Display(Name = "Prenom")]
        [StringLength(60)]
        public string Prenom { get; set; }

        [Required]
        [Column("CL_DateNaissance")]
        [Display(Name = "Date de naissance")]
        [DataType(DataType.Date)]
        public DateTime DateNaissance { get; set; }

        [Required]
        [Column("CL_Sexe")]
        [Display(Name = "Sexe")]
        [StringLength(1)]
        public string Sexe { get; set; }

        [Required]
        [Column("CL_Email")]
        [Display(Name = "Email")]
        [DataType(DataType.EmailAddress)]
        [StringLength(60)]
        public string Email { get; set; }

        [Required]
        [Column("CL_Rue")]
        [Display(Name = "Rue")]
        [DataType(DataType.MultilineText)]
        [StringLength(100)]
        public string Rue { get; set; }

        [Required]
        [Column("CL_Numero")]
        [Display(Name = "Numéro de rue")]
        [StringLength(100)]
        public string NumeroRue { get; set; }

        [Required]
        [Column("CL_CodePostal")]
        [Display(Name = "Code postal")]
        [DataType(DataType.PostalCode)]
        [StringLength(20)]
        public string CodePostal { get; set; }

        [Required]
        [Column("CL_Ville")]
        [Display(Name = "Ville")]
        [StringLength(60)]
        public string Ville { get; set; }

        // Relation avec l'entité Pays
        [Column("CL_PAYS_Id")]
        [Display(Name = "Pays")]
        public int PaysId { get; set; }
        public PaysModel Pays { get; set; }

        [Column("CL_AppUser_Id")]
        public ApplicationUser ApplicationUser { get; set; }

        public ReservationModel Reservation { get; set; }
    }
}