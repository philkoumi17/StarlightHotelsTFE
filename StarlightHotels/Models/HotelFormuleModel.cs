using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StarlightHotels.API.Models
{
    [Table("HotelFormule")]
    public class HotelFormuleModel
    {
        public int HotelId { get; set; }
        public HotelModel Hotel { get; set; }

        public int FormId { get; set; }
        public FormuleModel Formule { get; set; }
    }
}