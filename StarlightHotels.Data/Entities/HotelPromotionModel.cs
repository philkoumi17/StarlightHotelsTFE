using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace StarlightHotels.Core.Entities
{
    [Table("HotelPromotion")]
    public class HotelPromotionModel
    {
        [Column("HOTEL_Id")]
        [Display(Name = "Hotel")]
        public int HotelId { get; set; }
        public HotelModel Hotel { get; set; }

        [Column("PR_Id")]
        [Display(Name = "Promotion")]
        public int PromotionId { get; set; }
        public PromotionModel Promotion { get; set; }

        [Column("HOTELPR_DateDebut")]
        [Display(Name = "Date de début")]
        public DateTime DateDebut { get; set; }

        [Column("HOTELPR_DateFin")]
        [Display(Name = "Date de fin")]
        public DateTime DateFin { get; set; }
    }
}