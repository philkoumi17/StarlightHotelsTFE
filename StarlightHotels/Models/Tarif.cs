using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StarlightHotels.API.Models
{
    [Table("Tarif")]
    public class Tarif
    {
        [Key]
        [Display(Name = "TAR_Id")]
        public int Id { get; set; }

        [Display(Name = "TAR_Prix")]
        public decimal Prix { get; set; }

        public int CatId { get; set; }
        public Categorie Categorie { get; set; }

        public int SaId { get; set; }
        public Saison Saison { get; set; }
    }
}