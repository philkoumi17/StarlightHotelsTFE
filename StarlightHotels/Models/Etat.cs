using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StarlightHotels.API.Models
{
    [Table("Etat")]
    public class Etat
    {
        [Key]
        [Display(Name = "ETAT_Id")]
        public int Id { get; set; }

        [Display(Name = "ETAT_Libelle")]
        public string Libelle { get; set; }

        public ICollection<Reservation> Reservations { get; set; }
    }
}