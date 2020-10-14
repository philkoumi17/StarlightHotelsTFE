using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StarlightHotels.Core.Entities
{
    [Table("HotelCategorie")]
    public class HotelCategorieModel
    {
        [Column("HOTEL_Id")]
        [Display(Name = "Hotel")]
        public int HotelId { get; set; }
        public HotelModel Hotel { get; set; }

        [Column("CAT_Id")]
        [Display(Name = "Categorie")]
        public int CategorieId { get; set; }
        public CategorieModel Categorie { get; set; }

        [Column("HOTCAT_Image")]
        [Display(Name = "HOTCAT_Image")]
        [DataType(DataType.ImageUrl)]
        [StringLength(255)]
        public string ImageUrl { get; set; }

        [Column("HOTCAT_Descriptif")]
        [Display(Name = "HOTCAT_Descriptif")]
        [StringLength(255)]
        public string Descriptif { get; set; }
    }
}