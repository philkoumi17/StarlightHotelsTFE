using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StarlightHotels.API.Models
{
    public class HotelThemeModel
    {
        public int HotelId { get; set; }
        public HotelModel Hotel { get; set; }

        public int ThemeId { get; set; }
        public ThemeModel Theme { get; set; }
    }
}