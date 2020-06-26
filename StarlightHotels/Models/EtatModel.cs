using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StarlightHotels.API.Models
{
    [Table("Etat")]
    public class EtatModel
    {
        [Key]
        [Display(Name = "ETAT_Id")]
        public int Id { get; set; }

        [Display(Name = "ETAT_Libelle")]
        public string Libelle { get; set; }

        public ICollection<ReservationModel> Reservations { get; set; }
    }
}