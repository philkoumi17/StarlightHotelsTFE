using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StarlightHotels.API.Models
{
    public class HotelTheme
    {
        public int HotelId { get; set; }
        public Hotel Hotel { get; set; }

        public int ThemeId { get; set; }
        public Theme Theme { get; set; }
    }
}