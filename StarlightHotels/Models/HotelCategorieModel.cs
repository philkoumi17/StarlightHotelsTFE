using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StarlightHotels.API.Models
{
    public class HotelCategorieModel
    {
        public int HotelId { get; set; }
        public HotelModel Hotel { get; set; }

        public int CatId { get; set; }
        public CategorieModel Categorie { get; set; }

        [Display(Name = "HOTCAT_Image")]
        [DataType(DataType.ImageUrl)]
        [StringLength(255)]
        public string ImageUrl { get; set; }

        [Display(Name = "HOTCAT_Descriptif")]
        [StringLength(255)]
        public string Descriptif { get; set; }
    }
}