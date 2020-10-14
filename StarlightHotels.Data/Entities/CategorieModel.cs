using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StarlightHotels.Core.Entities
{
    [Table("Categorie")]
    public class CategorieModel
    {
        [Key]
        [Column("CAT_Id")]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Column("CAT_Type")]
        [Display(Name = "Type")]
        [StringLength(50)]
        public string Type { get; set; }

        [Column("CAT_Descriptif")]
        [Display(Name = "Description")]
        [StringLength(255)]
        public string Descriptif { get; set; }

        [Column("CAT_Superficie")]
        [Display(Name = "Superficie")]
        public double Superficie { get; set; }

        [Column("CAT_MaxPers")]
        [Display(Name = "MaxPers")]
        public int MaxPers { get; set; }

        public List<ChambreModel> Chambres { get; set; }
        public List<TarifModel> Tarifs { get; set; }

        public List<HotelCategorieModel> HotelCategories { get; set; }
    }
}