using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StarlightHotels.Models
{
    [Table("ParticipantReservation")]
    public class ParticipantReservationModel
    {
        [Column("PART_Id")]
        [Display(Name = "Participant")]
        public int ParticipantId { get; set; }
        public ParticipantModel Participant { get; set; }

        [Column("RES_Id")]
        [Display(Name = "Reservation")]
        public int ReservationId { get; set; }
        public ReservationModel Reservation { get; set; }
    }
}