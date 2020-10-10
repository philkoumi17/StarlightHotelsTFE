using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StarlightHotels.Models
{
    [Table("ChambreReserveeService")]
    public class ChambreReserveeServiceModel
    {
        [Column("RESCH_Id")]
        [Display(Name = "Chambre réservée")]
        public int ChambreReserveeId { get; set; }
        public ChambreReserveeModel ChambreReservee { get; set; }

        [Column("SERV_Id")]
        [Display(Name = "Service")]
        public int ServiceId { get; set; }
        public ServiceModel Service { get; set; }
    }
}