using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StarmaniaHotels.API.Models
{
    [Table("HotelFormule")]
    public class HotelFormule
    {
        public int HotelId { get; set; }
        public Hotel Hotel { get; set; }

        public int FormId { get; set; }
        public Formule Formule { get; set; }
    }
}