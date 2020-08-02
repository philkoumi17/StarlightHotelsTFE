using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StarlightHotels.Models
{
    [Table("Hotel")]
    public class HotelModel
    {
        [Key]
        [Column("HOTEL_Id")]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Required]
        [Column("HOTEL_Nom")]
        [Display(Name = "Nom")]
        [StringLength(50)]
        public string Nom { get; set; }

        [Required]
        [Column("HOTEL_NombreEtoiles")]
        [Display(Name = "Nombre d'étoiles")]
        public int NbEtoiles { get; set; }

        [Required]
        [Column("HOTEL_NombreChambres")]
        [Display(Name = "Nombre de chambres")]
        public int NbChambres { get; set; }

        [Required]
        [Column("HOTEL_Description")]
        [Display(Name = "Description")]
        [DataType(DataType.MultilineText)]
        [StringLength(255)]
        public string Description { get; set; }

        [Required]
        [Column("HOTEL_Adresse")]
        [Display(Name = "Adresse")]
        [DataType(DataType.MultilineText)]
        [StringLength(255)]
        public string Adresse { get; set; }

        [Required]
        [Column("HOTEL_CodePostal")]
        [Display(Name = "Code postal")]
        [DataType(DataType.PostalCode)]
        [StringLength(20)]
        public string CodePostal { get; set; }

        [Required]
        [Column("HOTEL_Ville")]
        [Display(Name = "Ville")]
        [StringLength(60)]
        public string Ville { get; set; }

        // Relation avec l'entité Pays
        [Column("HOTEL_PAYS_Id")]
        [Display(Name = "Pays")]
        public int PaysId { get; set; }
        public PaysModel Pays { get; set; }

        [Required]
        [Column("HOTEL_Telephone")]
        [Display(Name = "HOTEL_Telephone")]
        [DataType(DataType.PhoneNumber)]
        [StringLength(100)]
        public string Telephone { get; set; }

        [Required]
        [Column("HOTEL_EnPromotion")]
        [Display(Name = "En promotion")]
        public bool EnPromotion { get; set; }

        [Required]
        [Column("HOTEL_TopDestination")]
        [Display(Name = "Top destination")]
        public bool TopDestination { get; set; }

        [Required]
        [Column("HOTEL_Actif")]
        [Display(Name = "Actif")]
        public bool Actif { get; set; }

        [Required]
        [Column("HOTEL_Coefficient")]
        [Display(Name = "Coefficient")]
        public float Coefficient { get; set; }

        [Required]
        [Column("HOTEL_CheckIn")]
        [Display(Name = "Check-In")]
        [DataType(DataType.DateTime)]
        [StringLength(50)]
        public string CheckIn { get; set; }

        [Required]
        [Column("HOTEL_CheckOut")]
        [Display(Name = "HOTEL_Check-Out")]
        [DataType(DataType.DateTime)]
        [StringLength(50)]
        public string CheckOut { get; set; }

        public List<ChambreModel> Chambres { get; set; }

        public List<ImageModel> Images { get; set; }

        public ICollection<HotelFormuleModel> HotelFormules { get; set; }
        public ICollection<HotelServiceModel> HotelServices { get; set; }
        public ICollection<HotelThemeModel> HotelThemes { get; set; }
        public ICollection<HotelCategorieModel> HotelCategories { get; set; }
        public ICollection<HotelPromotionModel> HotelPromotions { get; set; }
    }
}