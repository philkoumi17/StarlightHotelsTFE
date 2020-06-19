using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StarmaniaHotels.API.Models
{
    [Table("Chambre")]
    public class Chambre
    {
        [Key]
        [Display(Name = "CH_Num")]
        public int ChNum { get; set; }

        [Display(Name = "CH_Image")]
        public string ImageChambre { get; set; }

        public int HotelId { get; set; }
        public Hotel Hotel { get; set; }

        public int CatId { get; set; }
        public Categorie Categorie { get; set; }

        public ICollection<ChambreReservee> ChambreReservees { get; set; }
    }
}