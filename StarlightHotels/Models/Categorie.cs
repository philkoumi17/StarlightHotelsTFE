using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StarlightHotels.API.Models
{
    [Table("Catégorie")]
    public class Categorie
    {
        [Key]
        [Display(Name = "CAT_Id")]
        public int Id { get; set; }

        [Display(Name = "CAT_Type")]
        [StringLength(50)]
        public string Type { get; set; }

        [Display(Name = "CAT_Descriptif")]
        [StringLength(255)]
        public string Descriptif { get; set; }

        [Display(Name = "CAT_Image")]
        [StringLength(255)]
        public string Image { get; set; }

        [Display(Name = "CAT_Superficie")]
        public double Superficie { get; set; }

        [Display(Name = "CAT_MaxPers")]
        public int MaxPers { get; set; }

        public List<Chambre> Chambres { get; set; }
        public List<Tarif> Tarifs { get; set; }

        public ICollection<HotelCategorie> HotelCategories { get; set; }
    }
}