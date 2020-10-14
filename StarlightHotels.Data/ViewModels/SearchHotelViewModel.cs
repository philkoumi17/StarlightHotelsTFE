using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StarlightHotels.Core.ViewModels
{
    public class SearchHotelViewModel
    {
        public int PaysId { get; set; }

        public string City { get; set; }

        public DateTimeOffset? ArrivalDate { get; set; }

        public DateTimeOffset? DepartureDate { get; set; }
    }
}
