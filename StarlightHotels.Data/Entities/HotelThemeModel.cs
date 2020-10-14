using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StarlightHotels.Core.Entities
{
    [Table("HotelTheme")]
    public class HotelThemeModel
    {
        [Column("HOTEL_Id")]
        [Display(Name = "Hotel")]
        public int HotelId { get; set; }
        public HotelModel Hotel { get; set; }

        [Column("THEME_Id")]
        [Display(Name = "Theme")]
        public int ThemeId { get; set; }
        public ThemeModel Theme { get; set; }
    }
}