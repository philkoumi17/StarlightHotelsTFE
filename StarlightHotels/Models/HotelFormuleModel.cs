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
        [Column("HOTEL_Id")]
        [Display(Name = "Hotel")]
        public int HotelId { get; set; }
        public HotelModel Hotel { get; set; }

        [Column("FOR_Id")]
        [Display(Name = "Formule")]
        public int FormId { get; set; }
        public FormuleModel Formule { get; set; }
    }
}