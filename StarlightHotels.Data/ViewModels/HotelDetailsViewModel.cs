using StarlightHotels.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace StarlightHotels.Core.ViewModels
{
    public class HotelDetailsViewModel
    {
        public HotelModel HotelInfos { get; set; }

        public List<HotelCategorieModel> HotelRooms { get; set; }

        public List<HotelThemeModel> HotelThemes { get; set; }

        public List<HotelFormuleModel> HotelFormules { get; set; }

        public List<HotelServiceModel> HotelServicesFree { get; set; }

        public List<HotelServiceModel> HotelServicesNoFree { get; set; }
    }
}