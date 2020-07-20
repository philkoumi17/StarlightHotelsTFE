using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StarlightHotels.API.Models
{
    [Table("HotelService")]
    public class HotelServiceModel
    {
        [Column("HOTEL_Id")]
        [Display(Name = "Hotel")]
        public int HotelId { get; set; }
        public HotelModel Hotel { get; set; }

        [Column("SERV_Id")]
        [Display(Name = "Service")]
        public int ServId { get; set; }
        public ServiceModel Service { get; set; }
    }
}