using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StarlightHotels.Core.Entities
{
    [Table("Etat")]
    public class EtatModel
    {
        [Column("ETAT_Id")]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Column("ETAT_Libelle")]
        [Display(Name = "Libelle")]
        public string Libelle { get; set; }

        public List<ReservationModel> Reservations { get; set; }
    }
}