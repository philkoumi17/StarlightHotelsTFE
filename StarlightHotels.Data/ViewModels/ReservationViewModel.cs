using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StarlightHotels.Models.ViewModels
{
    public class ReservationViewModel
    {
        public ChambreReserveeModel ReservationDetails { get; set; }

        public ApplicationUser ApplicationUser { get; set; }

        public HotelModel Hotel { get; set; }

        public List<FormuleModel> Formules { get; set; }

        public List<EtatModel> Etats { get; set; }

        public DateTimeOffset? ArrivalDate { get; set; }

        public DateTimeOffset? DepartureDate { get; set; }
    }
}