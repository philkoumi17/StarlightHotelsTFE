using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StarlightHotels.Models
{
    [Table("Tarif")]
    public class TarifModel
    {
        [Key]
        [Column("TAR_Id")]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Column("TAR_Prix")]
        [Display(Name = "Prix")]
        [DataType(DataType.Currency)]
        public decimal Prix { get; set; }

        [Column("TAR_CAT_Id")]
        [Display(Name = "Categorie")]
        public int CatId { get; set; }
        public CategorieModel Categorie { get; set; }

        [Column("TAR_SA_Id")]
        [Display(Name = "Saison")]
        public int SaId { get; set; }
        public SaisonModel Saison { get; set; }
    }
}