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
        public int HotelId { get; set; }
        public HotelModel Hotel { get; set; }

        public int ServId { get; set; }
        public ServiceModel Service { get; set; }
    }
}