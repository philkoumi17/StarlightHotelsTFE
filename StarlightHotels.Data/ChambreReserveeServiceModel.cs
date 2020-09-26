using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StarlightHotels.Models
{
    [Table("ChambreReserveeService")]
    public class ChambreReserveeServiceModel
    {
        [Column("RESCH_Id")]
        [Display(Name = "Chambre réservée")]
        public int ReschId { get; set; }
        public ChambreReserveeModel ChambreReservee { get; set; }

        [Column("SERV_Id")]
        [Display(Name = "Service")]
        public int ServId { get; set; }
        public ServiceModel Service { get; set; }
    }
}