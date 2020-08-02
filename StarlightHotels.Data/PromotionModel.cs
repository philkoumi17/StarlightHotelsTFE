using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace StarlightHotels.Models
{
    [Table("Promotion")]
    public class PromotionModel
    {
        [Key]
        [Column("PR_Id")]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Column("PR_Libelle")]
        [Display(Name = "Libellé")]
        public string Libelle { get; set; }

        [Column("PR_Pourcentage")]
        [Display(Name = "Pourcentage")]
        public float Pourcentage { get; set; }

        public ICollection<HotelPromotionModel> HotelPromotions { get; set; }
    }
}