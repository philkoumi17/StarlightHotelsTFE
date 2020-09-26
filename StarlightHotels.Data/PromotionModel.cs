using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StarlightHotels.Models
{
    [Table("Promotion")]
    public class PromotionModel
    {
        [Key]
        [Column("PRO_Id")]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Column("PRO_Libelle")]
        [Display(Name = "Libellé")]
        public string Libelle { get; set; }

        [Column("PRO_Coefficient")]
        [Display(Name = "Pourcentage")]
        public float Pourcentage { get; set; }

        public List<HotelPromotionModel> HotelPromotions { get; set; }
    }
}